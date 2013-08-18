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
	lastFire:0,
	fireIntervalID: null,
	init: function() {
		var col = Config.player.collision;
		this.requires('Actor, Twoway, Collision, Image, Delay')
		.attr({w:Config.player.w, h:Config.player.h})
		.image(Config.player.image)
		// Two way movement w/o jump
		.twoway(Config.player.speed, 0)
		// Add collission to the class
		.collision(col[0].slice(0), col[1].slice(0), 
			col[2].slice(0), col[3].slice(0))
		// check collision with bullet
		.onHit("Enemy", function(){
			// die when you are hit!!!
			Game.PlayerDied();
		})


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
				this.lastFire = 0;
				// start a delay
				//this.fire();
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
			// check if it is time to fire a bullet
			if ( this.isFiring == true ) {
				if ( this.lastFire == 0 ) {
					this.fire();
					this.lastFire = new Date().getTime();
				} else if (this.lastFire + Config.player.fireRate < new Date().getTime() ) {
					this.fire();
					this.lastFire = new Date().getTime();
				}
			}
		});
	},
	fire: function() {
		// check if we are firing
		//if ( this.isFiring == false ) 
		//	return;
		// fire a bullet
		Crafty.e('Bullet, ' + Config.bullets[0].sprite).at(this.at())
		.velocity(0, -Config.bullets[0].speed);
        
		// schedule the next firing
		//
	},
	beginFiring: function() {

		this.delay(this.fire, Config.player.fireRate, 0);

	},
	delayFire: function() {

	},
	endFiring: function() {

	}
});

Crafty.c('Velocity', {
	_v:{x:0, y:0},
	init: function() {
		// initalize the _v variable here
		this._v = {x:0, y:0};
		this.requires("Actor")
		.attr()
		.bind("EnterFrame", function() {
			this.x += this.velocity().x;
			this.y += this.velocity().y;
		});
	},
	velocity: function (x, y) {
		// check for arguments
		if ( x === undefined && y === undefined ){
			return this._v;
		} else if ( x !== undefined && y === undefined ){
			// A velocity object has been passed in for the first arguments
			this._v.x = x.x;
			this._v.y = x.y
		} else {
			this._v.x = x;
			this._v.y = y;
		}
		// return this to daisy chain calls together
		return this;
	}
});

Crafty.c('Bullet', {
	init: function() {
		var col = Config.bullets[0].collision;
		this.requires("Velocity, Collision, Destructable")
		.attr({w:Config.bullets[0].w, h:Config.bullets[0].h})
//		.collision(new Crafty.polygon(col[0], col[1], col[2], col[3]))
		.collision(col[0].slice(0), col[1].slice(0), 
			col[2].slice(0), col[3].slice(0))
		// check collision with bullet
		.onHit("Enemy", function(){
			// die when you are hit!!!
			this.isDestroyed = true;
		})
		.bind('EnterFrame', function () {
			// check if we are in frame
			if ( this.y < (-1 * this.h) ) 
				this.destroy();
		});
	}
});

Crafty.c('Enemy', {
	init: function() {
		this.requires("Actor, Image, Velocity, Collision, Destructable")
		.bind("EnterFrame", function() {
			// check f we are beyond the end of the screen
			if ( this.y > Game.height() + this.h) {
				this.destroy();
				// remove the enemy
				var index = Game.enemies.indexOf(this);
				Game.enemies.splice(index, 1);
			}

		})
		// check collision with bullet
		.onHit("Bullet", function(){
			// die when you are hit!!!
			this.isDestroyed = true;
			// remove the enemy
			var index = Game.enemies.indexOf(this);
			Game.enemies.splice(index, 1);

		});
	},
	config: function(config) {
		this.w = config.w;
		this.h = config.h;
		this.image(config.image);
		this.collision([0, 0], [this.w, 0], [this.w, this.h], [0, this.h]);
		return this;
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