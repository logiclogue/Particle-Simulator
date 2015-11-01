var Universe = (function (self) {
	var interval;

	self.particles = [];
	self.zoom = 1;
	self.pos = {
		x: 0,
		y: 0
	};


	self.update = function () {
		self.particles.forEach(function (particle) {
			particle.update();
		});
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

		self.particles.forEach(function (particle) {
			self.drawParticle(particle.x, particle.y, particle.radius);
		});
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