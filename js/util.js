var Util = (function () {
	var self = this;


	self.degToRad = function (degrees) {
		return degrees * (Math.PI / 180);
	}

	self.radToDeg = function (radians) {
		return radians * (180 / Math.PI);
	}


	return self;
}());