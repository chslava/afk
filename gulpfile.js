'use strict';
// Plugins / Functions / Modules
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();


var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};

var autoprefixerOptions = {
    browsers: ['last 2 versions']
};

var input = './sass/**/*.scss';
var output = './public_html/styles/css';

gulp.task('serve', ['watch'], function() {

    browserSync.init({
        server: "./public_html"
    });

});

gulp.task('watch', function() {
    gulp.watch(input, ['sass'])
        .on('change', function(event) {
            browserSync.reload;
            //console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
    gulp.watch("public_html/*.html").on('change', browserSync.reload);
});

gulp.task('sass', function () {
    return gulp
        .src(input)
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(postcss([ autoprefixer() ]))
        .pipe(gulp.dest(output))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);

gulp.task('prod', function () {
    return gulp
        .src(input)
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(postcss([ autoprefixer() ]))
        .pipe(gulp.dest(output));
});