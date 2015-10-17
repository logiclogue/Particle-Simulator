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