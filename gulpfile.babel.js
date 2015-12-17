'use strict';

let gulp = require('gulp');
let del = require('del');
let browserSync = require('browser-sync');
let reload = browserSync.reload;
let stylus = require('gulp-stylus');
let autoprefixer = require('gulp-autoprefixer');
let concat = require('gulp-concat');
let cssmin = require('gulp-cssmin');
let run = require('run-sequence');

gulp.task('serve', ['style'], () => {
	browserSync({
		port: 5000,
		notify: true,
		logPrefix: 'PSK',
		server: {
			baseDir: ['src'],
			routes: {
				'/bower_components': 'bower_components'
			}
		}
	});

	gulp.watch(['src/**/*.html'], reload);
	gulp.watch(['src/**/*.js'], reload);
	gulp.watch(['src/**/*.css'], ['style'], reload);
});

gulp.task('style', () => {
	gulp.src(['src/**/*.styl'])
		.pipe(stylus())
		.pipe(autoprefixer())
		.pipe(concat('style.css'))
		.pipe(cssmin())
		.pipe(gulp.dest('src/'));
});

gulp.task('build', (callback) => {
	return run(
		'clean',
		'style',
		'copy'
	);
});

gulp.task('clean', (callback) => {
	del(['dist'], callback);
});

gulp.task('copy', () => {
	gulp.src(['src/*.html', 'src/*.css', 'src/*.js'], {
			base: 'src'
		})
		.pipe(gulp.dest('dist'));
	gulp.src(['lib/*.js'])
		.pipe(gulp.dest('dist'));
});

gulp.task('default', ['build'], () => {
});
