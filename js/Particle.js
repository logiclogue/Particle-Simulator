var Particle = (function ()
{
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

	function addVelocity(speed, direction) {
		var speedAngle = calcSpeedAngle(this.speed, this.angle, speed, direction);

		this.angle = speedAngle.angle;
		this.speed = speedAngle.speed;
	}

	function addMomentum(speed, mass, angle) {
		var speedAngle = calcSpeedAngle(speed * mass, angle, this.speed * this.mass, this.angle);

		this.angle = speedAngle.angle;
		this.speed = speedAngle.speed / (this.mass + mass);
		this.newMass(this.mass + mass);
	}

	function checkCollision() {
		var self = this;
		Universe.particles.forEach(function (particle) {
			// calculate distance between particles
			var distance = Math.sqrt(Math.pow(particle.y - self.y, 2) + Math.pow(particle.x - self.x, 2));

			// if the particle is not itself
			// if the particle is colliding
			if (distance < particle.radius + self.radius && self.mass >= particle.mass && particle !== self) {
				addMomentum.call(self, particle.speed, particle.mass, particle.angle);
				particle.destroy();
			}
		});
	}

	function updatePos() {
		this.x += Math.sin(this.angle) * this.speed;
		this.y += -Math.cos(this.angle) * this.speed;

		// move camera if is the focus
		if (this.isFocus) {
			pos.x = this.x;
			pos.y = this.y;
		}
	}
	

	Particle.prototype.update = function () {
		updatePos.call(this);
		checkCollision.call(this);


		// gravity
		var self = this;
		Universe.particles.forEach(function (particle) {
			if (particle !== self) {
				var distance = Util.distance(particle.x, self.x, particle.y, self.y);
				var force = (self.mass * particle.mass) / Math.pow(distance, 2);
				var speed = force / self.mass;
				var angle = Math.atan2(particle.y - self.y, particle.x - self.x) + (Math.PI / 2);

				addVelocity.call(self, speed, angle);
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