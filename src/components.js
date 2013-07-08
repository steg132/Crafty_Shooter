// An "Actor" is an entity that is drawn in 2D on canvas
//  via our logical coordinate grid
Crafty.c('Actor', {
  init: function() {
    this.requires('2D, DOM');
  },
  at: function(x, y) {
  	if (x === undefined && y === undefined) {
  		return {x: this.x + this.w/2, y: this.y + this.h / 2};
  	} else if ( x.x !== undefined && x.y !== undefined ) {
  		// check if the first input is an object
  	  	y = x.y;
	  	x = x.x; 
	} 
  	this.x = x - this.w / 2;
  	this.y = y - this.h / 2;
  	
  	return this;
  }
});

Crafty.c('Player', {
	isFiring: false,
	init: function() {
		this.requires('Actor, Twoway, Image, Delay')
		.attr({w:23, h:22})
		.image('assets/spaceship1.png')
		// Two way movement w/o jump
		.twoway(5, 0)

		// Bind Events
		// Check when the player moved
		.bind('Moved', function(data) {
			// check bounds
			if ( this.x < 0)
				this.x = 0;
			if ( (this.x + this.w) > Game.width() )
				this.x = Game.width() - this.w;
		})
		// Get key input for player
		.bind('KeyDown', function(e) {
			if(e.key == Crafty.keys['SPACE']) {
				// start Firing
				this.isFiring = true;
				// start a delay
				this.fire();
			}
		})
		.bind('KeyUp', function(e) {
			if(e.key == Crafty.keys['SPACE']) {
				// done firing
				this.isFiring = false;
			}
		})
		// Update player every frame
		.bind('EnterFrame', function() {
		});
	},
	fire: function() {
		// check if we are firing
		if ( this.isFiring == false ) 
			return;
		// fire a bullet
		Crafty.e('Bullet').at(this.at())
		.attr({velocity: {x:0, y:-7}});

		// schedule the next firing
		this.delay(this.fire, 250, 0);
	}
});

Crafty.c('Projectile', {
	velocity:{x:0, y:0},
	init: function() {
		this.requires("Actor")
		.bind("EnterFrame", function() {
			this.x += this.velocity.x;
			this.y += this.velocity.y;
			// Check if we are out of frame
			if ( this.y < (-1 * this.h) ) 
				this.destroy();
		});
	}
});

Crafty.c('Bullet', {
	init: function() {
		this.requires("Projectile, Collision, spr_blt0, Destructable")
		.attr({w:39, h:39})
		.collision([0, 0], [this.w, 0], [this.w, this.h], [0, this.h])
		// check collision with bullet
		.onHit("Enemy", function(){
			// die when you are hit!!!
			this.isDestroyed = true;
		});
	}
});

Crafty.c('Enemy', {
	init: function() {
		this.requires("Actor, Image, Projectile, Collision, Destructable")
		.attr({w:36, h:29})
		.image('assets/spaceship2.png')
		.collision([0, 0], [this.w, 0], [this.w, this.h], [0, this.h])
		.bind("EnterFrame", function() {
			// check f we are beyond the end of the screen
			if ( this.y > Game.height() + this.h) 
				this.destroy();
		})
		// check collision with bullet
		.onHit("Bullet", function(){
			// die when you are hit!!!
			this.isDestroyed = true;
		});
	}
});

Crafty.c("Destructable", {
	isDestroyed: false,
	init: function() {
		this.requires('Actor')
		.bind("EnterFrame", function () {
			if( this.isDestroyed == true)
				this.destroy();
		});
	}
});