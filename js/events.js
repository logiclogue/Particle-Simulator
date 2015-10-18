var Events = (function (self) {

	self.hideElement = function (element) {
		Input[element].className = "hidden";
	}

	self.showElement = function (element) {
		Input[element].className = "";
	}

	self.init = function () {
		Input.load(["btn-run", "btn-add", "div-settings", "btn-pause", "input-seed", "input-speed", "myCanvas"]);


		Add.init();
		Scroll.init();
		Settings.init();
	};


	return self;
}({}));