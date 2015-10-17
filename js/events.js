var Events = (function (self) {
	var startX = 0;
	var startY = 0;
	var startD = 0;
	var isMoving = false;


	self.init = function () {
		Input.load(["btn-run", "div-settings", "div-pause", "input-seed", "input-speed", "myCanvas"]);

		Input["btn-run"].addEventListener("click", function () {
			Input["div-settings"].className = "hidden";
			Input["div-pause"].className = "";
			AnimLoop.setSpeed(Input["input-speed"].value);
			Universe.start();
		});

		Input["div-pause"].addEventListener("click", function () {
			Input["div-pause"].className = "hidden";
			Input["div-settings"].className = "";
			Universe.pause();
		});

		Input["input-seed"].addEventListener("keyup", function () {
			Spawn.seed = Input["input-seed"].value;
			Universe.restart();
			Spawn.particles();
		});

		// zoom event with the mouse wheel on the canvas
		Input["myCanvas"].addEventListener("wheel", function (e) {
			Universe.zoom += e.wheelDeltaY / 1000;
		});

		// when mouse down on the canvas, start of moving
		Input["myCanvas"].addEventListener("mousedown", function (e) {
			isMoving = true;
			startX = e.pageX;
			startY = e.pageY;
		});

		Input["myCanvas"].addEventListener("touchstart", function (e) {
			e.preventDefault();

			if (e.touches.length === 1) {
				isMoving = true;
				startX = e.touches[0].pageX;
				startY = e.touches[0].pageY;
			}
			else {
				startD = Util.distance(e.touches[0].pageX, e.touches[1].pageX, e.touches[0].pageY, e.touches[1].pageY);
			}
		});

		// when mouse down and moving
		Input["myCanvas"].addEventListener("mousemove", function (e) {
			if (isMoving) {
				Universe.pos.x -= (startX - e.pageX) / Math.pow(2, Universe.zoom);
				Universe.pos.y -= (startY - e.pageY) / Math.pow(2, Universe.zoom);
			}

			startX = e.pageX;
			startY = e.pageY;
		});

		Input["myCanvas"].addEventListener("touchmove", function (e) {
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
		});

		// when mouse is no longer down
		Input["myCanvas"].addEventListener("mouseup", function (e) {
			isMoving = false;
		});
	};


	return self;
}({}));