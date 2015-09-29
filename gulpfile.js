var elixir = require('laravel-elixir'),
    BrowserSync = require('laravel-elixir-browsersync2'),
    gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream');

/**
 * 编译jsx文件到public目录，gulp需要使用根目录起始，elixir使用相对的assets目录起始
 * @param  {[type]} ) {	gulp.watch("resources/assets/js/jsx/*",["build-jsx"]);	gulp.task('build-jsx', function () {	    return gulp.src("resources/assets/js/jsx/*")	        .pipe(react())	        .pipe(gulp.dest('public/js/'));	});} [description]
 * @return {[type]}   [description]
 */
elixir.extend('buildJsx',function () {
	gulp.watch("resources/assets/js/jsx/*",["build-jsx"]);

	gulp.task('build-jsx', function () {
    browserify({
      entries: ['im.js'],
      basedir: 'resources/assets/js/jsx/'
    })
    .transform('babelify')
    .bundle()
    .pipe(source('app.js'))
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

  mix.buildJsx();

  BrowserSync.init();
  mix.BrowserSync({
    proxy           : "0.0.0.0:8000",
    logPrefix       : "Laravel Eixir BrowserSync"
  }, ['public/*/*']);
});