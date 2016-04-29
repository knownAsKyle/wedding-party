"use strict";
/*
npm install gulp gulp-file gulp-concat gulp-minify-css gulp-uglify gulp-babel gulp-htmlmin --save-dev
*/
var gulp = require('gulp');
var file = require('gulp-file');
var concat = require('gulp-concat');
var cssMin = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var htmlmin = require('gulp-htmlmin');

var opts = {};
opts.jsGroup = {
    all: ['scripts/swipe.js', 'scripts/partyInfo.js', 'scripts/script.js']
};
opts.cssGroup = {
    all: ['styles/normalize.css', 'styles/swipe.css', 'styles/style.css']
};
/*tasks*/
gulp.task('minCss', minCss);
gulp.task('minJs', minJs);
gulp.task('minHtml', minHtml);
gulp.task('watch', watch);
/*Gulp processes*/
function watch() {
    gulp.watch(opts.jsGroup.all, ['minJs']);
    gulp.watch(opts.cssGroup.all, ['minCss']);
    gulp.watch('index.html', ['minHtml']);
    console.log('watching...waiting...');
}

function minHtml() {
    return gulp.src('index.html')
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            removeRedundantAttributes: true,
        }))
        .pipe(gulp.dest('dist'));
}

function minJs() {
    return gulp.src(opts.jsGroup.all)
        .pipe(babel())
        .pipe(concat('script.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(concat('script.min.js'))
        .pipe(uglify({
            preserveComments: "some"
        }))
        .pipe(gulp.dest('./dist'))
}

function minCss() {
    return gulp.src(opts.cssGroup.all)
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./dist'))
        .pipe(concat('style.min.css'))
        .pipe(cssMin())
        .pipe(gulp.dest('./dist'))
}