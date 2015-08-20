/*
 * Satellite delivery
 * Yassine Maaroufi (c) 2015
 * yassinemaaroufi@gmail.com
*/

// Constants
//var GAME_WIDTH = 800;
//var GAME_HEIGHT = 600;
var GAME_WIDTH = 320;
var GAME_HEIGHT = 480;
var tileWidth = 32;
var tileHeight = 32;

var FLOOR_HEIGHT = 32;
var LAUNCHPAD_HEIGHT = 16;
var GRAVITY = 100;
var ROCKET_STAGES = 4;
var AIR_DRAG = 100;
var MAX_VELOCITY = 500;
var LOCAL_GRAVITY = 100;
var DEFAULT_ACCELERATION = -500;

// Global variables
var platforms;
//var stars;
var cursors;
var score = 0;
//var scoreText;
var map;
var layer;

var pauseButton;
var inGameMenu;

var rocktLaunched;
var rocketStages;
var currentRocketStage;
var fuelGauges;
var fuelGaugesText;
var altitudeGaugeText;

var scoreAltitude;
var scoreMaxAltitude;

var launchButton;	// Launch rocket
var stageButton;	// Release next stage

// Game modes
var Splash = {
	preload: function(){	},
	create: function(){	
		game.stage.backgroundColor = '#f25565';
		game.time.events.add(Phaser.Timer.SECOND * 1, this.startMenu, this);
	},
	update: function(){	},
	startMenu: function(){
		this.state.start("MENU");
	}
};

var Menu = {
	preload: function(){	},
	create: function(){
		game.stage.backgroundColor = '#061f27';
		game.time.events.add(Phaser.Timer.SECOND * 1, this.startGame, this);
	},
	update: function(){	},
	startGame: function(){
		this.state.start("GAME");
	}
};

