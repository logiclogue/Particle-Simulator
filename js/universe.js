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
		for (var i = 0, max = self.particles.length; i < max; i += 1) {
			if (self.particles[i] !== undefined) {
				self.particles[i].update();
			}
			// may remove later!
			else {
				i -= 1;
				max -= 1;
			}
		}

		for (var i = 0, max = self.particles.length; i < max; i += 1) {
			Main.ctx.beginPath();
			Main.ctx.arc(self.particles[i].x + Main.pos.x, self.particles[i].y + Main.pos.y, self.particles[i].radius, 0, 2 * Math.PI);
			Main.ctx.fill();
		}
	}


	self.start = function () {
		inverval = setInterval(mainLoop, 1000 / 60);
	};


	return self;
}({}));