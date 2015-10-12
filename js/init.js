(function () {
	var seed = "";
	var startX = 0;
	var startY = 0;
	var isMoving = false;

	function spawnParticles() {
		// spawn particles
		for (var i = 0; i < 100; i += 1) {
			var theParticle = new Particle(5000 * Md5.rand(seed + i + "x"), 5000 * Md5.rand(seed + i + "y"));

			theParticle.newMass(1 * Md5.rand(seed + "_" + i) + 50);
		}

		Universe.draw();
	}

	Input.load(["btn-run", "div-settings", "input-seed", "myCanvas"]);

	Input["btn-run"].addEventListener("click", function () {
		Input["div-settings"].className = "hidden";
		Universe.start();
	});

	Input["input-seed"].addEventListener("keyup", function () {
		seed = Input["input-seed"].value;
		Universe.restart();
		spawnParticles();
	});

	Input["myCanvas"].addEventListener("wheel", function (e) {
		Universe.zoom += e.wheelDeltaY / 10000;
	});

	Input["myCanvas"].addEventListener("mousedown", function (e) {
		isMoving = true;
		startX = e.pageX;
		startY = e.pageY;
	});

	Input["myCanvas"].addEventListener("mousemove", function (e) {
		if (isMoving) {
			Universe.pos.x -= (startX - e.pageX) / Universe.zoom;
			Universe.pos.y -= (startY - e.pageY) / Universe.zoom;
		}

		startX = e.pageX;
		startY = e.pageY;
	});

	Input["myCanvas"].addEventListener("mouseup", function (e) {
		isMoving = false;
	});

	spawnParticles();
}());