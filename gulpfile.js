/* 
gulp.src() gulp自动程序 在这个文件下执行设定压缩规范
.pipt() gulp依赖包中定义的函数程序等执行方式必须使用.pipe()l来执行
gulp.dest() 将打包压缩好的文件存储到定义的文件路路径中 没有文件夹会自动创建文件夹 文件名称与没有压缩的源文件保持一致
gulp.watch() 监听文件 如果文件内容发生改变自动执行打包压缩规范 参数1：监听的路径及文件 参数2：要执行的打包规范
module.exports.default= 设定gulp打包压缩的默认程序 
gulp.series() 按照顺序逐一执行设定的函数程序 参数函数名称
gulp.parallel 同时执行设定的函数程序参数是函数名称
*/
//加载gulp依赖包
const gulp = require('gulp')
const cssmin = require('gulp-cssmin')
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const webserver =require('gulp-webserver');
const cssHandler = function(){
    return gulp.src('./src/css*.css').pipe(autoprefixer()).pipe(cssmin()).pipe(gulp.dest('./dist/css'))
}
const jsHandler = function(){
    return gulp.src('./src/js/*.js').pipe(babel({presets:['@babel/env']})).pipe(uglify()).pipe(gulp.dest('./dist/js'))
}
const htmlHandler = function(){
    return gulp.src('./src/pages/*.html').pipe(htmlmin({
        removeAttributeQuotes:true,
        removeComments:true,
        removeScriptTypeAttributes:true,
        removeStyleLinkTypeAttributes:true,
        collapseBooleanAttributes:true,
        collapseWhitespace:true,
        minifyCSS:true,
        minifyJS:true,
    })).pipe(gulp.dest('./dist/pages'))
}
//不需要打包的文件规范
const ditHandler=function(){
    return gulp.src('./src/dit/**').pipe(gulp.dest('./dist/dit'))
}
const imgHandler=function(){
    return gulp.src('./src/images/**').pipe(gulp.dest('./dist/images'))
}
const audioHandler=function(){
    return gulp.src('./src/audio/**').pipe(gulp.dest('./dist/audio'))
}
const videoHandler=function(){
    return gulp.src('./src/video/**').pipe(gulp.dest('./dist/video'))
}
const serverHandler=function(){
    return gulp.src('./src/server/**').pipe(gulp.dest('./dist/server'))
}
//制定自动监听规范
const watchHandler = function(){
    gulp.watch('./src/css/*.css',cssHandler);
    gulp.watch('./src/js/*.js',jsHandler);
    gulp.watch('./src/pages/*.html',htmlHandler)
    gulp.watch('./src/images/**',imgHandler)
    gulp.watch('./src/dit/**',ditHandler)
    gulp.watch('./src/video/**',videoHandler)
    gulp.watch('./src/audio/**',audioHandler)
}
//执行删除规范
const delHandler=function(){
    return del(['./dist']);
}
//webserver服务器规范
const webserverHandler=function(){
    return gulp.src('./dist').pipe(webserver({
        host:'127.0.0.1',
        port:'8080',
        open:'./pages/dome1.html',
        livereload:true,
    }))
}
//制定导出文件 以默认程序形式导入到执行的程序文件内容
module.exports.default=gulp.series(
    delHandler,
    gulp.parallel(cssHandler,jsHandler,htmlHandler,imgHandler,videoHandler,audioHandler,ditHandler),
    webserverHandler,
    watchHandler,
);