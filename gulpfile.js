let gulp=require("gulp");
let htmlmin=require("gulp-htmlmin");
let cleancss=require("gulp-clean-css");
let imagemin=require("gulp-imagemin");
let sass=require("gulp-sass");

gulp.task("default",async()=>{
    gulp.watch("./*.html",async()=>{
        gulp.src("./*.html")
        .pipe(htmlmin({collapseWhitespace:true,removeComments:true,collapseBooleanAttributes:true,removeEmptyAttributes:true,removeScriptTypeAttributes:true,removeStyleLinkTypeAttributes:true,minifyJS:true}))
        .pipe(gulp.dest("d:\\phpstudy\\www\\farfetch"));
    })
    gulp.watch("./php/*.php",async()=>{
        gulp.src("./php/*.php")
        .pipe(gulp.dest("d:\\phpstudy\\www\\farfetch\\php"));
    })
    gulp.watch("./img/**/*",async()=>{
        gulp.src("./img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("d:\\phpstudy\\www\\farfetch\\img"));
    })
    gulp.watch("./js/**/*",async()=>{
        gulp.src("./js/**/*")
        .pipe(gulp.dest("d:\\phpstudy\\www\\farfetch\\js"));
    })

    gulp.watch("./css/**/*",async()=>{
        gulp.src("./css/**/*")
        .pipe(cleancss())
        .pipe(gulp.dest("d:\\phpstudy\\www\\farfetch\\css"));
    })

    gulp.watch("./*.scss",async()=>{
        gulp.src("./*.scss")
        .pipe(sass())
        .pipe(gulp.dest("d:\\phpstudy\\www\\farfetch\\css"));
    })
})