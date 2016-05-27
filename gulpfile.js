var gulp = require('gulp'),
    browserify = require('browserify'),
    concat = require('gulp-concat'),
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify'),
    compass = require('gulp-compass'),
    jshint = require('gulp-jshint'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'); //Keeps watch going even if you make a syntax error
var lib = require('bower-files')({
  "overrides":{
    "bootstrap" : {
      "main": [
        "less/bootstrap.less",
        "dist/css/bootstrap.css",
        "dist/js/bootstrap.js"
      ]
    }
  }
});

gulp.task('jsBrowserify', ['concatInterface'] , function() {
  return browserify({ entries: ['./tmp/allConcat.js'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('concatInterface', function() {
  return gulp.src(['./js/*-interface.js'])
    .pipe(concat('allConcat.js'))
    .pipe(gulp.dest('./tmp'));
});

gulp.task('scripts', function(){
  gulp.src('js/**/*.js') //Grabs all js files, uglifies it, and pipes to destination
  .pipe(uglify())
  .pipe(gulp.dest('app/js'));
});

gulp.task('jshint', function(){
  return gulp.src(['js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('cssBuild', function() {
  return gulp.src('scss/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });
  gulp.start('watch');
});

gulp.task('bowerJS', function () {
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('bowerCSS', function () {
  return gulp.src(lib.ext('css').files)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('bower', ['bowerJS', 'bowerCSS']);

gulp.task('build', ['jsBuild', 'bowerBuild', "cssBuild"], function(){

});

gulp.task('jsBuild', ['jsBrowserify', 'jshint'], function(){
  browserSync.reload();
});

gulp.task('bowerBuild', ['bower'], function(){
  browserSync.reload();
});

gulp.task('htmlBuild', function(){
  browserSync.reload();
});

gulp.task('styleBuild', function(){
  browserSync.reload();
});

//////// WATCH TASKS //////////
gulp.task('watch', function(){
  gulp.watch(['js/*.js'], ['jsBuild']);
  gulp.watch(['bower.json'], ['bowerBuild']);
  gulp.watch(["scss/*.scss"], ['cssBuild']);
  gulp.watch(["css/*.css"], ['styleBuild']);
  gulp.watch(["*.html"], ['htmlBuild']);
});

//////// DEFAULT TASKS //////////
gulp.task('default', ['build'], function(){
  gulp.start('serve');
});
