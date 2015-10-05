// Jordan Lord 18/12/14

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var particles = [];

c.width = document.body.clientWidth;
c.height = document.body.clientHeight;



var Particle = function (_x, _y) {
	var self = this;
	
	self.x = _x;
	self.y = _y;
	self.angle = 0;
	self.speed = 0;
	self.mass = 10;
	
	self.update = function () {
		self.x += Math.sin(degToRad(self.angle)) * self.speed;
		self.y += -Math.cos(degToRad(self.angle)) * self.speed;
		
		// gravity
		for (var i = 0, max = particles.length; i < max; i += 1) {
			if (particles[i] !== self) {
				self.speed += (self.mass * particles[i].mass) / Math.pow(Math.sqrt(Math.pow(particles[i].x - self.x, 2) + Math.pow(particles[i].y - self.y, 2)), 2);
				self.angle = Math.atan(Math.sqrt(Math.pow(particles[i].x - self.x, 2) + Math.pow(particles[i].y - self.y, 2)));
			}
		}
	};
	
	particles.push(self);
};

var mainLoop = function () {
	// refresh the screen
	ctx.clearRect(0, 0, c.width, c.height);
	
	updateParticles();
}

function updateParticles() {
	// update all particles and draw them
	for (var i = 0, max = particles.length; i < max; i += 1) {
		ctx.beginPath();
		ctx.moveTo(particles[i].x, particles[i].y);
		particles[i].update();
		ctx.lineTo(particles[i].x, particles[i].y);
		ctx.stroke();
		ctx.fillRect(particles[i].x, particles[i].y, 10, 10);
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
	
	var earth = new Particle(500, 500);
	var moon = new Particle(50, 50);
	earth.speed = 1;
	
	
	console.log((10 * 1) / Math.pow(1, 2));
}());