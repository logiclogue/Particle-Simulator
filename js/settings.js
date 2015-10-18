var Settings = (function (self) {

	function runButton() {
		Events.hideElement("div-settings");
		Events.showElement("btn-pause");
		AnimLoop.setSpeed(Input["input-speed"].value);
		Universe.start();
	}

	function pauseButton() {
		Events.hideElement("btn-pause");
		Events.showElement("div-settings");
		Universe.pause();
	}

	function seedChange() {
		Spawn.seed = Input["input-seed"].value;
		Universe.restart();
		Spawn.particles();
	}


	self.init = function () {
		Input["btn-run"].addEventListener("click", runButton);
		Input["btn-pause"].addEventListener("click", pauseButton);
		Input["input-seed"].addEventListener("keyup", seedChange);
	};

	return self;
}({}));