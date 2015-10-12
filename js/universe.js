var Universe = (function (self) {
	var interval;

	self.particles = [];
	self.zoom = 1;
	self.pos = {
		x: 0,
		y: 0
	};


	function mainLoop() {		
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

		self.draw();
	}

	function clearScreen() {
		Main.ctx.globalAlpha = 1;
		Main.ctx.fillStyle = "#FFFFFF";
		Main.ctx.fillRect(0, 0, Main.width, Main.height);
		Main.ctx.fillStyle = "#000000";
		Main.ctx.globalAlpha = 1;
	}


	self.draw = function () {
		clearScreen();

		for (var i = 0, max = self.particles.length; i < max; i += 1) {
			Main.ctx.beginPath();
			Main.ctx.arc((self.particles[i].x + self.pos.x) * self.zoom + (Main.width / 2), (self.particles[i].y + self.pos.y) * self.zoom + (Main.height / 2), (self.particles[i].radius) * self.zoom, 0, 2 * Math.PI);
			Main.ctx.fill();
		}
	};

	self.restart = function () {
		self.particles = [];
	};

	self.pause = function () {
		clearInterval(interval);
	};

	self.start = function () {
		interval = setInterval(mainLoop, 1000 / 60);
	};


	return self;
}({}));