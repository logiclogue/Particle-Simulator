var Util = (function ()
{
	var self = this;


	self.degToRad = function (degrees) {
		return degrees * (Math.PI / 180);
	}

	self.radToDeg = function (radians) {
		return radians * (180 / Math.PI);
	}

	self.distance = function (x_0, x_1, y_0, y_1) {
		return Math.sqrt(Math.pow(x_0 - x_1, 2) + Math.pow(y_0 - y_1, 2));
	}

	self.posToCoord = function (pageX, pageY) {
		return {
			x: (pageX - Canvas.width / 2) / Math.pow(2, Universe.zoom) - Universe.pos.x,
			y: (pageY - Canvas.height / 2) / Math.pow(2, Universe.zoom) - Universe.pos.y
		};
	}


	return self;
}());