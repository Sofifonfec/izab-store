const gulp = require('gulp'); 
const postcss = require('gulp-postcss');  
const autoprefixer = require('autoprefixer');	
const cssvars = require('postcss-simple-vars'); 
const nested = require('postcss-nested'); 
const cssImport = require('postcss-import'); 
const mixins = require('postcss-mixins');  
const hexrgba = require('postcss-hexrgba'); 
const modernizr = require('gulp-modernizr');
const webpack = require('webpack');
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();

// STYLES TASK POSTCSS SET UP

gulp.task('styles', function(){
	return gulp.src('src/styles/styles.css')
		.pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer]))
		.on('error', function(errorInfo) {
			console.log(errorInfo.toString());
			this.emit('end');
		})
		.pipe(gulp.dest('build/styles'));
});

// MODERNIZR TASK

gulp.task('modernizr', function() {
	return gulp.src(['./src/styles/**/*.css', './src/scripts/**/*.js'])
		.pipe(modernizr({
			"options": [
				"setClasses"
			]
		}))
		.pipe(gulp.dest('./build/scripts/'));
});

// SCRIPTS TASK USING WEBPACK ! HAVE TO CREATE NEW FILE IN ROOT

gulp.task('scripts', ['modernizr'], function(callback) {
	webpack(require('./webpack.config.js'), function(err, stats) {
		if(err) {
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
			baseDir: 'src'
		}
	});

	watch('./build/index.html', function() {
		browserSync.reload();
	});

	watch('./src/styles/**/*.css', function() {
		gulp.start('cssInject');
	});

	watch('./src/scripts/**/*.js', function() {
		gulp.start('scriptsRefresh');
	});
});

gulp.task('cssInject', ['styles'] function() {
	return gulp.src('./buil/styles/styles.css')
		.pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', ['scripts'], function() {
	browserSync.reload();
});