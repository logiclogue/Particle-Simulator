var Settings = (function (self) {

	function runButton() {
		Input.hideElement("div-settings");
		Input.showElement("btn-pause");
		AnimLoop.setSpeed(Input["input-speed"].value);
		Universe.start();
	}

	function pauseButton() {
		Input.hideElement("btn-pause");
		Input.showElement("div-settings");
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
		Input["btn-add"].addEventListener("click", Add.init);
		Input["input-seed"].addEventListener("keyup", seedChange);
	};

	return self;
}({}));