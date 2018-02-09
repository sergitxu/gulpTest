var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('copy', function() {
  gulp.src('index.html')
  .pipe(gulp.dest('assets'))
});

gulp.task('log', function() {
  gutil.log('== My Log Task ==')
});

gulp.task('default', ['build-pages', 'watch'], function() {
  return gulp.src('./dist')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});