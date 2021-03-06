Project Rocket Launch
=====================

Try http://electron.atom.io for packaging as a desktop app

Main Idea
=========
Launch rocket to the highest possible altitude

TODO
====

>> See: http://www.rocketgame.org/online/wonder-rocket-2-game.html

* Work on the graphics
	* Add smoke
	* Add launchpad
	* Add ground
	* Add payload
* Smoke & fire from real footage
	* https://www.youtube.com/watch?v=OOwD1O8LzKI (baikonour/proton) 1080p
	* https://www.youtube.com/watch?v=XfJoDxX0m7s (spacex falcon 9) 1080p
	* https://www.youtube.com/watch?v=ET77XZYTU3c (baikonour/proton)
	* https://www.youtube.com/watch?v=LndYEpfr1UA (shenzhou-10) 480p
	> vid to img: ffmpeg -i "input.mov" -an -f image2 "output_%05d.jpg"
	> vid to img: mplayer -vo png:z=6 video.avi
	> vid to img: mplayer -vo null -ao null -frames 0 -identify file.avi > mplayer -vo jpeg -sstep 5 -endpos 145 file.avi
* Rocket fairing removal animation when deploy payload		<----------------------------------------
* Launch/release button alerts the player when its time to release (fuel < 10%) by blinking + sound
* Background sprites: Clouds, stars, birds, debris (boots, banana, ), astronaut, etoile filante
* Background: atmosphere, stratosphere, space
* Other in-game buttons: menu, shop
* Fuel consumption coefficient for each rocket
* Add game menus: 
	* Main: Start, credits & exit
	* Start: Choose rocket, Choose launchpad, Launch
		* Choose rocket
		* Choose launchpad
	* Achievements & scores
	* Credits

* Put payloads in their own atlas
* Display stage exhausts when releasing stage
* Display altitude ladder in the background
* Customization: 
	* stickers on the rocket: flag, logo (nasa, companies, etc.), other (peace, etc.)
	* Colors
* Use extracts from real footage
* Better cockpit from real cockpit images

Game mechanics
--------------
* Buy upgrades/fuel to go higher in the sky
* In-game gif maker + gif sharing module
* Random payload appears at each attempt
	* Green alien, Nuke, Tux, boot
	* Capsule, Probe, satellite, etc.
* Achievements & scores
	* Scores: Highest altitude, Number of attempts, fuel use
	* Achievements/misions
		* High riser = go beyond a certain altitude
		* Deliver apollo above x altitude
		* Deliver satellite between x and y altitude
* Rocket description card
	* Name, speed, duration of launch, stages, pictures, video?, diagrams of the rocket, 
	* Constructor, Country, Years of service
* Launchpad description card
	* Name, country, map, pictures, video?
* Unlock rockets (order by date)
	* Order by date
	* Start with a 1 stage rocket then 2, 3 etc.
	* Vostok, proton, soyuz, Atlas, ariane, delta, titan, etc.
	* Add future rockets (under development), prototypes and retired rockets too
	* See: https://en.wikipedia.org/wiki/Comparison_of_orbital_launch_systems
	* Present info about the rocket (stages, mass, thrust, etc.) to be informative
	* See launch video and pictures for more details
	* See: https://en.wikipedia.org/wiki/List_of_orbital_launch_systems
* Unlock launchpads
	* See: https://en.wikipedia.org/wiki/Launch_vehicle#By_launch_platform
	* See: https://en.wikipedia.org/wiki/Spaceport
	* See: https://en.wikipedia.org/wiki/List_of_rocket_launch_sites
	* Land
	* Seaport: 
		* https://en.wikipedia.org/wiki/Broglio_Space_Centre
		* SeaLaunch: https://en.wikipedia.org/wiki/Sea_Launch
* Unlock new payloads
	* Card with info about the payload (orion, soyuz, rover, etc.)

Audio
-----
* Rocket sounds: rip from video or open game art
* Stage release sound
* Launch operator voices: US, chinese, russian see in videos
* Extract audio from real footage

Other
-----
* Use art from opengameart.org
* Get paid to deliver satellites to space
	* Random payloads: satellite, animal, astronaut, probe, etc.
	* Failed delivery = no money
	* Deliver the payload at the required altitude?
* Essentials: money, rocket weight, fuel capacity, fuel consumption, payload, 
	* Speed depends on the weight (rocket + payload) and engine thrust 
	* Distance traveled depends on thrust, fuel consumption and capacity
* Setup launch
	* Add weight constraint: velocity * x for heavier modules
* Shop/lab/workshop
	* New tech
		* More efficient engine = less fuel consumption = more altitude
		* More efficient fuel = less consumption = more altitude
		* Better aerodynamics = less fuel consumption (add small to the rocket stages)
	* New equipment
		* Bigger engines = higher max speed = more fuel consumption
		* Bigger fuel tanks = more fuel available
* Modules: wings, bonus reactors attached to the sides
