var Spawn = (function (self)
{
	self.seed = '';


	self.particles = function () {
		// spawn particles
		for (var i = 0; i < 100; i += 1) {
			var theParticle = new Particle(
				5000 * Md5.rand(self.seed + i + 'x') - 2500,
				5000 * Md5.rand(self.seed + i + 'y') - 2500
			);

			theParticle.newMass(1 * Md5.rand(self.seed + '_' + i) + 50);
		}

		Universe.start();
		Universe.pause();
	};


	return self;
}({}));