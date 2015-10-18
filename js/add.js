var Add = (function (self) {

	function addParticle(e) {
		var coord = Util.posToCoord(e.pageX, e.pageY);
		var newParticle = new Particle(coord.x, coord.y);

		newParticle.newMass(100);
	};

	function  highlightParticle(e) {
		var coord = Util.posToCoord(e.pageX, e.pageY);

		Universe.draw();
		Universe.drawParticle(coord.x, coord.y, 10, "#0000FF");
	};

	function leave(e) {
		Input["btn-pause"].removeEventListener("click", leave);
		Input["myCanvas"].removeEventListener("click", addParticle);
		Input["myCanvas"].removeEventListener("mousemove", highlightParticle);

		// resume scrolling
		Scroll.init();

		// resume drawing
		AnimLoop.drawFunction = Universe.draw;
	};

	function clicked() {
		// stop scrolling;
		Scroll.stop();

		// stop drawing
		AnimLoop.drawFunction = function () {};

		Events.hideElement("div-settings");
		Events.showElement("btn-pause");

		Input["myCanvas"].addEventListener("click", addParticle);
		Input["myCanvas"].addEventListener("mousemove", highlightParticle);
		Input["btn-pause"].addEventListener("click", leave);
	};


	self.init = function () {
		Input["btn-add"].addEventListener("click", clicked);
	};


	return self;
}({}));