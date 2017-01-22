var gulp = require('gulp');
var connect = require('gulp-connect');
var replace = require('gulp-html-replace');
var includer = require('gulp-htmlincluder');
var liveraload = require('gulp-livereload');
var spritecreator = require('gulp.spritesmith');
var less = require('gulp-less');

gulp.task('sprite', function(){
	var spriteData = gulp.src('dev/img/icons/*.png')
		.pipe(spritecreator({
			imgName: 'build/img/sprite.png',
			cssName: 'dev/less/import/sprite.less',
			cssFormat: 'less',
			algorithm: 'binary-tree',
			padding: 10
		})).pipe(gulp.dest('./'));
});

gulp.task('server', function(){
	connect.server({
		root: 'build',
		livereload: true
	});
});
gulp.task('css', function(){
	gulp.src('dev/less/**/general.less')
		.pipe(less())
		.pipe(gulp.dest('build/css/'))
		.pipe(connect.reload());
});

gulp.task('html', function(){
	gulp.src('dev/**/*.html')
		.pipe(includer())
		.pipe(replace({
			css:'css/style.css'
		}))
		.pipe(gulp.dest('build/'))
		.pipe(connect.reload());
});

gulp.task('default', function(){
	gulp.start('css', 'html', 'server');

	gulp.watch(['dev/less/**/*.less'], function(){
		gulp.start('css');
	});	
	gulp.watch(['dev/**/*.html'], function(){
		gulp.start('html');
	});
});