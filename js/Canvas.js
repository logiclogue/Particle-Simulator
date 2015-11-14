var Canvas = (function (self)
{
	self.c = document.getElementById('myCanvas');
	self.ctx = self.c.getContext('2d');
	self.c.width = window.innerWidth;
	self.c.height = window.innerHeight;
	self.width = self.c.width;
	self.height = self.c.height;


	return self;
}({}));