var Particle = function (_x, _y) {
	var self = this;
	
	self.x = _x;
	self.y = _y;
	self.angle = 0;
	self.speed = 0;
	self.mass = 1;
	self.isFocus = false;


	var addVelocity = function (speed, direction) {
		var o1 = Math.sin(self.angle) * self.speed;
		var a1 = Math.cos(self.angle) * self.speed;
		var o2 = Math.sin(direction) * speed;
		var a2 = Math.cos(direction) * speed;
		var opp = o1 + o2;
		var adj = a1 + a2;

		self.angle = Math.atan2(opp, adj);
		self.speed = Math.sqrt(Math.pow(opp, 2) + Math.pow(adj, 2));
	};

	var checkCollision = function () {
		for (var i = 0, max = Universe.particles.length; i < max; i += 1) {
			// if the particle is not itself
			// if the particle is colliding
			if (Math.sqrt(Math.pow(Universe.particles[i].y - self.y, 2) + Math.pow(Universe.particles[i].x - self.x, 2)) < Math.sqrt(Universe.particles[i].mass + self.mass) && self.mass > Universe.particles[i].mass && Universe.particles[i] !== self) {
				self.mass += Universe.particles[i].mass;
				self.speed = 0;
				Universe.particles[i].destroy();

				// decrement to prevent error
				i -= 1;
				max -= 1;
			}
		}
	};

	var updatePos = function () {
		self.x += Math.sin(self.angle) * self.speed;
		self.y += -Math.cos(self.angle) * self.speed;

		// move camera if is the focus
		if (self.isFocus) {
			pos.x = self.x;
			pos.y = self.y;
		}
	};
	

	self.update = function () {
		updatePos();
		checkCollision();

		// gravity
		for (var i = 0, max = Universe.particles.length; i < max; i += 1) {
			if (Universe.particles[i] !== self) {
				var distance = Math.pow(Math.sqrt(Math.pow(Universe.particles[i].x - self.x, 2) + Math.pow(Universe.particles[i].y - self.y, 2)), 2);
				var force = (self.mass * Universe.particles[i].mass) / distance;
				var speed = force / self.mass;
				var angle = Math.atan2(Universe.particles[i].y - self.y, Universe.particles[i].x - self.x) + (Math.PI / 2);

				addVelocity(speed, angle);
			}
		}
	};

	self.focus = function () {
		for (var i = 0, max = Universe.particles.length; i < max; i += 1) {
			Universe.particles[i].isFocus = false;
		}

		self.isFocus = true;
	};

	self.destroy = function () {
		Universe.particles.splice(Universe.particles.indexOf(self), 1);
	};

	
	Universe.particles.push(self);
};