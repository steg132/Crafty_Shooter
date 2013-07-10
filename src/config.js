Config = {
	debug: {
		enable: false
	},
	player: {
		speed: 5,
		w: 23,
		h: 22,
		image: 'assets/spaceship1.png',
		fireRate: 250
	},
	enemies: [
		{
			w:36,
			h:29,
			image: 'assets/spaceship2.png',
			collision: new Crafty.polygon([0, 0], [0, this.w], [this.h, this.w], [this.h, 0])

		},
		{
			w:36,
			h:28,
			image: 'assets/spaceship3.png',
			collision: new Crafty.polygon([0, 0], [0, this.w], [this.h, this.w], [this.h, 0])

		},
		{
			w:46,
			h:28,
			image: 'assets/spaceship4.png',
			collision: new Crafty.polygon([0, 0], [0, this.w], [this.h, this.w], [this.h, 0])

		}
	],
	bullets: [
		{
			speed: 7,
			w: 39,
			h: 39,
			collision: new Crafty.polygon([0, 0], [0, this.w], [this.h, this.w], [this.h, 0]),
			sprite: 'spr_blt0'
		}
	],
};	