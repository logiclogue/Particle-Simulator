var Input = (function (self) {
	
	function getElement(el_id) {
		self[el_id] = document.getElementById(el_id);
	}


	self.hideElement = function (element) {
		Input[element].className = "hidden";
	};

	self.showElement = function (element) {
		Input[element].className = "";
	};

	self.load = function (arrayElements) {
		for (var i = 0, max = arrayElements.length; i < max; i += 1) {
			getElement(arrayElements[i]);
		}
	};

	self.init = function () {
		self.load(["btn-run", "btn-add", "div-settings", "btn-pause", "input-seed", "input-speed", "myCanvas"]);

		Scroll.init();
		Settings.init();
	};


	return self;
}({}));