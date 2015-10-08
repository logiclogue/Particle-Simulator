var Particle = (function () {
	function self(_x, _y) {
		this.x = _x;
		this.y = _y;
		this.angle = 0;
		this.speed = 0;
		this.mass = 1;
		this.isFocus = false;


		Universe.particles.push(this);
	}


	function addVelocity(self, speed, direction) {
		var o1 = Math.sin(self.angle) * self.speed;
		var a1 = Math.cos(self.angle) * self.speed;
		var o2 = Math.sin(direction) * speed;
		var a2 = Math.cos(direction) * speed;
		var opp = o1 + o2;
		var adj = a1 + a2;

		self.angle = Math.atan2(opp, adj);
		self.speed = Math.sqrt(Math.pow(opp, 2) + Math.pow(adj, 2));
	};

	function checkCollision(self) {
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

	function updatePos(self) {
		self.x += Math.sin(self.angle) * self.speed;
		self.y += -Math.cos(self.angle) * self.speed;

		// move camera if is the focus
		if (self.isFocus) {
			pos.x = self.x;
			pos.y = self.y;
		}
	};
	

	self.prototype.update = function () {
		updatePos(this);
		checkCollision(this);

		// gravity
		for (var i = 0, max = Universe.particles.length; i < max; i += 1) {
			if (Universe.particles[i] !== this) {
				var distance = Math.pow(Math.sqrt(Math.pow(Universe.particles[i].x - this.x, 2) + Math.pow(Universe.particles[i].y - this.y, 2)), 2);
				var force = (this.mass * Universe.particles[i].mass) / distance;
				var speed = force / this.mass;
				var angle = Math.atan2(Universe.particles[i].y - this.y, Universe.particles[i].x - this.x) + (Math.PI / 2);

				addVelocity(this, speed, angle);
			}
		}
	};

	self.prototype.focus = function () {
		for (var i = 0, max = Universe.particles.length; i < max; i += 1) {
			Universe.particles[i].isFocus = false;
		}

		this.isFocus = true;
	};

	self.prototype.destroy = function () {
		Universe.particles.splice(Universe.particles.indexOf(this), 1);
	};


	return self;
}());