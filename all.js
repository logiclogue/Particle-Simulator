var Add = (function (self) {
	var radius = 2,
		coord,
		isDown = false,
		startX = 0,
		startY = 0;


	function addParticle(e) {
		coord = Util.posToCoord(e.pageX, e.pageY);
		startCoord = Util.posToCoord(startX, startY);
		isDown = false;

		var newParticle = new Particle(coord.x, coord.y);
		newParticle.newMass(Math.PI * Math.pow(Math.pow(2, radius), 2));
		newParticle.speed = Util.distance(coord.x, startCoord.x, coord.y, startCoord.y) / 10;
		newParticle.angle = Math.atan2(startCoord.y - coord.y, startCoord.x - coord.x) + (Math.PI / 2);
	}

	function initPos(e) {
		isDown = true;
		startX = e.pageX;
		startY = e.pageY;
	}

	function drawParticle() {
		Universe.draw();
		Universe.drawParticle(coord.x, coord.y, Math.pow(2, radius), '#0000FF');
	}

	function drawLine(endX, endY) {
		Canvas.ctx.beginPath();
		Canvas.ctx.moveTo(startX, startY);
		Canvas.ctx.lineTo(endX, endY);
		Canvas.ctx.stroke();
	}

	function highlightParticle(e) {
		coord = Util.posToCoord(e.pageX, e.pageY);
		
		drawParticle();

		if (isDown) {
			drawLine(e.pageX, e.pageY);
		}
	}

	function resizeMass(e) {
		radius += e.wheelDeltaY / 1000;

		drawParticle();
	}

	function leave(e) {
		Input['btn-pause'].removeEventListener('click', leave);
		Input['myCanvas'].removeEventListener('mousedown', initPos);
		Input['myCanvas'].removeEventListener('mouseup', addParticle);
		Input['myCanvas'].removeEventListener('mousemove', highlightParticle);
		Input['myCanvas'].removeEventListener('wheel', resizeMass);

		// resume scrolling
		Scroll.init();

		// resume drawing
		AnimLoop.drawFunction = Universe.draw;
	}


	self.init = function () {
		// stop scrolling;
		Scroll.stop();

		// stop drawing
		AnimLoop.drawFunction = function () {};

		Input.hideElement('div-settings');
		Input.showElement('btn-pause');

		// events
		Input['myCanvas'].addEventListener('mousedown', initPos);
		Input['myCanvas'].addEventListener('mouseup', addParticle);
		Input['myCanvas'].addEventListener('mousemove', highlightParticle);
		Input['myCanvas'].addEventListener('wheel', resizeMass);
		Input['btn-pause'].addEventListener('click', leave);
	};


	return self;
}({}));
var AnimLoop = (function (self) {
	self.updateFunction = function () {};
	self.drawFunction = function () {};
	self.cycles = 0;

	var lastFrameTimeMs = 0,
		maxFPS = 48,
		delta = 0,
		lastFpsUpdate = 0,
		framesThisSecond = 0,
		timestep = 17,
		fps = 30,
		lastDelta = 0,
		numTotal;


	var loop = function (timestamp) {
		if (window.requestAnimationFrame === null) {
			timestamp = new Date().getTime();
		}

		if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
			if (window.requestAnimationFrame !== null) {
				requestAnimationFrame(loop);
			}
			else {
				setTimeout(loop, 1);
			}

			return
		}

		delta = timestamp - lastFrameTimeMs + lastDelta;
		lastFrameTimeMs = timestamp;

		if (timestamp > lastFpsUpdate + 1000) {
			fps = 0.25 * framesThisSecond + 0.75 * fps;
			lastFpsUpdate = timestamp;
			framesThisSecond = 0;
		}

		framesThisSecond += 1;

		var numUpdateSteps = 0;

		while (delta >= timestep) {
			self.cycles += 1;
			self.updateFunction(timestep);
			delta -= timestep;

			if (++numUpdateSteps >= 240) {
				delta = 0;
				break;
			}
		}

		if (isNaN(delta) ? lastDelta = 0 : lastDelta = delta);

		self.drawFunction();

		if (window.requestAnimationFrame !== null) {
			requestAnimationFrame(loop);
		}
		else {
			setTimeout(loop, 1);
		}
	};


	self.start = function () {
		loop();
	};

	self.stop = function () {

	};

	self.setSpeed = function (speed) {
		timestep = 1000 / speed;
	};


	return self;
}({}));
// Jordan Lord 18/12/14
// resumed 05/10/15

