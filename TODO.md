TODO
====
* Setup launch
	* Add velocity, friction when no fuel
	* Add fuel constraint
	* Add weight constraint: velocity * x
* Background 
	* Apply a mask: gets darker at the same time as higher altitude
* Setup NPC dialogue boxes
	* In-game tutorial
* Make sprites & tiles
	* Background sprites: Clouds, stars, birds, debris (boots, banana, ), astronaut, etoile filante
	* Background: atmosphere, stratosphere, space
	* Game buttons: stage 1, stage 2, stage 3, launch satellite, deploy parachute?
	* Other buttons: menu, shop
* add main menu
	* add buttons: start, credits & exit
* Achievements
	* 
* Customization: stickers on the rocket
* add in-game menu
	* http://phaser.io/examples/v2/misc/pause-menu
	* fix pause/unpause
		* still uses unpause function
	* use buttons: http://www.emanueleferonato.com/2014/10/07/how-to-bring-your-html5-games-title-screen-to-life-in-a-minute-with-phaser/
		* var playbutton = this.add.button(160,320,"playbutton",this.playthegame,this)
		* var variablename = game.add.button(x, y, "buttonname", this.function, this)
	* add buttons: resume, restart & exit
	* replace the unpause function with a better solution
		* use direct input on individual buttons instead of a catch all with coordinates
* Use art from opengameart.org

Other
-----
* Tutorials [Procedural graphics]
	* http://forums.tigsource.com/index.php?PHPSESSID=2775458047163aa26c7b5a6a5e8c4aa0&topic=48508.0
	* http://www.proxyarch.com/util/techpapers/papers/procedural_modeling_of_cities.pdf    _
* Other tutorials
	* Add flashlight: http://www.emanueleferonato.com/2014/10/21/phaser-tutorial-how-to-create-an-html5-survival-horror-game-in-6-easy-steps/

