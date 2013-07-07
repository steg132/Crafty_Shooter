Game = {
	width: 	function() { return 450; },
	height: function() { return 700; },
	player: null,
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
	}
}
