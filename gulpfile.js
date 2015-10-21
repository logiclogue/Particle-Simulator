var gulp = require('gulp');

var concat = require('gulp-concat');
var minify = require('gulp-minify');


gulp.task('default', function () {
	return gulp.src(['./js/*.js', './js/init.js'])
		.pipe(concat('all.js'))
		.pipe(gulp.dest('./'));
});

gulp.task('minify', function () {
	return gulp.src('./all.js')
		.pipe(minify())
		.pipe(gulp.dest('./'));
});