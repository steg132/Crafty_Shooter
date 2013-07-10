EnemyFactory = {
	freeEnemies:[],
	getEnemy:function (config) {
		// check for a free enemy
		var enemy = null;
		if ( freeEnemies.length == 0) {
			enemy = Crafty.e("Enemy");
		} else {
			// pop an existing one
			enemy = freeEnemies.pop();
		}

		return enemy
		.attr({w:config.w, h:config.h})
		.image(config.image)
		.collision(config.collision)
		// reset the velocity and position
		.at(0, 0).velocity(0, 0);

	}
};