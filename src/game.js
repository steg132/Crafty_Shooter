Game = {
	width: 	function() { return 450; },
	height: function() { return 800; },
	player: null,
	start: 	function(){
		//Init crafty
		Crafty.init(Game.width(), Game.height());
		Crafty.background('black');
		// add the player object to the game
		this.player = Crafty.e('Player').at(Game.width() / 2, Game.height() - 100);
	}
}