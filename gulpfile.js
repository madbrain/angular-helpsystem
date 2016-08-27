'use strict';

var gulp = require('gulp');
var jspm = require('gulp-jspm');
var rename = require('gulp-rename');
var useref = require('gulp-useref');
var clean = require('gulp-clean');
var replace = require('gulp-replace');
var ghPages = require('gulp-gh-pages');

gulp.task('clean', function() {
    return gulp.src('dist', {read: false})
	    .pipe(clean());
});

gulp.task('buildjs', function() {
    return gulp.src('./src/app/index.module.ts')
        .pipe(jspm({
            selfExecutingBundle: true,
            minify: true,
            skipSourceMaps: true
        }))
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('html', [ 'buildjs' ], function() {
    return gulp.src('./src/index.html')
        .pipe(useref())
        .pipe(replace('<html>', '<html ng-app="app">'))
        .pipe(replace('<script src="jspm_packages/system.js"></script>', ''))
        .pipe(replace('<script src="config.js"></script>', ''))
        .pipe(replace('<script src="boot.js"></script>', '<script src="app.min.js"></script>'))
        .pipe(gulp.dest('dist'));
});

gulp.task('css', function() {
    return gulp.src(['./src/**/*.css'])
        .pipe(gulp.dest('dist'));
});

gulp.task('views', function() {
    return gulp.src(['./src/views/**/*.html'])
        .pipe(gulp.dest('dist/views'));
});

gulp.task('fonts', function() {
    return gulp.src('./bower_components/bootstrap/fonts/*.*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('dist', [ 'html', 'css', 'views', 'fonts' ]);
 
gulp.task('deploy', [ 'dist' ], function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});