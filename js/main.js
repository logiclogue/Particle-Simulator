// Jordan Lord 18/12/14
// resumed 05/10/15

var Main = (function (self) {
	self.c = document.getElementById("myCanvas");
	self.ctx = c.getContext("2d");
	self.pos = {
		x: 0,
		y: 0
	};


	(function () {
		self.c.width = window.innerWidth;
		self.c.height = window.innerHeight;
	}());
}({}));