(function () {	
	// spawn particles
	for (var i = 0; i < 100; i += 1) {
		var theParticle = new Particle(Main.c.width * Math.random(), Main.c.height * Math.random());

		theParticle.mass = 1 * Math.random();
	}

	Universe.start();
}());