const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

/*

    Gulp -- Top level functions --

    gulp.task - Define Tasks
    gulp.src - Point to files to use
    gulp.dest - Point to folder to output
    gulp.watch - Watch files and folders for changes


    Difference between Gulp/Grunt and Webpack ?
  
  - Gulp/Grunt are task runners and webpack is a bundler. Task Runners can help up automating some common task example, copying files, optimizing images. But task runners cannot
    do bundling. For bundling tools like webpack are designed.
    Bundling means putting together many interconnected files(js files) which are interconnected using imports/exports into a single file called the bundled file in the form of
    output. For bundling we only have to point to the starter file and then all the interconnected files are bundled to a single file as output. This is functionality what bundler
    like webpack provied but task runners like Gulp/Grunt cannot perform bundling.
*/


// Logs Message
gulp.task('message', function(cb){
    console.log('Gulp is running');
    cb();
});

// Copy all html files
gulp.task('copyHtml', (cb) => {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
    cb();
})

// Optimize Images using gulp-imagemin
gulp.task('imageMin',(cb) => {
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
    cb();
});

// Minify JS
gulp.task('minify', (cb) => {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
    cb();
})

// Compile Sass
gulp.task('sass', (cb) => {
    gulp.src('src/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
    cb();
})

// Concat files
gulp.task('scripts', (cb) => {
    gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
    cb();
});

const anotherTask = (cb) => {
    console.log('Gulp Finished');
    cb();
}

gulp.task(anotherTask);


exports.seriesTask = gulp.series(['message','copyHtml','imageMin','sass','anotherTask', 'scripts']);

exports.parallelTask = gulp.parallel(['message','copyHtml','imageMin','minify','sass', 'anotherTask']);

exports.default = gulp.series(['message','copyHtml','imageMin','sass','anotherTask', 'scripts']);  // Default task