var Canvas = (function (self) {
	self.c = document.getElementById('myCanvas');
	self.ctx = self.c.getContext('2d');
	self.c.width = window.innerWidth;
	self.c.height = window.innerHeight;
	self.width = self.c.width;
	self.height = self.c.height;


	return self;
}({}));
window.addEventListener('load', function () {
	Spawn.particles();
	Input.init();
});
var Input = (function (self) {
	
	function getElement(el_id) {
		self[el_id] = document.getElementById(el_id);
	}


	self.hideElement = function (element) {
		Input[element].className = 'hidden';
	};

	self.showElement = function (element) {
		Input[element].className = '';
	};

	self.load = function (arrayElements) {
		for (var i = 0, max = arrayElements.length; i < max; i += 1) {
			getElement(arrayElements[i]);
		}
	};

	self.init = function () {
		self.load(['btn-run', 'btn-add', 'div-settings', 'btn-pause', 'btn-clear', 'btn-reset', 'input-seed', 'input-speed', 'myCanvas']);

		Scroll.init();
		Settings.init();
	};


	return self;
}({}));
var Md5 = (function (self) {

	/*
	CryptoJS v3.1.2
	code.google.com/p/crypto-js
	(c) 2009-2013 by Jeff Mott. All rights reserved.
	code.google.com/p/crypto-js/wiki/License
	*/
	var CryptoJS=CryptoJS||function(s,p){var m={},l=m.lib={},n=function(){},r=l.Base={extend:function(b){n.prototype=this;var h=new n;b&&h.mixIn(b);h.hasOwnProperty("init")||(h.init=function(){h.$super.init.apply(this,arguments)});h.init.prototype=h;h.$super=this;return h},create:function(){var b=this.extend();b.init.apply(b,arguments);return b},init:function(){},mixIn:function(b){for(var h in b)b.hasOwnProperty(h)&&(this[h]=b[h]);b.hasOwnProperty("toString")&&(this.toString=b.toString)},clone:function(){return this.init.prototype.extend(this)}},
	q=l.WordArray=r.extend({init:function(b,h){b=this.words=b||[];this.sigBytes=h!=p?h:4*b.length},toString:function(b){return(b||t).stringify(this)},concat:function(b){var h=this.words,a=b.words,j=this.sigBytes;b=b.sigBytes;this.clamp();if(j%4)for(var g=0;g<b;g++)h[j+g>>>2]|=(a[g>>>2]>>>24-8*(g%4)&255)<<24-8*((j+g)%4);else if(65535<a.length)for(g=0;g<b;g+=4)h[j+g>>>2]=a[g>>>2];else h.push.apply(h,a);this.sigBytes+=b;return this},clamp:function(){var b=this.words,h=this.sigBytes;b[h>>>2]&=4294967295<<
	32-8*(h%4);b.length=s.ceil(h/4)},clone:function(){var b=r.clone.call(this);b.words=this.words.slice(0);return b},random:function(b){for(var h=[],a=0;a<b;a+=4)h.push(4294967296*s.random()|0);return new q.init(h,b)}}),v=m.enc={},t=v.Hex={stringify:function(b){var a=b.words;b=b.sigBytes;for(var g=[],j=0;j<b;j++){var k=a[j>>>2]>>>24-8*(j%4)&255;g.push((k>>>4).toString(16));g.push((k&15).toString(16))}return g.join("")},parse:function(b){for(var a=b.length,g=[],j=0;j<a;j+=2)g[j>>>3]|=parseInt(b.substr(j,
	2),16)<<24-4*(j%8);return new q.init(g,a/2)}},a=v.Latin1={stringify:function(b){var a=b.words;b=b.sigBytes;for(var g=[],j=0;j<b;j++)g.push(String.fromCharCode(a[j>>>2]>>>24-8*(j%4)&255));return g.join("")},parse:function(b){for(var a=b.length,g=[],j=0;j<a;j++)g[j>>>2]|=(b.charCodeAt(j)&255)<<24-8*(j%4);return new q.init(g,a)}},u=v.Utf8={stringify:function(b){try{return decodeURIComponent(escape(a.stringify(b)))}catch(g){throw Error("Malformed UTF-8 data");}},parse:function(b){return a.parse(unescape(encodeURIComponent(b)))}},
	g=l.BufferedBlockAlgorithm=r.extend({reset:function(){this._data=new q.init;this._nDataBytes=0},_append:function(b){"string"==typeof b&&(b=u.parse(b));this._data.concat(b);this._nDataBytes+=b.sigBytes},_process:function(b){var a=this._data,g=a.words,j=a.sigBytes,k=this.blockSize,m=j/(4*k),m=b?s.ceil(m):s.max((m|0)-this._minBufferSize,0);b=m*k;j=s.min(4*b,j);if(b){for(var l=0;l<b;l+=k)this._doProcessBlock(g,l);l=g.splice(0,b);a.sigBytes-=j}return new q.init(l,j)},clone:function(){var b=r.clone.call(this);
	b._data=this._data.clone();return b},_minBufferSize:0});l.Hasher=g.extend({cfg:r.extend(),init:function(b){this.cfg=this.cfg.extend(b);this.reset()},reset:function(){g.reset.call(this);this._doReset()},update:function(b){this._append(b);this._process();return this},finalize:function(b){b&&this._append(b);return this._doFinalize()},blockSize:16,_createHelper:function(b){return function(a,g){return(new b.init(g)).finalize(a)}},_createHmacHelper:function(b){return function(a,g){return(new k.HMAC.init(b,
	g)).finalize(a)}}});var k=m.algo={};return m}(Math);
	(function(s){function p(a,k,b,h,l,j,m){a=a+(k&b|~k&h)+l+m;return(a<<j|a>>>32-j)+k}function m(a,k,b,h,l,j,m){a=a+(k&h|b&~h)+l+m;return(a<<j|a>>>32-j)+k}function l(a,k,b,h,l,j,m){a=a+(k^b^h)+l+m;return(a<<j|a>>>32-j)+k}function n(a,k,b,h,l,j,m){a=a+(b^(k|~h))+l+m;return(a<<j|a>>>32-j)+k}for(var r=CryptoJS,q=r.lib,v=q.WordArray,t=q.Hasher,q=r.algo,a=[],u=0;64>u;u++)a[u]=4294967296*s.abs(s.sin(u+1))|0;q=q.MD5=t.extend({_doReset:function(){this._hash=new v.init([1732584193,4023233417,2562383102,271733878])},
	_doProcessBlock:function(g,k){for(var b=0;16>b;b++){var h=k+b,w=g[h];g[h]=(w<<8|w>>>24)&16711935|(w<<24|w>>>8)&4278255360}var b=this._hash.words,h=g[k+0],w=g[k+1],j=g[k+2],q=g[k+3],r=g[k+4],s=g[k+5],t=g[k+6],u=g[k+7],v=g[k+8],x=g[k+9],y=g[k+10],z=g[k+11],A=g[k+12],B=g[k+13],C=g[k+14],D=g[k+15],c=b[0],d=b[1],e=b[2],f=b[3],c=p(c,d,e,f,h,7,a[0]),f=p(f,c,d,e,w,12,a[1]),e=p(e,f,c,d,j,17,a[2]),d=p(d,e,f,c,q,22,a[3]),c=p(c,d,e,f,r,7,a[4]),f=p(f,c,d,e,s,12,a[5]),e=p(e,f,c,d,t,17,a[6]),d=p(d,e,f,c,u,22,a[7]),
	c=p(c,d,e,f,v,7,a[8]),f=p(f,c,d,e,x,12,a[9]),e=p(e,f,c,d,y,17,a[10]),d=p(d,e,f,c,z,22,a[11]),c=p(c,d,e,f,A,7,a[12]),f=p(f,c,d,e,B,12,a[13]),e=p(e,f,c,d,C,17,a[14]),d=p(d,e,f,c,D,22,a[15]),c=m(c,d,e,f,w,5,a[16]),f=m(f,c,d,e,t,9,a[17]),e=m(e,f,c,d,z,14,a[18]),d=m(d,e,f,c,h,20,a[19]),c=m(c,d,e,f,s,5,a[20]),f=m(f,c,d,e,y,9,a[21]),e=m(e,f,c,d,D,14,a[22]),d=m(d,e,f,c,r,20,a[23]),c=m(c,d,e,f,x,5,a[24]),f=m(f,c,d,e,C,9,a[25]),e=m(e,f,c,d,q,14,a[26]),d=m(d,e,f,c,v,20,a[27]),c=m(c,d,e,f,B,5,a[28]),f=m(f,c,
	d,e,j,9,a[29]),e=m(e,f,c,d,u,14,a[30]),d=m(d,e,f,c,A,20,a[31]),c=l(c,d,e,f,s,4,a[32]),f=l(f,c,d,e,v,11,a[33]),e=l(e,f,c,d,z,16,a[34]),d=l(d,e,f,c,C,23,a[35]),c=l(c,d,e,f,w,4,a[36]),f=l(f,c,d,e,r,11,a[37]),e=l(e,f,c,d,u,16,a[38]),d=l(d,e,f,c,y,23,a[39]),c=l(c,d,e,f,B,4,a[40]),f=l(f,c,d,e,h,11,a[41]),e=l(e,f,c,d,q,16,a[42]),d=l(d,e,f,c,t,23,a[43]),c=l(c,d,e,f,x,4,a[44]),f=l(f,c,d,e,A,11,a[45]),e=l(e,f,c,d,D,16,a[46]),d=l(d,e,f,c,j,23,a[47]),c=n(c,d,e,f,h,6,a[48]),f=n(f,c,d,e,u,10,a[49]),e=n(e,f,c,d,
	C,15,a[50]),d=n(d,e,f,c,s,21,a[51]),c=n(c,d,e,f,A,6,a[52]),f=n(f,c,d,e,q,10,a[53]),e=n(e,f,c,d,y,15,a[54]),d=n(d,e,f,c,w,21,a[55]),c=n(c,d,e,f,v,6,a[56]),f=n(f,c,d,e,D,10,a[57]),e=n(e,f,c,d,t,15,a[58]),d=n(d,e,f,c,B,21,a[59]),c=n(c,d,e,f,r,6,a[60]),f=n(f,c,d,e,z,10,a[61]),e=n(e,f,c,d,j,15,a[62]),d=n(d,e,f,c,x,21,a[63]);b[0]=b[0]+c|0;b[1]=b[1]+d|0;b[2]=b[2]+e|0;b[3]=b[3]+f|0},_doFinalize:function(){var a=this._data,k=a.words,b=8*this._nDataBytes,h=8*a.sigBytes;k[h>>>5]|=128<<24-h%32;var l=s.floor(b/
	4294967296);k[(h+64>>>9<<4)+15]=(l<<8|l>>>24)&16711935|(l<<24|l>>>8)&4278255360;k[(h+64>>>9<<4)+14]=(b<<8|b>>>24)&16711935|(b<<24|b>>>8)&4278255360;a.sigBytes=4*(k.length+1);this._process();a=this._hash;k=a.words;for(b=0;4>b;b++)h=k[b],k[b]=(h<<8|h>>>24)&16711935|(h<<24|h>>>8)&4278255360;return a},clone:function(){var a=t.clone.call(this);a._hash=this._hash.clone();return a}});r.MD5=t._createHelper(q);r.HmacMD5=t._createHmacHelper(q)})(Math);

	
	self.rand = function (n) {
		return parseInt(CryptoJS.MD5(n + ''), 16) / parseInt('ffffffffffffffffffffffffffffffff', 16);
	};

	self.hash = function (n) {
		return CryptoJS.MD5(n);
	};

	return self;
}({}));
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
var Scroll = (function (self) {
	var startX = 0,
		startY = 0,
		startD = 0,
		isMoving = false;


	// mouse controls
	function zoom(e) {
		Universe.zoom += e.wheelDeltaY / 1000;
	}

	function mousedown(e) {
		isMoving = true;
		startX = e.pageX;
		startY = e.pageY;
	}

	function mousemove(e) {
		if (isMoving) {
			Universe.pos.x -= (startX - e.pageX) / Math.pow(2, Universe.zoom);
			Universe.pos.y -= (startY - e.pageY) / Math.pow(2, Universe.zoom);
		}

		startX = e.pageX;
		startY = e.pageY;
	}

	function mouseup(e) {
		isMoving = false;
	}

	// touch controls
	function touchstart(e) {
		e.preventDefault();

		if (e.touches.length === 1) {
			isMoving = true;
			startX = e.touches[0].pageX;
			startY = e.touches[0].pageY;
		}
		else {
			startD = Util.distance(e.touches[0].pageX, e.touches[1].pageX, e.touches[0].pageY, e.touches[1].pageY);
		}
	}

	function touchmove(e) {
		e.preventDefault();

		if (e.touches.length === 1) {
			Universe.pos.x -= (startX - e.touches[0].pageX) / Math.pow(2, Universe.zoom);
			Universe.pos.y -= (startY - e.touches[0].pageY) / Math.pow(2, Universe.zoom);

			startX = e.touches[0].pageX;
			startY = e.touches[0].pageY;
		}
		else {
			var distance = Util.distance(e.touches[0].pageX, e.touches[1].pageX, e.touches[0].pageY, e.touches[1].pageY);
			
			startD -= distance;
			Universe.zoom -= startD / 1000;
			startD = distance;
		}
	}


	self.init = function () {
		Input['myCanvas'].addEventListener('wheel', zoom);
		Input['myCanvas'].addEventListener('mousedown', mousedown);
		Input['myCanvas'].addEventListener('mousemove', mousemove);
		Input['myCanvas'].addEventListener('mouseup', mouseup);
		Input['myCanvas'].addEventListener('touchstart', touchstart);
		Input['myCanvas'].addEventListener('touchmove', touchmove);
	};

	self.stop = function () {
		Input['myCanvas'].removeEventListener('wheel', zoom);
		Input['myCanvas'].removeEventListener('mousedown', mousedown);
		Input['myCanvas'].removeEventListener('mousemove', mousemove);
		Input['myCanvas'].removeEventListener('mouseup', mouseup);
		Input['myCanvas'].removeEventListener('touchstart', touchstart);
		Input['myCanvas'].removeEventListener('touchmove', touchmove);
	};


	return self;
}({}));
var Settings = (function (self) {

	function runButton() {
		Input.hideElement('div-settings');
		Input.showElement('btn-pause');
		AnimLoop.setSpeed(Input['input-speed'].value);
		Universe.start();
	}

	function pauseButton() {
		Input.hideElement('btn-pause');
		Input.showElement('div-settings');
		Universe.pause();
	}

	function clearButton() {
		Universe.restart();
	}

	function seedChange() {
		Spawn.seed = Input['input-seed'].value;
		Universe.restart();
		Spawn.particles();
	}


	self.init = function () {
		Input['btn-run'].addEventListener('click', runButton);
		Input['btn-pause'].addEventListener('click', pauseButton);
		Input['btn-add'].addEventListener('click', Add.init);
		Input['btn-clear'].addEventListener('click', clearButton);
		Input['btn-reset'].addEventListener('click', seedChange);
		Input['input-seed'].addEventListener('keyup', seedChange);
	};

	return self;
}({}));
var Spawn = (function (self) {
	self.seed = '';

	self.particles = function () {
		// spawn particles
		for (var i = 0; i < 100; i += 1) {
			var theParticle = new Particle(
				5000 * Md5.rand(self.seed + i + 'x') - 2500,
				5000 * Md5.rand(self.seed + i + 'y') - 2500
			);

			theParticle.newMass(1 * Md5.rand(self.seed + '_' + i) + 50);
		}

		Universe.start();
		Universe.pause();
	};

	return self;
}({}));
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
		Canvas.ctx.fillStyle = '#FFFFFF';
		Canvas.ctx.fillRect(0, 0, Canvas.width, Canvas.height);
		Canvas.ctx.fillStyle = '#000000';
		Canvas.ctx.globalAlpha = 1;
	}


	self.drawParticle = function (x, y, radius, colour) {
		colour = colour || '#000000';
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
var Util = (function () {
	var self = this;


	self.degToRad = function (degrees) {
		return degrees * (Math.PI / 180);
	}

	self.radToDeg = function (radians) {
		return radians * (180 / Math.PI);
	}

	self.distance = function (x_0, x_1, y_0, y_1) {
		return Math.sqrt(Math.pow(x_0 - x_1, 2) + Math.pow(y_0 - y_1, 2));
	}

	self.posToCoord = function (pageX, pageY) {
		return {
			x: (pageX - Canvas.width / 2) / Math.pow(2, Universe.zoom) - Universe.pos.x,
			y: (pageY - Canvas.height / 2) / Math.pow(2, Universe.zoom) - Universe.pos.y
		};
	}


	return self;
}());