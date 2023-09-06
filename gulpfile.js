import gulp from "gulp"; //import CommonJS
import concat from "gulp-concat";
import minify from "gulp-minify";
import cleanCSS from 'gulp-clean-css';
import clean from 'gulp-clean';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';
import imagemin from 'gulp-imagemin';

const html = () => {
    return gulp.src("./src/*.html")
        .pipe(gulp.dest("./dist"));
}

const js = () => {
    return gulp.src("./src/scripts/**/*.js")
        .pipe(concat("script.js"))
        .pipe(minify({
            ext: {
                src: '.js',
                min: '.min.js'
            },
        }))
        .pipe(gulp.dest("./dist/scripts"));
}

const css = () => {
    return gulp.src("./src/styles/**/*.css")
        .pipe(concat("style.css"))
        .pipe(gulp.dest('./dist/styles'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/styles'));
}

const cleanDist = () => {
    return gulp.src('./dist', {read: false})
        .pipe(clean())

}

const server = () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
}

const images = () => {
    return gulp.src("./src/images/**/*.*")
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'))
}

const watcher = () => {
    gulp.watch("./src/*.html", html).on('all', browserSync.reload);
    gulp.watch("./src/style/**/*.{scss,sass,css}", css).on('all', browserSync.reload);
    gulp.watch("./src/style/**/*.js", js).on('all', browserSync.reload);
    gulp.watch("./src/images/**/*.*", images).on('all', browserSync.reload);
}


gulp.task(
    "html", html
);

gulp.task(
    "scripts", js
);

gulp.task(
    "style", css
);

gulp.task(
    "cleanDist", cleanDist
);
gulp.task(
    "browser-sync", server
);
gulp.task(
    "images", images
);

gulp.task("dev", gulp.series(
    gulp.parallel(html, css, js, images),
    gulp.parallel(server, watcher)
));

gulp.task("build", gulp.series(
    cleanDist,
    gulp.parallel(
        html, css, js, images
    )
));

