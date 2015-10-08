var Universe = (function () {
	var self = this;


	var interval;

	self.particles = [];


	function mainLoop() {
		// refresh the screen
		ctx.globalAlpha = 1;
		ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(0, 0, c.width, c.height);
		ctx.fillStyle = "#000000";
		ctx.globalAlpha = 1;
		
		// draw particles
		updateParticles();
	}

	function updateParticles() {
		// update all particles and draw them
		for (var i = 0, max = particles.length; i < max; i += 1) {
			try {
				self.particles[i].update();

				ctx.beginPath();
				ctx.arc(self.particles[i].x/* - pos.x + (c.width / 2)*/, self.particles[i].y/* - pos.y + (c.height / 2)*/, Math.sqrt(self.particles[i].mass), 0, 2 * Math.PI);
				ctx.fill();
			}
			catch (e) {}
		}
	}


	self.start = function () {
		inverval = setInterval(mainLoop, 1000/60);
	};


	return self;
}());