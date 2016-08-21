/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    sassRuby = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass');;

// define the default task and add the watch task to it
gulp.task('default', ['watch-sassRuby','sassRuby']);

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src('source/javascript/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('copyHtml', function() {
  // copy any html files in source/ to public/
  gulp.src('source/*.html').pipe(gulp.dest('public'));
});

gulp.task('sass', function () {
  return gulp.src('source/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/assets/stylesheets/'));
});

gulp.task('sassRuby', function () {
	console.log("watching Rubby sass");
    return sass('source/scss/style.scss', {
      sourcemap: true,
      style: 'expanded'
    })
    .on('error', function (err) {
        console.error('Error!', err.message);
    })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets/stylesheets/'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('source/javascript/**/*.js', ['jshint']);
});

gulp.task('watch-sassRuby', function() {
  gulp.watch(['source/scss/**/*.scss'], ['sassRuby']);
});