var Game = {
	
	preload: function(){
    	game.load.image('ground', 'assets/sprites/platform.png');
    	//game.load.spritesheet('test-rocket', 'assets/sprites/rocket.png', 32, 64);
		//game.load.image('in-game-menu', 'assets/in-game-menu.jpg');
		//game.load.tilemap('tilemap1', 'assets/tilemaps/maps/launchpad.csv', null, Phaser.Tilemap.CSV);
		//game.load.image('tileset1', 'assets/tilemaps/tilesets/32x32/tileset2.png');
		game.load.atlas('rocket', 'assets/sprites/atlas/rocket.png', 'assets/sprites/atlas/rocket.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		game.load.spritesheet('launch-button', 'assets/sprites/buttons/launch.png', 64, 32);
	},
	create: function(){
		

		// World
		game.world.setBounds(0, 0, 320, 32000);
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.gravity.y = GRAVITY;

		// Background
		game.stage.backgroundColor = '#b2b2ff';
		//game.add.sprite(0, 0, 'sky');
		
		// Tilemaps
		//map = game.add.tilemap('tilemap1', tileWidth, tileHeight);
		//map.addTilesetImage('tileset1');
		//map.setCollision([0,1]);
		//layer = map.createLayer(0);
		//layer.resizeWorld();

		// Ground & platforms
		platforms = game.add.group();
		platforms.enableBody = true;
		var ground = platforms.create(0, game.world.height - 32, 'ground');
		//ground.scale.setTo(2, 2);
		ground.body.immovable = true;
		//ground.body.static = true;
		//ground.body.collideWorldBounds = true;
		ground.body.allowGravity = false;

		// Indicators (altitude, thrust, )
		altitudeGaugeText = game.add.text(0, 0, 'Altitude: 0', { fontSize: '14px', fill: '#fff' });
		altitudeGaugeText.fixedToCamera = true;
		altitudeGaugeText.cameraOffset.setTo(10, 30);

		// Scores
		scoreAltitude = 0;
		scoreMaxAltitude = 0;

		// Rocket setup
		fuelGauges = [];
		fuelGaugesText = [];
		// Rocket
		var rocketHeight = game.world.height - FLOOR_HEIGHT;
		//rocket = game.add.group();
		//rocket.enableBody = true;

		rocketStages = [];
		currentRocketStage = 0;
		rocketLaunched = false;

		for(i=0; i<ROCKET_STAGES; i++){
			fuelGauges.push(100);
			fuelGaugesText.push(game.add.text(0, 0, '100%', { fontSize: '14px', fill: '#fff' }));
			fuelGaugesText[i].fixedToCamera = true;
			fuelGaugesText[i].cameraOffset.setTo(10 + 40*i, 10);
		}

		for(i=0; i<=ROCKET_STAGES; i++){
			rocketStages.push(this.setupRocketStage('rocket', i, rocketHeight));
			rocketHeight = rocketStages[i].y;
		}

		// Test Rocket
		//testRocket = game.add.sprite(100, game.world.height - 300, 'test-rocket');
		//game.physics.arcade.enable(testRocket);
		//testRocket.body.collideWorldBounds = true;

		// Camera
		game.camera.follow(rocketStages[Math.round(rocketStages.length/2)]);
		//game.camera.follow(testRocket);

		// Controls
		//cursors = game.input.keyboard.createCursorKeys();

		// Buttons
		launchButton = this.setupActionButton(0, GAME_HEIGHT/2, 'launch-button', this.launchRocket, this, 0, 1);

		// Pause game
		// Create a layout for the game menu and dialog boxes
		// In-game menu
		/*pauseButton = game.add.text(GAME_WIDTH - 100, 20, 'Pause', { font: '24px Arial', fill: '#fff' });
		pauseButton.fixedToCamera = true;
		pauseButton.cameraOffset.setTo(GAME_WIDTH - 100, 20);
    	pauseButton.inputEnabled = true;
    	pauseButton.events.onInputUp.add(function () {
			if(game.paused){
				game.paused = false;
				pauseButton.text = 'Pause';
			}else{
        		game.paused = true;
				pauseButton.text = 'Resume';
				
				// Then add the menu
				inGameMenu = game.add.sprite(GAME_WIDTH/2, GAME_HEIGHT/2, 'in-game-menu');
				inGameMenu.anchor.setTo(0.5, 0.5);
			}
				
			});
		game.input.onDown.add(this.unpause, self);*/
		
		},
	update: function(){
		//game.physics.arcade.collide(testRocket, platforms);
		//game.physics.arcade.collide(rocket, rocket);
		//game.physics.arcade.collide(rocket, platforms);
		game.physics.arcade.collide(rocketStages[0], platforms);
		for(i=0; i<rocketStages.length - 1; i++){
			game.physics.arcade.collide(rocketStages[i + 1], rocketStages[i]);
		}

		// Altitude indicator
		if(rocketLaunched){
			//altitudeGaugeText.text = 'Altitude: ' + Math.floor(game.world.height - rocketStages[rocketStages.length-1].y);

			scoreAltitude = Math.floor(game.world.height - rocketStages[rocketStages.length-1].y);
			altitudeGaugeText.text = 'Altitude: ' + scoreAltitude;
		}

		// Scores
		if(scoreMaxAltitude < scoreAltitude ){ scoreMaxAltitude = scoreAltitude; }
		else{ 
			// Fix camera
		   	// Display scores and menu
			// Save scores
	   	}

		// Fuel management
		if(rocketLaunched && currentRocketStage < fuelGauges.length && fuelGauges[currentRocketStage] > 0){
			fuelGauges[currentRocketStage]--;
			fuelGaugesText[currentRocketStage].text = fuelGauges[currentRocketStage] + '%'
		}

		if(fuelGauges[currentRocketStage] <= 0){
			//testRocket.body.acceleration.y = 0;
			for(i in rocketStages){
				rocketStages[i].body.acceleration.y = 0;
			}

		}

		
		
	},
	setupActionButton : function(x, y, spritesheet, func, ctx, frameUp, frameDown){
		var button = game.add.button(0, 0, spritesheet, func, ctx, frameUp, frameUp, frameDown, frameUp);
		button.fixedToCamera = true;
		button.cameraOffset.setTo(x, y);
		return button;
	},
	setupRocketStage : function(atlas, frame, height){
		var stg = game.add.sprite(0, 0, atlas);
		//var stg = rocket.create(0, 0, atlas);
		stg.frame = frame;
		game.physics.arcade.enable(stg);
		//stg.body.gravity.y = 1200;
		stg.x = game.world.width/2 - stg.width/2;
		stg.y = height - stg.height;
		return stg;
	},
	launchRocket : function(){
		console.log('Rocket launched');
		for(i in rocketStages){
			rocketStages[i].body.acceleration.y = DEFAULT_ACCELERATION;		// Extract acceleration value according to module characteristics
			rocketStages[i].body.gravity.y = LOCAL_GRAVITY;
			rocketStages[i].body.drag.set(AIR_DRAG);
			rocketStages[i].body.maxVelocity.set(MAX_VELOCITY); // Extract max velocity value according to module characteristics
		}

		launchButton.destroy();
		stageButton = this.setupActionButton(0, GAME_HEIGHT/2, 'launch-button', this.releaseNextStage, this, 0, 1);
		rocketLaunched = true;
	},
	releaseNextStage : function(){
		console.log('Next stage released');

		rocketStages[0].body.acceleration.y = 0;
		rocketStages.shift();
		game.camera.follow(rocketStages[Math.round((rocketStages.length-1)/2)]);

		// Acceleration for the next stage
		rocketStages[0].body.acceleration.y = DEFAULT_ACCELERATION;

		// Last Stage release (payload)
		if(rocketStages.length == 1){ 
			stageButton.destroy(); 
			rocketStages[0].body.acceleration.y = 0;
			// Animation for releasing payload

		}
		currentRocketStage++;
	},
	unpause : function(event){
        if(game.paused){
            // Calculate the coordinates of the menu
            var x1 = GAME_WIDTH/2 - 270/2;
			var x2 = GAME_WIDTH/2 + 270/2;
			var y1 = GAME_HEIGHT/2 - 180/2;
			var y2 = GAME_HEIGHT/2 + 180/2;

            // Check if the click was inside the menu
            if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
                // The choicemap is an array that will help us see which item was clicked
                var choicemap = ['one', 'two', 'three', 'four', 'five', 'six'];

                // Get menu local coordinates for the click
                var x = event.x - x1;
				var y = event.y - y1;

                // Calculate the choice 
                var choice = Math.floor(x / 90) + 3*Math.floor(y / 90);

                // Display the choice
                //choiceLabel.text = 'You chose menu item: ' + choicemap[choise];
            }
            else{
                // Remove the menu and the label
                inGameMenu.destroy();
                //choiceLabel.destroy();

                // Unpause the game
                game.paused = false;
            }
        }
    }
};

var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, '');

game.state.add('SPLASH', Splash);
game.state.add('MENU', Menu);
game.state.add('GAME', Game);
game.state.start('SPLASH');
