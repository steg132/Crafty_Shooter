Game = {
	width: 	function() { return 450; },
	height: function() { return 700; },
	enemies: [],
	player: null,
	spawnIntervalID: null,
	Init: 	function(){
		//Init crafty
		Crafty.init(Game.width(), Game.height());
		Crafty.background('black');
		// Load Sprites
		Crafty.sprite(39, 'assets/spr_bullet_strip.png', {
			spr_blt0: [0, 0],
			spr_blt1: [1, 0],
			spr_blt2: [2, 0]
		});
		this.StartGame();
	},
	spawnEnemy: function() {
		var enemy = Config.enemies[Math.floor(
			Math.random()*Config.enemies.length)];

		var newEnemy = Crafty.e('Enemy')
		.config(enemy)
		.at(Math.random() * Game.width(), -15)
		.velocity(0, (Math.random() * 8) + 1);
		//.collision(new Crafty.polygon(enemy.collision))
//		.image(enemy.image);

		newEnemy.collision().w = enemy.w;
		newEnemy.collision().h = enemy.h;

		// Add the new enemy! 
		Game.enemies.push(newEnemy);


		console.log( "New Enemy!" );
	},
	StartGame: function() {		
		// add the player object to the game
		this.player = Crafty.e('Player').at(Game.width() / 2, Game.height() - 50);

		// Create Spawn Interval
		this.spawnIntervalID = window.setInterval(function() {
			if ( Crafty.isPaused() != false)
				Game.spawnEnemy();
		}, 500);
	},
	PlayerDied: function() {
		// this method is called when the player has died
		// clear all the enemies from the screen
		for (var i=0; i<this.enemies.length;i++) {
			this.enemies[i].destroy();
		}
		// destroy the player
		this.player.destroy();
		this.player = null;

		// clear the enemy spawn interval
		window.clearInterval(this.spawnIntervalID);
		this.spawnIntervalID = null;

		// Let the games begin!!!
		this.StartGame();

	}
}
