var argv = require('yargs').argv;
var gulp = require('gulp');
var rename = require('gulp-rename');
var replace = require('gulp-replace');

var stripComments = function (vinylObj) {
  console.log('[' + new Date().toLocaleTimeString() + '] ' + vinylObj.path + ' parsed.')
  return gulp.src(vinylObj.path)
    .pipe(replace(/([^:])\/\/.*/g, '$1'))
    .pipe(rename('composer.json'))
    .pipe(gulp.dest('.'));
}

gulp.task('watch', function () {
  if (argv.f) {
    stripComments({path: argv.f});
  } else {
    gulp.watch('composer.*.json', {events: ['change']}, stripComments);
  }
});

gulp.task('default',['watch']);
