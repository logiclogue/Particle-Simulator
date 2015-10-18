var Events = (function (self) {
	var startX = 0;
	var startY = 0;
	var startD = 0;
	var isMoving = false;


	self.hideElement = function (element) {
		Input[element].className = "hidden";
	}

	self.showElement = function (element) {
		Input[element].className = "";
	}

	self.init = function () {
		Input.load(["btn-run", "btn-add", "div-settings", "btn-pause", "input-seed", "input-speed", "myCanvas"]);

		Input["btn-run"].addEventListener("click", function () {
			self.hideElement("div-settings");
			self.showElement("btn-pause");
			AnimLoop.setSpeed(Input["input-speed"].value);
			Universe.start();
		});

		Input["btn-pause"].addEventListener("click", function () {
			self.hideElement("btn-pause");
			self.showElement("div-settings");
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

		Add.init();
	};


	return self;
}({}));