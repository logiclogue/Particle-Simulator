var Events = (function (self) {

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


		Add.init();
		Scroll.init();
	};


	return self;
}({}));