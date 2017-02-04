/**
 * Created by admin on 1/30/2017.
 */
var gulp= require('gulp'),
    uglify=require('gulp-uglify'),
    jshint=require('gulp-jshint'),
    autoPrefixer=require('gulp-autoprefixer'),
    cssMinify=require('gulp-minify-css'),
    concat=require('gulp-concat'),
    ngAnnotate=require('gulp-ng-annotate'),
    rename=require('gulp-rename'),
    fileSize=require('gulp-filesize'),
    header=require('gulp-header'),
    inject=require('gulp-inject');

gulp.task('watch',function () {
    "use strict";

    gulp.watch('src/modules/**/*.js',['jshint']);
});

gulp.task('inject',function () {

    gulp.src('src/index.html')
        .pipe(inject(
            gulp.src('src/modules/**/controllers/*.js',
                {read: false}), {relative: true}))
        .pipe(gulp.dest('./src'));

});
gulp.task('header',function () {
   gulp.src('src/modules/**/*.js') .pipe(header('anshuman')).pipe(gulp.dest('build/header.js'));
});
gulp.task('jshint',function () {
    "use strict";

    return gulp.src('src/modules/**/*.js').pipe(jshint()).pipe(jshint.reporter('jshint-stylish')).pipe(jshint.reporter('fail'));
});

gulp.task('build',function () {

    gulp.src('src/modules/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
        .pipe(ngAnnotate())
        .pipe(concat('application.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(fileSize())
        .pipe(uglify())
        .pipe(rename('application.min.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(fileSize());
});
gulp.task('default',['watch']);