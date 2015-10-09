var Particle = (function () {
	function Particle(_x, _y) {
		this.x = _x;
		this.y = _y;
		this.angle = 0;
		this.speed = 0;
		this.mass = 1;
		this.isFocus = false;


		Universe.particles.push(this);
	}


	function calcSpeedAngle(speed_1, angle_1, speed_2, angle_2) {
		var o1 = Math.sin(angle_1) * speed_1;
		var a1 = Math.cos(angle_1) * speed_1;
		var o2 = Math.sin(angle_2) * speed_2;
		var a2 = Math.cos(angle_2) * speed_2;
		var opp = o1 + o2;
		var adj = a1 + a2;

		return {
			angle: Math.atan2(opp, adj),
			speed: Math.sqrt(Math.pow(opp, 2) + Math.pow(adj, 2))
		};
	}

	function addVelocity(self, speed, direction) {
		var speedAngle = calcSpeedAngle(self.speed, self.angle, speed, direction);

		self.angle = speedAngle.angle;
		self.speed = speedAngle.speed;
	}

	function addMomentum(self, speed, mass, direction) {
		var speedAngle = calcSpeedAngle(self.speed * self.mass, self.angle, speed * mass, direction);

		self.angle = speedAngle.angle;
		self.speed = speedAngle.speed / (self.mass + mass);
	}

	console.log(calcSpeedAngle(10, 0, 20, Math.PI));

	function checkCollision(self) {
		for (var i = 0, max = Universe.particles.length; i < max; i += 1) {
			// if the particle is not itself
			// if the particle is colliding
			if (Math.sqrt(Math.pow(Universe.particles[i].y - self.y, 2) + Math.pow(Universe.particles[i].x - self.x, 2)) < Math.sqrt(Universe.particles[i].mass + self.mass) && self.mass > Universe.particles[i].mass && Universe.particles[i] !== self) {
				self.mass += Universe.particles[i].mass;
				//addMomentum(this, Universe.particles[i].speed, Universe.particles[i].mass, Universe.particles[i].direction);
				self.speed = 0;
				Universe.particles[i].destroy();

				// decrement to prevent error
				i -= 1;
				max -= 1;
			}
		}
	}

	function updatePos(self) {
		self.x += Math.sin(self.angle) * self.speed;
		self.y += -Math.cos(self.angle) * self.speed;

		// move camera if is the focus
		if (self.isFocus) {
			pos.x = self.x;
			pos.y = self.y;
		}
	}
	

	Particle.prototype.update = function () {
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

	Particle.prototype.focus = function () {
		for (var i = 0, max = Universe.particles.length; i < max; i += 1) {
			Universe.particles[i].isFocus = false;
		}

		this.isFocus = true;
	};

	Particle.prototype.destroy = function () {
		Universe.particles.splice(Universe.particles.indexOf(this), 1);
	};


	return Particle;
}());