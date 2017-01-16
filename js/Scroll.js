var Scroll = (function (self)
{
	var startX = 0,
		startY = 0,
		startD = 0,
		isMoving = false;


	// mouse controls
	function zoom(e) {
		Universe.zoom += e.deltaY / -100;
	}

	function mousedown(e) {
		isMoving = true;
		startX = e.pageX;
		startY = e.pageY;
	}

	function mousemove(e) {
		if (isMoving) {
			Universe.pos.x -= (startX - e.pageX) / Math.pow(2, Universe.zoom);
			Universe.pos.y -= (startY - e.pageY) / Math.pow(2, Universe.zoom);
		}

		startX = e.pageX;
		startY = e.pageY;
	}

	function mouseup(e) {
		isMoving = false;
	}

	// touch controls
	function touchstart(e) {
		e.preventDefault();

		if (e.touches.length === 1) {
			isMoving = true;
			startX = e.touches[0].pageX;
			startY = e.touches[0].pageY;
		}
		else {
			startD = Util.distance(e.touches[0].pageX, e.touches[1].pageX, e.touches[0].pageY, e.touches[1].pageY);
		}
	}

	function touchmove(e) {
		e.preventDefault();

		if (e.touches.length === 1) {
			Universe.pos.x -= (startX - e.touches[0].pageX) / Math.pow(2, Universe.zoom);
			Universe.pos.y -= (startY - e.touches[0].pageY) / Math.pow(2, Universe.zoom);

			startX = e.touches[0].pageX;
			startY = e.touches[0].pageY;
		}
		else {
			var distance = Util.distance(e.touches[0].pageX, e.touches[1].pageX, e.touches[0].pageY, e.touches[1].pageY);

			startD -= distance;
			Universe.zoom -= startD / 1000;
			startD = distance;
		}
	}


	self.init = function () {
		Input['myCanvas'].addEventListener('wheel', zoom);
		Input['myCanvas'].addEventListener('mousedown', mousedown);
		Input['myCanvas'].addEventListener('mousemove', mousemove);
		Input['myCanvas'].addEventListener('mouseup', mouseup);
		Input['myCanvas'].addEventListener('touchstart', touchstart);
		Input['myCanvas'].addEventListener('touchmove', touchmove);
	};

	self.stop = function () {
		Input['myCanvas'].removeEventListener('wheel', zoom);
		Input['myCanvas'].removeEventListener('mousedown', mousedown);
		Input['myCanvas'].removeEventListener('mousemove', mousemove);
		Input['myCanvas'].removeEventListener('mouseup', mouseup);
		Input['myCanvas'].removeEventListener('touchstart', touchstart);
		Input['myCanvas'].removeEventListener('touchmove', touchmove);
	};


	return self;
}({}));
