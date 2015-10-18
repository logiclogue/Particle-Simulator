var Add = (function (self) {
	var radius = 2,
		coord;

	function addParticle(e) {
		var coord = Util.posToCoord(e.pageX, e.pageY);
		var newParticle = new Particle(coord.x, coord.y);

		newParticle.newMass(Math.PI * Math.pow(Math.pow(2, radius), 2));
	}

	function drawParticle() {
		Universe.draw();
		Universe.drawParticle(coord.x, coord.y, Math.pow(2, radius), "#0000FF");
	}

	function highlightParticle(e) {
		coord = Util.posToCoord(e.pageX, e.pageY);
		
		drawParticle();
	}

	function resizeMass(e) {
		radius += e.wheelDeltaY / 1000;

		drawParticle();
	}

	function leave(e) {
		Input["btn-pause"].removeEventListener("click", leave);
		Input["myCanvas"].removeEventListener("click", addParticle);
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
		Input["myCanvas"].addEventListener("click", addParticle);
		Input["myCanvas"].addEventListener("mousemove", highlightParticle);
		Input["myCanvas"].addEventListener("wheel", resizeMass);
		Input["btn-pause"].addEventListener("click", leave);
	};


	return self;
}({}));