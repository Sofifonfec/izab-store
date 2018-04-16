const gulp = require('gulp'); 
const postcss = require('gulp-postcss');  
const autoprefixer = require('autoprefixer');	
const cssvars = require('postcss-simple-vars'); 
const nested = require('postcss-nested'); 
const cssImport = require('postcss-import'); 
const mixins = require('postcss-mixins');  
const hexrgba = require('postcss-hexrgba'); 
const modernizr = require('gulp-modernizr');
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();

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

// MODERNIZR TASK

gulp.task('modernizr', function() {
	return gulp.src(['./App/src/scripts/**/*.js'])
		.pipe(modernizr({
			"options": [
				"setClasses"
			]
		}))
		.pipe(gulp.dest('./App/build/scripts/'));
});

// SCRIPTS TASK USING WEBPACK ! HAVE TO CREATE NEW FILE IN ROOT

gulp.task('scripts', ['modernizr'], function() {
	return gulp.src('./App/src/scripts/*.js')
		.pipe(gulp.dest('./App/build/scripts'));
});

// WATCH AND BROWSER SYNC

gulp.task('watch', function() {

	browserSync.init({
		notify: false,
		server: {
			baseDir: 'App'
		}
	});

	watch('./App/index.html', function() {
		browserSync.reload();
	});

	watch('./App/src/styles/styles.css', function() {
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