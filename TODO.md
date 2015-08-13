TODO
====
* Generate procedural terrain (tilemap)
	* Simple terrain with random tiles
	* Dungeon-like terrain
		* http://www.gamasutra.com/blogs/TanyaXShort/20140204/209176/Level_Design_in_Procedural_Generation.php
		* http://www.kitfoxgames.com/environment-design-the-shattered-desert/
		* http://pcgbook.com/wp-content/uploads/chapter03.pdf (see chapter 2 as well) use binary partioning
		* Produce floating islands (or ordinary islands) connected by bridges instead of a dungeon
		* http://www.roguebasin.com/
* Add main menu
	* Add buttons: start, credits & exit
* Add in-game menu
	* http://phaser.io/examples/v2/misc/pause-menu
	* Fix pause/unpause
		* Still uses unpause function
	* Use buttons: http://www.emanueleferonato.com/2014/10/07/how-to-bring-your-html5-games-title-screen-to-life-in-a-minute-with-phaser/
		* var playButton = this.add.button(160,320,"playbutton",this.playTheGame,this)
		* var variableName = game.add.button(x, y, "buttonName", this.function, this)
	* Add buttons: resume, restart & exit
	* Replace the unpause function with a better solution
		* Use direct input on individual buttons instead of a catch all with coordinates
* Intall on Mac: Tiled and Inkscape
* Use art from opengameart.org
* Remove player bounce
* Turn to a 2D top down approach
	* Setup tilemap for level building
* Setup NPC dialogue boxes
* README
	* http://dotoolkit.com/
	* http://www.gamecareerguide.com/forums/showthread.php?p=33139#post33139
	* http://www.gamecareerguide.com/forums/
	* http://threejs.org/
* Tools
	* pixlr
	* img42.com (image hosting)
* Tutorials
	* http://html5hub.com/how-to-make-a-sidescroller-game-with-html5/
	* http://tutorialzine.com/2015/06/making-your-first-html5-game-with-phaser/
	* http://www.emanueleferonato.com/2014/10/07/how-to-bring-your-html5-games-title-screen-to-life-in-a-minute-with-phaser/
* Tutorials [Procedural graphics]
	* http://forums.tigsource.com/index.php?PHPSESSID=2775458047163aa26c7b5a6a5e8c4aa0&topic=48508.0
	* http://www.proxyarch.com/util/techpapers/papers/procedural_modeling_of_cities.pdf    _
* Other tutorials
	* Add flashlight: http://www.emanueleferonato.com/2014/10/21/phaser-tutorial-how-to-create-an-html5-survival-horror-game-in-6-easy-steps/

Animations
----------
* Walking: tilt from left to right
* Hiding: slip like a piece of paper into hiding spot
	* Slip under a rug and leave only eyes displayed
	* Slip inside a drawer
	* Hide as a tall lamp
* Hiting/punching

SFX/music
---------
* Jazzy background music
* Whistle sound
* Hiding sound
* Punching sound
* Elevator sound

Tutorials
---------
* http://phaser.io/examples/v2/misc/pause-menu
* http://phaser.io/examples/v2/camera/basic-follow (camera follow) (ok)
* http://phaser.io/news/2015/05/random-dungeon-generator
* http://blog.hovercraft.ie/post/119437806421/creating-a-platformer-tilemap-for-phaser
* http://phaser.io/news/2015/04/optimizing-javascript-games