/*

Gulp runs in a folder structure like this:

- app/              (all files for development)
  - index.html
  - css/
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

// Task to watch for changes in sass, js and html files after browserSync has finished executing
gulp.task('watch', ['browserSync'], function() {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
})

// Task to start server for browserSync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

// gulp.task('default', defaultTask);

// gulp.task('browser-sync', function() {
//   browserSync.init({
//     server: {
//       baseDir: "./"
//     }
//   });
// });

// gulp.task('serve', ['sass'], function() {
//   browserSync.init({
//     server:"./"
//   });

//   gulp.watch("./sass/*.scss", ['sass']);
//   gulp.watch("*.html").on('change', browserSync.reload);
// });

// gulp.task('sass', function() {
//   return gulp.src("./sass/*.scss")
//     .pipe(sass())
//     .pipe(gulp.dest("./css"))
//     .pipe(browserSync.stream());
// });

// function defaultTask(done) {
//   // place code for your default task here
//   done();
// }

// gulp.task('default', ['serve']);
