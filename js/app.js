/*
 * Whistle Blower
 * Yassine Maaroufi (c) 2015
 * yassinemaaroufi@gmail.com
*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var STATE = "splash";
	
var platforms;
var player;
var cursors;
	
var score = 0;
var scoreText;

function preload() {
	game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

function create() {
	
	// World
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.world.setBounds(0, 0, 2000, 2000);
	
	// Background
	game.add.sprite(0, 0, 'sky');
	
	// Score
	scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });
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
	stars = game.add.group();
	stars.enableBody = true;
	 for (var i = 0; i < 12; i++){
        var star = stars.create(i * 70, 0, 'star');
        star.body.gravity.y = 300;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

	// Player
	//player = game.add.sprite(32, game.world.height - 650, 'dude');
	player = game.add.sprite(32, 0, 'dude');
	game.physics.arcade.enable(player);
	player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
	player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
	
	// Camera
	game.camera.follow(player);
	
	// Controls
	cursors = game.input.keyboard.createCursorKeys();
	
	// Pause game
	// Create a layout for the game menu

}

function update() {
	game.physics.arcade.collide(stars, platforms);
	game.physics.arcade.collide(player, platforms);
	game.physics.arcade.overlap(player, stars, collectStar, null, this);
	
	player.body.velocity.x = 0;
	if (cursors.left.isDown){
        player.body.velocity.x = -150;
        player.animations.play('left');
    }else if (cursors.right.isDown){
        player.body.velocity.x = 150;
        player.animations.play('right');
    }else{
        player.animations.stop();
        player.frame = 4;
    }
    if (cursors.up.isDown && player.body.touching.down){	// Jump
        player.body.velocity.y = -350;
    }
}
	
function collectStar(player, star){
	star.kill();
	score += 10;
    scoreText.text = 'Score: ' + score;
}
