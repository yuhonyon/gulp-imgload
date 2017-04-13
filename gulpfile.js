var gulp = require('gulp');
var imgload = require('./index.js');


gulp.task('default', function() {
return gulp.src('./test/*.png')
  .pipe(imgload())
  .pipe(gulp.dest('./test/dist/'));
});



