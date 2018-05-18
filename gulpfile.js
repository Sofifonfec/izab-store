// packages
const gulp = require('gulp'); 
const postcss = require('gulp-postcss');  
const autoprefixer = require('autoprefixer');	
const cssvars = require('postcss-simple-vars'); 
const nested = require('postcss-nested'); 
const cssImport = require('postcss-import'); 
const mixins = require('postcss-mixins');  
const hexrgba = require('postcss-hexrgba'); 
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();
const webpack = require('webpack');
const imagemin = require('gulp-imagemin');
const del = require('del');
const usemin = require('gulp-usemin');
const rev = require('gulp-rev');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');

// STYLES TASK POSTCSS SET UP

gulp.task('styles', function(){
	return gulp.src('./App/src/styles/styles.css')
		.pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer]))
		.on('error', function(errorInfo) {
			console.log(errorInfo.toString());
			this.emit('end');
		})
		.pipe(gulp.dest('./App/build/styles'));
});

// SCRIPTS TASK

gulp.task('scripts', function(callback) {
	webpack(require('./webpack.config.js'), function(err, stats) {
		if (err) {
			console.log(err.toString());
		}

		console.log(stats.toString());
		callback();
	});
});

// WATCH AND BROWSER SYNC

gulp.task('watch', function() {

	browserSync.init({
		notify: false,
		server: {
			baseDir: 'App'
		}
	});

	watch('./App/*.html', function() {
		browserSync.reload();
	});

	watch('./App/src/styles/**/*.css', function() {
		gulp.start('cssInject');
	});

	watch('./App/src/scripts/**/*.js', function() {
		gulp.start('scriptsRefresh');
	});
});

gulp.task('cssInject', ['styles'], function() {
	return gulp.src('./App/build/styles/styles.css')
		.pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', ['scripts'], function() {
	browserSync.reload();
});


// PREVIEW DIST FOLDER IN THE BROWSER
gulp.task('previewDist', function() {
	browserSync.init({
		notify: false,
		server: {
			baseDir: 'docs'
		}
	});
});	

// PREPARING FILES TO GO LIVE

gulp.task('deleteDistFolder', function() {
	return del('./docs');
});

// task to copy images to dist folder
gulp.task('optimizeImages', ['deleteDistFolder'], function() {
	return gulp.src(['./App/src/images/**/*'])
		.pipe(imagemin({
			progressive: true,
			interlaced: true,
			multipass: true
		}))
		.pipe(gulp.dest('./docs/src/images'));
});

// task to copy styles and scripts to dist folder
gulp.task('usemin', ['deleteDistFolder', 'styles', 'scripts'], function() {
	return gulp.src('./App/*.html')
		.pipe(usemin({
			css: [function() {return rev()}, function() {return cssnano()}],
			js: [function() {return rev()}, function() {return uglify()}]
		}))
		.pipe(gulp.dest('./docs'));
});

gulp.task('build', ['deleteDistFolder', 'optimizeImages', 'usemin']);