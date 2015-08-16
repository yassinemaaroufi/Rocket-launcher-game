/*
 * Whistle Blower
 * Yassine Maaroufi (c) 2015
 * yassinemaaroufi@gmail.com
*/

// Constants
var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var playerHeight = 48;
var playerWidth = 32;
var tileHeight = 32;
var tileWidth = 32;

var platforms;
var player;
//var stars;
var cursors;
var score = 0;
var scoreText;
var floorHeight = 100;
var map;
var layer;

var pauseButton;
var inGameMenu;

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
    	game.load.image('star', 'assets/sprites/star.png');
    	game.load.spritesheet('dude', 'assets/sprites/dude.png', playerWidth, playerHeight);
		//game.load.image('in-game-menu', 'assets/in-game-menu.jpg');
		game.load.tilemap('tilemap1', 'assets/tilemaps/maps/tilemap1.csv', null, Phaser.Tilemap.CSV);
		game.load.image('tileset1', 'assets/tilemaps/tiles/tileset1.png');
	},
	create: function(){
		

		// World
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.world.setBounds(0, 0, 2000, 2000);

		// Background
		//game.add.sprite(0, 0, 'sky');
		game.stage.backgroundColor = '#787878';
		
		map = game.add.tilemap('tilemap1', tileWidth, tileHeight);
		map.addTilesetImage('tileset1');
		
		map.setCollision([0,1]);

		layer = map.createLayer(0);
		layer.resizeWorld();

		// Score
		scoreText = game.add.text(16, 16, 'score: 1', { fontSize: '32px', fill: '#fff' });
		scoreText.fixedToCamera = true;
		scoreText.cameraOffset.setTo(16, 16);

		// Ground & platforms
		platforms = game.add.group();
		platforms.enableBody = true;
		var ground = platforms.create(0, game.world.height - 64, 'ground');
		ground.scale.setTo(2, 2);
		ground.body.immovable = true;

		var ledge = platforms.create(400, 400, 'ground');
		ledge.body.immovable = true;
		ledge = platforms.create(-150, 250, 'ground');
		ledge.body.immovable = true;

		// Stars
		/*stars = game.add.group();
		stars.enableBody = true;
		 for (var i = 0; i < 12; i++){
			var star = stars.create(i * 70, 0, 'star');
			star.body.gravity.y = 300;
			star.body.bounce.y = 0.7 + Math.random() * 0.2;
		}*/

		// Player
		//player = game.add.sprite(32, game.world.height - 650, 'dude');
		player = game.add.sprite(game.world.width/2, game.world.height/2, 'dude');
		game.physics.arcade.enable(player);
		player.body.setSize(tileWidth, tileHeight, 0, playerHeight - tileHeight);
		//player.body.bounce.y = 0.2;
		//player.body.gravity.y = 300;
		player.body.collideWorldBounds = true;
		player.animations.add('left', [0, 1, 2, 3], 10, true);
		player.animations.add('right', [5, 6, 7, 8], 10, true);
		player.animations.add('down', [5, 6, 7, 8], 10, true);
		player.animations.add('up', [5, 6, 7, 8], 10, true);

		// Camera
		game.camera.follow(player);

		// Controls
		cursors = game.input.keyboard.createCursorKeys();

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
		game.physics.arcade.collide(player, layer);
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
			player.frame = 4;
		}
		
		
		
		/*if (cursors.up.isDown && player.body.touching.down){	// Jump
			player.body.velocity.y = -350;
		}*/
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
