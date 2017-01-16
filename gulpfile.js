let gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-cssmin'),
    autoprefixer = require('gulp-autoprefixer'),
    gls = require('gulp-live-server'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify');

gulp.task('serve', () => {
  let server = gls.static('dist', 8080);
  server.start();
  gulp.watch(['dist/css/*.css', 'dist/*.html' ], function (file) {
    server.notify.apply(server, [file]);
  });
});

gulp.task('sass', () => {
  setTimeout(function(){
  gulp.src('./src/assets/sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist/css'));
  }, 400);
});

gulp.task('mincss', () => {
  gulp.src('dist/css/style.css')
  .pipe(cssmin())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('dist/css/'))
});

gulp.task('js', () => {
    gulp.src('./src/assets/js/*.js')
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('compressjs', () => {
    gulp.src('./dist/js/script.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('watcher', () => {
  gulp.watch('./src/assets/sass/**/*.scss', ['sass']);
  gulp.watch('./dist/css/style.css',['mincss']);
  gulp.watch('./src/assets/js/*.js', ['js']);
  gulp.watch('./dist/js/script.js', ['compressjs']);
});

gulp.task('default', ['serve','watcher']);
