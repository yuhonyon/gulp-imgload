var gulp = require('gulp');
var imgload = require('./index.js');

gulp.task('default', function () {
  return gulp.src('./*.jpg')
  .pipe(imgload())
  .pipe(gulp.dest('./demo/'));
});
