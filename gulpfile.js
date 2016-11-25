var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    debug = require('gulp-debug'),
    clean = require('gulp-clean'),
    livereload = require('gulp-livereload'),
    responsive = require('gulp-responsive');

var sassPaths = [
    'bower_components/foundation-sites/scss',
    'bower_components/motion-ui/src'
];

gulp.task('foundation-icons', function () {
    return gulp.src(['assets/**/**'])
        .pipe(gulp.dest('source/'));
});

gulp.task('photoswipe', function () {
    return gulp.src(['bower_components/photoswipe/dist/**'])
        .pipe(gulp.dest('source/photoswipe'))
});

gulp.task('sass', function () {
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

gulp.task('jsPublic', ['js'], function () {
    return gulp.src('source/js/app.js').pipe(gulp.dest('../../public/js')).pipe(livereload());
});
gulp.task('sassPublic', ['sass'], function () {
    return gulp.src('source/css/app.css').pipe(gulp.dest('../../public/css')).pipe(livereload());
});

gulp.task('js', function () {
    return gulp.src(['bower_components/jquery/dist/jquery.js',
        'bower_components/what-input/what-input.js',
        'bower_components/foundation-sites/dist/foundation.js',
        'bower_components/algoliasearch/dist/algoliasearch.jquery.js',
        'bower_components/algolia-autocomplete.js/dist/autocomplete.jquery.js',
        'bower_components/photoswipe/dist/photoswipe.js',
        'bower_components/photoswipe/dist/photoswipe-ui-default.js',
        'js/app.js'])
        .pipe($.concat('app.js'))
        .pipe($.uglify())
        .pipe(gulp.dest('source/js/'));
});

gulp.task('watch', ['foundation-icons', 'photoswipe', 'sassPublic', 'jsPublic'], function () {
    livereload.listen();
    gulp.watch(['scss/**/*.scss'], ['sassPublic']);
    gulp.watch(['js/**/*.js'], ['jsPublic']);
});

gulp.task('cleanResponsiveImages', function () {
    return gulp.src('../../source/_posts/**/*-responsive-*-*.{png,jpg,gif}')
        .pipe(debug({title: 'clean:'}))
        .pipe(clean({force: true}));
});

gulp.task('responsiveImages', ['cleanResponsiveImages'], function () {
    return gulp.src('../../source/_posts/**/*.{png,jpg,gif}')
        .pipe(responsive({
            '**/*.*': [
                {
                    width: 800,
                    rename: {
                        suffix: "-responsive-normal-800"
                    }
                },
                {
                    width: 256,
                    rename: {
                        suffix: "-responsive-mini-256"
                    }
                }
            ]
        }, {
            errorOnEnlargement: false,
            skipOnEnlargement: true
        }))
        .pipe(gulp.dest('../../source/_posts/'));
});

gulp.task('default', ['watch']);
