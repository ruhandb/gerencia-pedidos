var gulp         = require('gulp');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
//var uglify = require('gulp-uglify-es').default;

gulp.task('concat', function() {
    gulp.src(
        [
            './js/vendor/*.js', 
            './js/plugin/*.js', 
            './js/components/*.js',
            './js/service/*.js'
        ])
    .pipe(concat('script.js'))
    //.pipe(stripDebug())
    //.pipe(uglify())
    .pipe(gulp.dest('./js/'));

    gulp.src(
        [
            './style/*.css'
        ])
    .pipe(concat('style.css'))
    //.pipe(stripDebug())
    //.pipe(uglify())
    .pipe(gulp.dest('./css/'));
});