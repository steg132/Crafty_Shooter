// An "Actor" is an entity that is drawn in 2D on canvas
//  via our logical coordinate grid
Crafty.c('Actor', {
  init: function() {
    this.requires('2D, DOM');
  },
  at: function(x, y) {
  	if (x === undefined && y === undefined) {
  		return {x: this.x + this.w/2, y: this.y + this.h / 2};
  	} else {
  		this.x = x - this.w / 2;
  		this.y = y - this.h / 2;
  		return this;
  	}
  }
});

Crafty.c('Player', {
	init: function() {
		this.requires('Actor, Twoway, Image')
		.attr({w:64, h:52})
		.image('assets/spaceship1.png')
		// Two way movement w/o jump
		.twoway(5, 0);

		// Bind Events
		this.bind('Moved', function(data) {
			// check bounds
			if ( this.x < 0)
				this.x = 0;
			if ( (this.x + this.w) > Game.width() )
				this.x = Game.width() - this.w;

		});
	}
});

Crafty.c('Bullet', {
	init: function() {
		
	}
});