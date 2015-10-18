var Add = (function (self) {

	var addParticle = function (e) {
		var coord = Util.posToCoord(e.pageX, e.pageY);
		var newParticle = new Particle(coord.x, coord.y);
		
		newParticle.newMass(100);

		Input["myCanvas"].removeEventListener("click", addParticle);
		Input["myCanvas"].removeEventListener("mousemove", highlightParticle);
	};

	var highlightParticle = function (e) {
		var coord = Util.posToCoord(e.pageX, e.pageY);

		Universe.draw();
		Universe.drawParticle(coord.x, coord.y, 10, "#0000FF");
	};

	var clicked = function () {
		Events.hideElement("div-settings");
		Events.showElement("div-pause");

		AnimLoop.drawFunction = function () {};

		Input["myCanvas"].addEventListener("click", addParticle);
		Input["myCanvas"].addEventListener("mousemove", highlightParticle);
	};


	self.init = function () {
		Input["btn-add"].addEventListener("click", clicked);
	};


	return self;
}({}));