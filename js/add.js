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

		var newParticle = new Particle(coord.x, coord.y)
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
		Universe.drawParticle(coord.x, coord.y, Math.pow(2, radius), "#0000FF");
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
		Input["btn-pause"].removeEventListener("click", leave);
		Input["myCanvas"].removeEventListener("mousedown", initPos);
		Input["myCanvas"].removeEventListener("mouseup", addParticle);
		Input["myCanvas"].removeEventListener("mousemove", highlightParticle);
		Input["myCanvas"].removeEventListener("wheel", resizeMass);

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

		Input.hideElement("div-settings");
		Input.showElement("btn-pause");

		// events
		Input["myCanvas"].addEventListener("mousedown", initPos);
		Input["myCanvas"].addEventListener("mouseup", addParticle);
		Input["myCanvas"].addEventListener("mousemove", highlightParticle);
		Input["myCanvas"].addEventListener("wheel", resizeMass);
		Input["btn-pause"].addEventListener("click", leave);
	};


	return self;
}({}));