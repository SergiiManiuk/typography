var gulp = require ('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-minify-css'),
    browserSync = require('browser-sync');
    reload = browserSync.reload;
var pathes = {
    build: {
        css: './dist/css'
    }
};

gulp.task('htmlReload', function () {
  return gulp.src('*.html')
    .pipe(reload({stream: true}));
});

gulp.task('browser-sync', function() {
  browserSync.init({
      server: './'
      //tunnel: "test"
  })
});

gulp.task('less', function () {
  return gulp.src('./src/stylesheets/main.less')
    .pipe(plumber(function () {
        console.log('===========');
        console.log('ERROR LESS');
        console.log('===========');
        this.emit('end');
    }))
     .pipe(less({
       paths: [ path.join(__dirname, 'less', 'includes') ]
     }))
    .pipe(concat('style.css'))
    //.pipe(cssmin())
    .pipe(autoprefixer({ browsers: ["> 0%"] }))
    .pipe(gulp.dest(pathes.build.css))
    .pipe(reload({stream: true}));
});

gulp.task('watch', ['less', 'browser-sync'],  function() {
  gulp.watch('./src/stylesheets/**/*.less', ['less']);
  gulp.watch('*.html', ['htmlReload']);
});

gulp.task('default', ['watch', 'browser-sync', 'less', 'htmlReload']);
