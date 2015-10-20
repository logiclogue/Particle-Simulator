var gulp = require('gulp');

var concat = require('gulp-concat');

gulp.task('default', function () {
	return gulp.src(['./js/*.js', './js/init.js'])
		.pipe(concat('all.js'))
		.pipe(gulp.dest('./'));
});