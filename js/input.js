var Input = (function (self) {
	
	function getElement(el_id) {
		self[el_id] = document.getElementById(el_id);
	}

	self.load = function (arrayElements) {
		for (var i = 0, max = arrayElements.length; i < max; i += 1) {
			getElement(arrayElements[i]);
		}
	}

	return self;
}({}));