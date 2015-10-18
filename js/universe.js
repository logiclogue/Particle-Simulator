var Universe = (function (self) {
	var interval;

	self.particles = [];
	self.zoom = 1;
	self.pos = {
		x: 0,
		y: 0
	};


	self.update = function () {
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


	self.drawParticle = function (x, y, radius, colour) {
		colour = colour || "#000000";
		Canvas.ctx.fillStyle = colour;
		Canvas.ctx.beginPath();
		Canvas.ctx.arc(
			(x + self.pos.x) * Math.pow(2, self.zoom) + (Canvas.width / 2),
			(y + self.pos.y) * Math.pow(2, self.zoom) + (Canvas.height / 2),
			radius * Math.pow(2, self.zoom),
			0,
			2 * Math.PI
		);
		Canvas.ctx.fill();
	};

	self.draw = function () {
		clearScreen();

		for (var i = 0, max = self.particles.length; i < max; i += 1) {
			self.drawParticle(self.particles[i].x, self.particles[i].y, self.particles[i].radius);
		}
	};

	self.restart = function () {
		self.particles = [];
	};

	self.pause = function () {
		AnimLoop.updateFunction = function () {};
	};

	self.start = function () {
		AnimLoop.updateFunction = self.update;
		AnimLoop.drawFunction = self.draw;
		AnimLoop.start();
	};


	return self;
}({}));