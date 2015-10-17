var Universe = (function (self) {
	var interval;

	self.particles = [];
	self.zoom = 1;
	self.pos = {
		x: 0,
		y: 0
	};


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
	}

	function clearScreen() {
		Canvas.ctx.globalAlpha = 1;
		Canvas.ctx.fillStyle = "#FFFFFF";
		Canvas.ctx.fillRect(0, 0, Canvas.width, Canvas.height);
		Canvas.ctx.fillStyle = "#000000";
		Canvas.ctx.globalAlpha = 1;
	}


	self.draw = function () {
		clearScreen();

		for (var i = 0, max = self.particles.length; i < max; i += 1) {
			Canvas.ctx.beginPath();
			Canvas.ctx.arc((self.particles[i].x + self.pos.x) * Math.pow(2, self.zoom) + (Canvas.width / 2), (self.particles[i].y + self.pos.y) * Math.pow(2, self.zoom) + (Canvas.height / 2), (self.particles[i].radius) * Math.pow(2, self.zoom), 0, 2 * Math.PI);
			Canvas.ctx.fill();
		}
	};

	self.setZoom = function (value) {
		self.zoom = Math.pow(2, self.zoom);
	};

	self.restart = function () {
		self.particles = [];
	};

	self.pause = function () {
		AnimLoop.updateFunction = function () {};
	};

	self.start = function () {
		AnimLoop.updateFunction = updateParticles;
		AnimLoop.drawFunction = self.draw;
		AnimLoop.start();
	};


	return self;
}({}));