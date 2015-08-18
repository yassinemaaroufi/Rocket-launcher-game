TODO
====
* Make sprites & tiles
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
* Use art from opengameart.org
* Setup NPC dialogue boxes

Other
-----
* Tutorials [Procedural graphics]
	* http://forums.tigsource.com/index.php?PHPSESSID=2775458047163aa26c7b5a6a5e8c4aa0&topic=48508.0
	* http://www.proxyarch.com/util/techpapers/papers/procedural_modeling_of_cities.pdf    _
* Other tutorials
	* Add flashlight: http://www.emanueleferonato.com/2014/10/21/phaser-tutorial-how-to-create-an-html5-survival-horror-game-in-6-easy-steps/

