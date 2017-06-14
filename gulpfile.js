var gulp=require('gulp');
var less=require('gulp-less');
var browserSync=require('browser-sync');
var gulpMinifyCss=require('gulp-minify-css');
var rename=require('gulp-rename');
var uglify=require('gulp-uglify');
var pkg=require('./package.json');
var app={
  srcPath:'src/',
  devPath:'build/',
  prdPath:'dist/'
}
//less
gulp.task('less',function  () {
	gulp.src(app.srcPath+'less/admin.less')
	.pipe(less())
	.pipe(gulp.dest(app.devPath+'css'))
  .pipe(gulpMinifyCss())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest(app.prdPath+'css'))
	.pipe(browserSync.reload({
		stream:true
	}))
})
gulp.task('html',function () {
  gulp.src(app.srcPath+'/**/*.html')
  .pipe(gulp.dest(app.devPath))
  .pipe(gulp.dest(app.prdPath))
  .pipe(browserSync.reload({
      stream: true
  }))
})


// Copy JS to dist
gulp.task('js', function() {
   gulp.src(app.srcPath+'js/**/*.js')
     .pipe(uglify())
        .pipe(gulp.dest(app.devPath+'js'))
          .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(app.prdPath+'js'))
        .pipe(browserSync.reload({
            stream: true
        }))
})


// Copy vendor libraries from /bower_components into /vendor
gulp.task('copy', function() {
    gulp.src(['bower_components/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
    .pipe(gulp.dest(app.devPath+'vendor/bootstrap'))
    .pipe(gulp.dest(app.prdPath+'vendor/bootstrap'))

    gulp.src(['bower_components/bootstrap-social/*.css', 'bower_components/bootstrap-social/*.less', 'bower_components/bootstrap-social/*.scss'])
    .pipe(gulp.dest(app.devPath+'vendor/bootstrap-social'))
        .pipe(gulp.dest(app.prdPath+'vendor/bootstrap-social'))

    gulp.src(['bower_components/datatables/media/**/*'])
    .pipe(gulp.dest(app.devPath+'vendor/datatables'))
        .pipe(gulp.dest(app.prdPath+'vendor/datatables'))

    gulp.src(['bower_components/datatables-plugins/integration/bootstrap/3/*'])
    .pipe(gulp.dest(app.devPath+'vendor/datatables-plugins'))
        .pipe(gulp.dest(app.prdPath+'vendor/datatables-plugins'))

    gulp.src(['bower_components/datatables-responsive/css/*', 'bower_components/datatables-responsive/js/*'])
    .pipe(gulp.dest(app.devPath+'vendor/datatables-responsive'))
        .pipe(gulp.dest(app.prdPath+'vendor/datatables-responsive'))

    gulp.src(['bower_components/flot/*.js'])
    .pipe(gulp.dest(app.devPath+'vendor/flot'))
        .pipe(gulp.dest(app.prdPath+'vendor/flot'))

    gulp.src(['bower_components/flot.tooltip/js/*.js'])
    .pipe(gulp.dest(app.devPath+'vendor/flot-tooltip'))
        .pipe(gulp.dest(app.prdPath+'vendor/flot-tooltip'))

    gulp.src(['bower_components/font-awesome/**/*', '!bower_components/font-awesome/*.json', '!bower_components/font-awesome/.*'])
    .pipe(gulp.dest(app.devPath+'vendor/font-awesome'))
        .pipe(gulp.dest(app.prdPath+'vendor/font-awesome'))

    gulp.src(['bower_components/jquery/dist/jquery.js', 'bower_components/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest(app.devPath+'vendor/jquery'))
        .pipe(gulp.dest(app.prdPath+'vendor/jquery'))

    gulp.src(['bower_components/metisMenu/dist/*'])
    .pipe(gulp.dest(app.devPath+'vendor/metisMenu'))
        .pipe(gulp.dest(app.prdPath+'vendor/metisMenu'))

    gulp.src(['bower_components/morrisjs/*.js', 'bower_components/morrisjs/*.css', '!bower_components/morrisjs/Gruntfile.js'])
    .pipe(gulp.dest(app.devPath+'vendor/morrisjs'))
        .pipe(gulp.dest(app.prdPath+'vendor/morrisjs'))

    gulp.src(['bower_components/raphael/raphael.js', 'bower_components/raphael/raphael.min.js'])
    .pipe(gulp.dest(app.devPath+'vendor/raphael'))
        .pipe(gulp.dest(app.prdPath+'vendor/raphael'))

})

// Run everything
gulp.task('browserSync',function(){
	browserSync.init({
		server:{
			baseDir:app.devPath
		}
	})
})
// Dev task with browserSync
gulp.task('default', ['browserSync', 'less', 'js','html'], function() {
    gulp.watch(app.srcPath+'less/*.less', ['less']);
    gulp.watch(app.srcPath+'js/*.js', ['js']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch(app.srcPath+'/**/*.html', ['html']);
});
