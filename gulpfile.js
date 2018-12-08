/*

Gulp runs in a folder structure like this:

- app/              (all files for development)
  - index.html
  - css/
  - fonts
  - img/
  - js/
  - scss/
- dist/             (files ready for distribution)
- gulpfile.js
- node_modules/
- package.json
- .gitignore

*/

// Require dependencies from node_modules
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const del = require('del');
const runSequence = require('run-sequence');

// Task to compile sass to css
gulp.task('sass', function(){
  // Check all scss files in directory using globe pattern
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    // Inyect css changes after processing scss file/s
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Task to watch for changes in scss, js and html files after browserSync has finished executing
gulp.task('watch', ['browserSync'], function() {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/js/**/*.js', browserSync.reload);
  gulp.watch('app/*.html', browserSync.reload);
})

// Task to start server for browserSync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

// Concat js files (marked in html by <!--build:js js/main.min.js--><!--endbuild-->) and minifies it
gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    // Check if file is js and minify
    .pipe(gulpIf('*.js', uglify()))
    // Check if it is a css file and minify
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

// Minify images
gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|gif|svg')
  // Cache minified images
  .pipe(cache(imagemin({
    // Set interlaced for gifs
    interlaced: true
  })))
  .pipe(gulp.dest('dist/img'))
});

// Move fonts from app to dist
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

// Delete unused files in /dist
gulp.task('clea:dist', function() {
  return del.sync('dist');
});

// Delete cache images
gulp.task('cache:clear', function(callback) {
  return cache.clearAll(callback);
});

// Build the dist files
gulp.task('build', function(callback) {
  runSequence('clean:dist',
  ['sass', ' useref', 'images', 'fonts'],
  callback
  )
});

// Preprocess js, css and watch over dev files
gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync', 'watch'],
  callback
  )
});