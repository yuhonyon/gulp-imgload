var gulp = require('gulp');
var imgload = require('./index.js');
var imagemin = require('gulp-imagemin');

gulp.task('default', function() {
return gulp.src('./*.png')
  
  .pipe(imagemin())
  .pipe(imgload())
  .pipe(imagemin())
  .pipe(gulp.dest('./dist/'));
});



