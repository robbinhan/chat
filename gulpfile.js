var elixir = require('laravel-elixir');
var BrowserSync = require('laravel-elixir-browsersync2');
var gulp = require('gulp');
var react = require('gulp-react');

/**
 * 编译jsx文件到public目录，gulp需要使用根目录起始，elixir使用相对的assets目录起始
 * @param  {[type]} ) {	gulp.watch("resources/assets/js/jsx/*",["build-jsx"]);	gulp.task('build-jsx', function () {	    return gulp.src("resources/assets/js/jsx/*")	        .pipe(react())	        .pipe(gulp.dest('public/js/'));	});} [description]
 * @return {[type]}   [description]
 */
elixir.extend('buildJsx',function () {
	gulp.watch("resources/assets/js/jsx/*",["build-jsx"]);

	gulp.task('build-jsx', function () {
	    return gulp.src("resources/assets/js/jsx/*")
	        .pipe(react())
	        .pipe(gulp.dest('public/js/'));
	});
})

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.sass('app.scss');

    mix.scripts([
    	'/react/react.min.js',
    	'/react/JSXTransformer.js',
    	'/socket.io/socket.io.js'
    ], 'public/js/vendor.js');

    mix.buildJsx();

    BrowserSync.init();
    mix.BrowserSync({
        proxy           : "localhost:8000",
        logPrefix       : "Laravel Eixir BrowserSync",
        logConnections  : false,
        reloadOnRestart : false,
        notify          : false
    }, ['public/*/*']);
});