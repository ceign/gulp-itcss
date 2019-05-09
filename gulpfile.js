const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();



gulp.task('default', async function(){
    console.log('GULP ITS WORK!')
});

gulp.task('sass', async function () {
    return gulp.src('scss/*.scss')

    .pipe(sass().on('error', sass.logError))
    //.pipe(cssnano())
    .pipe(autoprefixer({
        browsers: ['last 10 versions'],
        cascade: true
    }))
    .pipe(gulp.dest('app/css/'))
    .pipe(browserSync.stream());
});

gulp.task('compress', async function (){
    gulp.src('app/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('app/js/dist/'));
});

gulp.task('autoprefix', async function (){
    gulp.src('scss/**/.scss')
    .pipe(gulp.dest('app/css/'))
});

gulp.task('serve', gulp.series('sass', async function (){
    browserSync.init({
        server:"./app"
    });

    gulp.watch('app/js/*.js', 
    gulp.series('compress')).on('change', browserSync.reload);

    gulp.watch('scss/**/*.scss', gulp.series('sass')).on('change', browserSync.reload);

    gulp.watch('app/*.html').on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('serve'));
