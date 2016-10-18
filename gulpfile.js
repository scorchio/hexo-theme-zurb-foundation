var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    sass        = require('gulp-sass'),
    bower       = require('gulp-bower'),
    notify      = require('gulp-notify'),
    reload      = browserSync.reload,
    bs          = require("browser-sync").create(),
    Hexo        = require('hexo'),
    hexo        = new Hexo(process.cwd(), {}),
    clean = require('gulp-clean');

var $ = require('gulp-load-plugins')();

var src = {
    scss: './scss/',
    css:  './source/css',
    ejs: 'layout'
},
watchFiles = [
    './scss/*.scss',
    '*/*.ejs'
];


// Static Server + watching scss/html files
gulp.task('serve', ['sass:watch'], function() {

    hexo.init().then(function(){
      return hexo.call('generate', {watch: true});
    }).catch(function(err){
      console.log(err);
    });

    // init starts the server
    bs.init(watchFiles, {
        server: {
            baseDir: "../../public"
        },
        logLevel: "debug"
    });

    hexo.init().then(function(){
      return hexo.call('generate', {watch: true});
    }).catch(function(err){
      console.log(err);
    });

});

// Compile sass into CSS
gulp.task('sass', function() {
    // gulp.src(src.scss + "/*/*.scss")
    gulp.src(src.scss + "{,*}/*.scss")
        .pipe(sass({}))
        .pipe(gulp.dest('source/css/'))
        .pipe(reload({stream: true}));
});

gulp.task('js', function() {
  return gulp.src(['bower_components/foundation/js/vendor/jquery.js',
                    'bower_components/foundation/js/vendor/modernizr.js',
                    'bower_components/foundation/js/vendor/fastclick.js',
                    'bower_components/foundation/js/vendor/jqery.cookie.js',
                    'bower_components/foundation/js/vendor/placeholder.js',
                    'bower_components/foundation/js/foundation.min.js',
                    'source/fancybox/jquery.fancybox.pack.js'])
            .pipe($.concat('theme.js'))
            .pipe($.uglify())
            .pipe(gulp.dest('source/js/'))
            .pipe(reload({stream: true}));
});

gulp.task('sass:watch', function () {
  gulp.watch('./scss/**/*.scss', ['sass']);
});


gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('source/lib'))
});

gulp.task('default', ['serve']);
