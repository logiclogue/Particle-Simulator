var Universe = (function (self) {
	var interval;

	self.particles = [];


	function mainLoop() {
		// refresh the screen
		Main.ctx.globalAlpha = 1;
		Main.ctx.fillStyle = "#FFFFFF";
		Main.ctx.fillRect(0, 0, Main.c.width, Main.c.height);
		Main.ctx.fillStyle = "#000000";
		Main.ctx.globalAlpha = 1;
		
		// draw particles
		updateParticles();
	}

	function updateParticles() {
		// update all particles and draw them
		for (var i = 0, max = particles.length; i < max; i += 1) {
			try {
				self.particles[i].update();

				Main.ctx.beginPath();
				Main.ctx.arc(self.particles[i].x/* - pos.x + (Main.c.width / 2)*/, self.particles[i].y/* - pos.y + (Main.c.height / 2)*/, Math.sqrt(self.particles[i].mass), 0, 2 * Math.PI);
				Main.ctx.fill();
			}
			catch (e) {}
		}
	}


	self.start = function () {
		inverval = setInterval(mainLoop, 1000/60);
	};


	return self;
}({}));