// Jordan Lord 18/12/14

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var particles = [];
var pos = {
	x: 0,
	y: 0
};

c.width = document.body.clientWidth;
c.height = document.body.clientHeight;



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

		// gravity
		for (var i = 0, max = particles.length; i < max; i += 1) {
			if (particles[i] !== self) {
				var force = (100 * self.mass * particles[i].mass) / Math.pow(Math.sqrt(Math.pow(particles[i].x - self.x, 2) + Math.pow(particles[i].y - self.y, 2)), 2);
				var speed = force / self.mass;
				var angle = Math.atan2(particles[i].y - self.y, particles[i].x - self.x) + (Math.PI / 2);

				addVelocity(speed, angle);
			}
		}
	};

	self.focus = function () {
		for (var i = 0, max = particles.length; i < max; i += 1) {
			particles[i].isFocus = false;
		}

		self.isFocus = true;
	};

	
	particles.push(self);
};

var mainLoop = function () {
	// refresh the screen
	ctx.globalAlpha = 0.1;
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(0, 0, c.width, c.height);
	ctx.fillStyle = "#000000";
	ctx.globalAlpha = 1.0;
	
	// draw particles
	updateParticles();
}

function updateParticles() {
	// update all particles and draw them
	for (var i = 0, max = particles.length; i < max; i += 1) {
		particles[i].update();

		ctx.beginPath();
		ctx.arc(particles[i].x - pos.x + (c.width / 2), particles[i].y - pos.y + (c.height / 2), particles[i].mass, 0, 2 * Math.PI);
		ctx.fill();
	}
}

function degToRad(degrees) {
	return degrees * (Math.PI / 180);
}

function radToDeg(radians) {
	return radians * (180 / Math.PI);
}


(function () {
	setInterval(mainLoop, 1000/60);
	
	var earth = new Particle(100, 100);
	earth.speed = 0.8;
	earth.angle = 0;

	var moon = new Particle(50, 50);
	moon.speed = 0.8;
	moon.angle = Math.PI;

	var paul = new Particle(200, 100);
	paul.mass = 1;

	//paul.focus();
}());