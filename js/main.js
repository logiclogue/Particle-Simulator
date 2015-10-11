// Jordan Lord 18/12/14
// resumed 05/10/15

var Main = (function (self) {
	self.c = document.getElementById("myCanvas");
	self.ctx = self.c.getContext("2d");


	(function () {
		self.c.width = window.innerWidth;
		self.c.height = window.innerHeight;
	}());


	return self;
}({}));