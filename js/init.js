(function () {	
	// spawn particles
	for (var i = 0; i < 100; i += 1) {
		var theParticle = new Particle(c.width * Math.random(), c.height * Math.random());

		theParticle.mass = 1 * Math.random();
	}

	Universe.start();
}());