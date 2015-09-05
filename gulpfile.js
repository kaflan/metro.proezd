var gulp = require('gulp');
var notify = require("gulp-notify");
var rename = require("gulp-rename");
var ngAnnotate = require('gulp-ng-annotate');
var gulpif = require('gulp-if');
var wiredep = require('wiredep').stream;
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');

gulp.task('js', function() {
  gulp.src('js/*.js')
    .pipe(sourcemaps.init())
    .pipe(ngAnnotate())
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('js/'))
    .pipe(notify('Done!'));
});
gulp.task('bower', function() {
  gulp.src('index.html')
    .pipe(wiredep({
      directory: 'bower_components'
    }))
    .pipe(gulp.dest('./'))
    .pipe(notify('Done!'));
});
gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});
gulp.task('default', ['connect', 'bower', 'js']);
