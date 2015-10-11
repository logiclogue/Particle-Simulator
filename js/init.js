(function () {
	var seed = "test_seed";

	function spawnParticles() {
		// spawn particles
		for (var i = 0; i < 100; i += 1) {
			var theParticle = new Particle(Main.c.width * Md5.rand(seed + i + "x"), Main.c.height * Md5.rand(seed + i + "y"));

			theParticle.newMass(1 * Md5.rand(seed + "_" + i) + 50);
		}

		Universe.draw();
		console.log("here");
	}

	document.getElementById("btn-run").addEventListener("click", function () {
		document.getElementById("div-settings").className = "hidden";
		Universe.start();
	});

	document.getElementById("input-seed").addEventListener("keyup", function () {
		seed = document.getElementById("input-seed").value;
		Universe.restart();
		spawnParticles();
	});

	spawnParticles();
}());