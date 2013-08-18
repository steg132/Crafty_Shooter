Config = {
	debug: {
		enable: false
	},
	player: {
		speed: 5,
		w: 23,
		h: 22,
		image: 'assets/spaceship1.png',
		collision: [[0, 0], [0, 36], [29, 36], [29, 0]],
		fireRate: 250
	},
	enemies: [
		{
			w:36,
			h:29,
			image: 'assets/spaceship2.png',
			collision: [[0, 0], [0, 36], [29, 36], [29, 0]],
			lives:1
		},
		{
			w:36,
			h:28,
			image: 'assets/spaceship3.png',
			collision: [[0, 0], [0, 36], [28, 36], [28, 0]],
			lives:1

		},
		{
			w:46,
			h:28,
			image: 'assets/spaceship4.png',
			collision: [[0, 0], [0, 46], [28, 46], [28, 0]],
			lives:1
		}
	],
	bullets: [
		{
			speed: 7,
			w: 39,
			h: 39,
			collision: [[0, 0], [39, 0], [39, 39], [0, 39]],
			sprite: 'spr_blt0'
		}
	],
};	