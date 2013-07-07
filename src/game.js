Game = {
	width: 	function() { return 450; },
	height: function() { return 800; },
	start: 	function(){
		//Init crafty
		Crafty.init(Game.width(), Game.height());
		Crafty.background('black');
	}
}