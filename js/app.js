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
//var playerWidth = 32;
//var playerHeight = 48;
var playerWidth = 3;
var playerHeight = 9;
var tileWidth = 32;
var tileHeight = 32;
var FLOOR_HEIGHT = 32;
var LAUNCHPAD_HEIGHT = 16;
var GRAVITY = 1200;

// Global variables
var platforms;
var player;
//var stars;
var cursors;
var score = 0;
var scoreText;
var map;
var layer;

var pauseButton;
var inGameMenu;

var rocketStages;
var currentRocketStage;
//var rocketStage1;
//var rocketStage2;
//var rocketStage3;
//var rocketStage4;
//var rocketPayLoad;

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
		//game.load.image('sky', 'assets/sprites/sky.png');
    	game.load.image('ground', 'assets/sprites/platform.png');
    	//game.load.image('star', 'assets/sprites/star.png');
    	//game.load.spritesheet('dude', 'assets/sprites/dude.png', playerWidth, playerHeight);
    	game.load.spritesheet('dude', 'assets/sprites/scientist.png', playerWidth, playerHeight);
		//game.load.image('in-game-menu', 'assets/in-game-menu.jpg');
		//game.load.tilemap('tilemap1', 'assets/tilemaps/maps/launchpad.csv', null, Phaser.Tilemap.CSV);
		//game.load.image('tileset1', 'assets/tilemaps/tilesets/32x32/tileset2.png');
		game.load.atlas('atlas', 'assets/sprites/atlas/atlas.png', 'assets/sprites/atlas/atlas.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		game.load.spritesheet('launch-button', 'assets/sprites/buttons/launch.png', 64, 32);
	},
	create: function(){
		

		// World
		game.world.setBounds(0, 0, 320, 3200);
		game.physics.startSystem(Phaser.Physics.ARCADE);
		//game.physics.arcade.gravity.y = 1000;

		// Background
		//game.add.sprite(0, 0, 'sky');
		game.stage.backgroundColor = '#b2b2ff';
		
		// Tilemaps
		//map = game.add.tilemap('tilemap1', tileWidth, tileHeight);
		//map.addTilesetImage('tileset1');
		//map.setCollision([0,1]);
		//layer = map.createLayer(0);
		//layer.resizeWorld();

		// Indicators (altitude, thrust, )
		scoreText = game.add.text(16, 16, 'score: 1', { fontSize: '14px', fill: '#fff' });
		scoreText.fixedToCamera = true;
		scoreText.cameraOffset.setTo(16, 16);

		// Ground & platforms
		platforms = game.add.group();
		platforms.enableBody = true;
		var ground = platforms.create(0, game.world.height - 32, 'ground');
		//ground.scale.setTo(2, 2);
		ground.body.immovable = true;
		//ground.body.static = true;
		//ground.body.collideWorldBounds = true;
		//var ledge = platforms.create(400, 400, 'ground');
		/*ledge.body.immovable = true;
		ledge = platforms.create(-150, 250, 'ground');
		ledge.body.immovable = true;*/

		// Stars
		/*stars = game.add.group();
		stars.enableBody = true;
		 for (var i = 0; i < 12; i++){
			var star = stars.create(i * 70, 0, 'star');
			star.body.gravity.y = 300;
			star.body.bounce.y = 0.7 + Math.random() * 0.2;
		}*/

		// Rocket
		var rocketHeight = game.world.height - FLOOR_HEIGHT;
		rocket = game.add.group();
		rocket.enableBody = true;

		rocketStages = [];
		currentRocketStage = 0;

		rocketStages.push(this.setupRocketStage('atlas', 1, rocketHeight));
		rocketHeight = rocketStages[rocketStages.length-1].y;
		//rocketStage1 = this.setupRocketStage('atlas', 1, rocketHeight);
		//rocketHeight = rocketStage1.y;

		rocketStages.push(this.setupRocketStage('atlas', 2, rocketHeight));
		rocketHeight = rocketStages[rocketStages.length-1].y;
		//rocketStage2 = this.setupRocketStage('atlas', 2, rocketHeight);
		//rocketHeight = rocketStage2.y;

		rocketStages.push(this.setupRocketStage('atlas', 3, rocketHeight));
		rocketHeight = rocketStages[rocketStages.length-1].y;
		//rocketStage3 = this.setupRocketStage('atlas', 3, rocketHeight);
		//rocketHeight = rocketStage3.y;

		rocketStages.push(this.setupRocketStage('atlas', 4, rocketHeight));
		rocketHeight = rocketStages[rocketStages.length-1].y;
		//rocketStage4 = this.setupRocketStage('atlas', 4, rocketHeight);
		//rocketHeight = rocketStage4.y;

		rocketStages.push(this.setupRocketStage('atlas', 0, rocketHeight));
		rocketHeight = rocketStages[rocketStages.length-1].y;
		//rocketPayLoad = this.setupRocketStage('atlas', 0, rocketHeight);
		//rocketHeight = rocketPayLoad.y;

		// Scientists
		player = game.add.sprite(game.world.width/2, game.world.height - 300, 'dude');
		game.physics.arcade.enable(player);
		//player.body.setSize(tileWidth, tileHeight, 0, playerHeight - tileHeight);
		//player.body.bounce.y = 0.2;
		player.body.gravity.y = 12000;
		player.body.collideWorldBounds = true;

		/*player.animations.add('left', [0, 1, 2, 3], 10, true);
		player.animations.add('right', [5, 6, 7, 8], 10, true);
		player.animations.add('down', [5, 6, 7, 8], 10, true);
		player.animations.add('up', [5, 6, 7, 8], 10, true);*/

		player.animations.add('left', [3, 4, 3, 4], 10, true);
		player.animations.add('right', [5, 6, 5, 6], 10, true);
		player.animations.add('down', [1, 0, 2, 0], 10, true);
		player.animations.add('up', [1, 0, 2, 0], 10, true);

		// Camera
		//game.camera.follow(player);
		//game.camera.follow(rocketStage3);
		game.camera.follow(rocketStages[Math.round(rocketStages.length/2)]);

		// Controls
		cursors = game.input.keyboard.createCursorKeys();

		// Buttons
		launchButton = this.setupActionButton(0, GAME_HEIGHT/2, 'launch-button', this.launchRocket, this, 0, 1);
		//launchButton = game.add.button(0, game.world.height - GAME_HEIGHT/2, 'launch-button', this.launchRocket, this, 0, 0, 1, 0);
		//launchButton.fixedToCamera = true;
		//launchButton.cameraOffset.setTo(0, GAME_HEIGHT/2);

		// Pause game
		// Create a layout for the game menu and dialog boxes
		// In-game menu
		pauseButton = game.add.text(GAME_WIDTH - 100, 20, 'Pause', { font: '24px Arial', fill: '#fff' });
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
		
		game.input.onDown.add(this.unpause, self);
		
		},
	update: function(){
		//game.physics.arcade.collide(stars, platforms);
		game.physics.arcade.collide(player, platforms);
		//game.physics.arcade.collide(rocket, rocket);
		game.physics.arcade.collide(rocket, platforms);
		//game.physics.arcade.collide(player, layer);
		//game.physics.arcade.overlap(player, stars, this.collectStar, null, this);

		var moving = false;
		player.body.velocity.x = 0;
		player.body.velocity.y = 0;
		
		if (cursors.left.isDown){
			moving = true;
			player.body.velocity.x = -150;
			player.animations.play('left');
		}
		if (cursors.right.isDown){
			moving = true;
			player.body.velocity.x = 150;
			player.animations.play('right');
		}
		if (cursors.down.isDown){
			moving = true;
			player.body.velocity.y = 150;
			player.animations.play('down');
		}
		if (cursors.up.isDown){
			moving = true;
			player.body.velocity.y = -150;
			player.animations.play('up');
		}
		if (!moving){
			player.animations.stop();
			//player.frame = 4;
			player.frame = 0;
		}
		
		
		
		/*if (cursors.up.isDown && player.body.touching.down){	// Jump
			player.body.velocity.y = -350;
		}*/
	},
	setupActionButton : function(x, y, spritesheet, func, ctx, frameUp, frameDown){
		var button = game.add.button(0, 0, spritesheet, func, ctx, frameUp, frameUp, frameDown, frameUp);
		button.fixedToCamera = true;
		button.cameraOffset.setTo(x, y);
		return button;
	},
	setupRocketStage : function(atlas, frame, height){
		//var stg = game.add.sprite(0, 0, atlas);
		var stg = rocket.create(0, 0, atlas);
		stg.frame = frame;
		game.physics.arcade.enable(stg);
		//stg.body.gravity.y = 1200;
		stg.x = game.world.width/2 - stg.width/2;
		stg.y = height - stg.height;
		return stg;
	},
	launchRocket : function(){
		console.log('launch');
		// Add tween for easeIn speed
		for(i in rocketStages){
			rocketStages[i].body.velocity.y = -500;
		}
		//rocketStage1.body.velocity.y = -500;
		//rocketStage2.body.velocity.y = -500;
		//rocketStage3.body.velocity.y = -500;
		//rocketStage4.body.velocity.y = -500;
		//rocketPayLoad.body.velocity.y = -500;
		launchButton.destroy();
		stageButton = this.setupActionButton(0, GAME_HEIGHT/2, 'launch-button', this.releaseNextStage, this, 0, 1);
	},
	releaseNextStage : function(){
		console.log('release next stage');
		/*rocketStages[currentRocketStage].body.gravity = 1200;
		currentRocketStage++;
		if(currentRocketStage >= rocketStages.length - 1){
			stageButton.destroy();
		}*/
		rocketStages[0].body.gravity = 1200;
		rocketStages.shift();
		game.camera.follow(rocketStages[Math.round((rocketStages.length-1)/2)]);
		if(rocketStages.length == 1){ stageButton.destroy(); }
	},
	collectStar : function(player, star){
		star.kill();
		score += 10;
    	scoreText.text = 'Score: ' + score;
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
