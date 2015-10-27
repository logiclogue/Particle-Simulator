var Particle = (function () {
	function Particle(_x, _y) {
		this.x = _x;
		this.y = _y;
		this.angle = 0;
		this.speed = 0;
		this.mass = 1;
		this.radius = 0;


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

	function addMomentum(self, speed, mass, angle) {
		var speedAngle = calcSpeedAngle(speed * mass, angle, self.speed * self.mass, self.angle);

		self.angle = speedAngle.angle;
		self.speed = speedAngle.speed / (self.mass + mass);
		self.newMass(self.mass + mass);
	}

	function checkCollision(self) {
		for (var i = 0, max = Universe.particles.length; i < max; i += 1) {
			// calculate distance between particles
			var distance = Math.sqrt(Math.pow(Universe.particles[i].y - self.y, 2) + Math.pow(Universe.particles[i].x - self.x, 2));

			// if the particle is not itself
			// if the particle is colliding
			if (distance < Universe.particles[i].radius + self.radius && self.mass > Universe.particles[i].mass && Universe.particles[i] !== self) {
				addMomentum(self, Universe.particles[i].speed, Universe.particles[i].mass, Universe.particles[i].angle);
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
		var self = this;
		Universe.particles.forEach(function (particle) {
			if (particle !== self) {
				var distance = Util.distance(particle.x, self.x, particle.y, self.y);
				var force = (self.mass * particle.mass) / Math.pow(distance, 2);
				var speed = force / self.mass;
				var angle = Math.atan2(particle.y - self.y, particle.x - self.x) + (Math.PI / 2);

				addVelocity(self, speed, angle);
			}
		});
	};

	Particle.prototype.newMass = function (mass) {
		this.mass = mass;
		this.radius = Math.sqrt(mass / Math.PI);
	};

	Particle.prototype.destroy = function () {
		Universe.particles.splice(Universe.particles.indexOf(this), 1);
	};


	return Particle;
}());