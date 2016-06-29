/**
 * Convertigo Ionic 2 GULP builds
 * 
 * Customizes standard Ionic build by building in the DisplayObject/mobile folder.
 */
var gulp = require('gulp'),
    gulpWatch = require('gulp-watch'),
    del = require('del'),
    runSequence = require('run-sequence'),
    fs = require('fs-extra'),
    livereload = require('gulp-livereload'),
    argv = process.argv;


/**
 * Ionic hooks
 * Add ':before' or ':after' to any Ionic project command name to run the specified
 * tasks before or after the command.
 */
gulp.task('serve:before', ['watch']);
gulp.task('emulate:before', ['build']);
gulp.task('deploy:before', ['build']);
gulp.task('build:before', ['build']);

// we want to 'watch' when livereloading
var shouldWatch = argv.indexOf('-l') > -1 || argv.indexOf('--livereload') > -1;
gulp.task('run:before', [shouldWatch ? 'watch' : 'build']);

/**
 * Ionic Gulp tasks, for more information on each see
 * https://github.com/driftyco/ionic-gulp-tasks
 *
 * Using these will allow you to stay up to date if the default Ionic 2 build
 * changes, but you are of course welcome (and encouraged) to customize your
 * build however you see fit.
 */
var buildBrowserify = require('ionic-gulp-browserify-typescript');
var buildSass = require('ionic-gulp-sass-build');
var copyHTML = require('ionic-gulp-html-copy');
var copyFonts = require('ionic-gulp-fonts-copy');
var copyScripts = require('ionic-gulp-scripts-copy');

var isRelease = argv.indexOf('--release') > -1;
var outputPath = "../DisplayObjects/mobile/build";

gulp.task('watch', ['clean'], function(done){
  runSequence(
    ['sass', 'html', 'fonts', 'scripts'],
    function(){
      livereload.listen();
      gulpWatch('app/**/*.scss', function(){
    	  gulp.start('sass');
    	  livereload.reload();
      });
      gulpWatch('app/**/*.html', function(){
    	  gulp.start('html'); 
    	  livereload.reload();
      });
      buildBrowserify({
    	  outputPath: outputPath + '/js/',
    	  onLog: function(data) {
    		  console.log("browserify done :" +  data);
    		  livereload.reload();
    	  },
    	  watch: true
      })
      .on('end', done);
    }
  );
});

gulp.task('build', ['clean'], function(done){
  runSequence(
    ['sass', 'html', 'fonts', 'scripts'],
    function(){
      buildBrowserify({
     	outputPath: outputPath + '/js/',
        minify: isRelease,
        browserifyOptions: {
          debug: !isRelease
        },
        uglifyOptions: {
          mangle: false
        }
      }).on('end', function() {
   	      done();
      });
    }
  );
});

gulp.task('sass', function() {
	var options = {
		dest: outputPath + '/css'
	};
	buildSass(options);
});

gulp.task('html',  function() {
	var options = {
		dest: outputPath
	}; 
	copyHTML(options);
});

gulp.task('fonts', function() {
	var options = {
		dest: outputPath + '/fonts'
	}; 
	copyFonts(options);
});


gulp.task('scripts', function() {
	var options = {
		dest: outputPath + '/js'
	}; 
	copyScripts(options);
}); 


gulp.task('clean', function(){
  return del(outputPath , {
	  force: true
  });
});
