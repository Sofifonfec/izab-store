var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename');

var config = {
	mode: {
		css: {
			render: {
				css: {
					template: './gulp/templates/sprite.css'
				}
			}
		}
	}
}

gulp.task('createSprite', function() {
	return gulp.src('./App/src/images/icons/**/*.svg')
		.pipe(svgSprite(config))
		.pipe(gulp.dest('./App/build/sprite/'));
});

gulp.task('copySpriteCSS', ['createSprite'], function() {
	return gulp.src('./App/build/sprite/css/*.css')
		.pipe(rename('_sprite.css'))
		.pipe(gulp.dest('./App/src/styles/modules'));
});

gulp.task('icons', ['createSprite', 'copySpriteCSS']);