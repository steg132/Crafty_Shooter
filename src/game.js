Game = {
	width: 	function() { return 450; },
	height: function() { return 700; },
	player: null,
	spawnIntervalID: null,
	start: 	function(){
		//Init crafty
		Crafty.init(Game.width(), Game.height());
		Crafty.background('black');
		// Load Sprites
		Crafty.sprite(39, 'assets/spr_bullet_strip.png', {
			spr_blt0: [0, 0],
			spr_blt1: [1, 0],
			spr_blt2: [2, 0]
		});
		// add the player object to the game
		this.player = Crafty.e('Player').at(Game.width() / 2, Game.height() - 50);

		// Create Spawn Interval
		spawnIntervalID = window.setInterval(function() {
			if ( Crafty.isPaused() != false)
				Game.spawnEnemy();
		}, 500);

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

		console.log( "New Enemy!" );
	}
}
