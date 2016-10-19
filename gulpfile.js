var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('source/css'));
});

gulp.task('js', function() {
  return gulp.src(['bower_components/jquery/dist/jquery.js',
                    'bower_components/what-input/what-input.js',
                    'bower_components/foundation-sites/dist/foundation.js',
                    'js/app.js'])
            .pipe($.concat('app.js'))
            .pipe($.uglify())
            .pipe(gulp.dest('source/js/'));
});

gulp.task('watch', ['sass', 'js'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
  gulp.watch(['js/**/*.js'], ['js']);
});

gulp.task('default', ['watch']);
