// Jordan Lord 18/12/14
// resumed 05/10/15

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var pos = {
	x: 0,
	y: 0
};

c.width = window.innerWidth;
c.height = window.innerHeight;



(function () {	
	// spawn particles
	for (var i = 0; i < 100; i += 1) {
		var theParticle = new Particle(c.width * Math.random(), c.height * Math.random());

		theParticle.mass = 1 * Math.random();
	}

	Universe.start();
}());