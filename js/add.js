var Add = (function (self) {

	var addParticle = function (e) {
		var newParticle = new Particle(
			(e.pageX - Canvas.width / 2) / Math.pow(2, Universe.zoom) - Universe.pos.x,
			(e.pageY - Canvas.height / 2) / Math.pow(2, Universe.zoom) - Universe.pos.y
		);
		newParticle.newMass(100);

		Input["myCanvas"].removeEventListener("click", addParticle);
		Input["myCanvas"].removeEventListener("mousemove", highlightParticle);
	};

	var highlightParticle = function (e) {
		Universe.draw();
		Universe.drawParticle(
			(e.pageX - Canvas.width / 2) / Math.pow(2, Universe.zoom) - Universe.pos.x,
			(e.pageY - Canvas.height / 2) / Math.pow(2, Universe.zoom) - Universe.pos.y,
			10,
			"#0000FF"
		);
		console.log(Universe.pos.x);
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