var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    minjs = require('gulp-uglify'),
    watch = require('gulp-watch'),
	path = require('path'),
	fs = require('fs'),
	mincss=require('gulp-mini-css');


var paths = {
	src : path.normalize('../my-project/source'),//path.normalize()输出规范格式的path字符串。
	dist : path.normalize('../my-project/dist')
};



gulp.task('default',['testJsmin','testImagemin','testCSSmin']);

gulp.task('copy',function(){
    gulp.src('source/**/**.html')
        .pipe(gulp.dest('dist/'));
});


/*实现src里添加和修改时都将JS文件压缩并部署到dist目录，而当文件被删除的时候又可以删除dist下对应的文件*/
gulp.task('testJsmin', function(){
	watch('./src/**/**.js')
		.on('add', buildJs)
		.on('change', buildJs)
		.on('unlink', unlinkDistFile);
});
function buildJs(file){
	gulp.src(file, {base : paths.src}) //指定这个文件
		.pipe(minjs().on('error', function(error){
			console.error(error.message + '\n出错行号:' + error.lineNumber);
		}))
		.pipe(gulp.dest(paths.dist));
}



//压缩图片 
gulp.task('testImagemin', function () {
    gulp.src('./src/**/**.{png,jpg,gif,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest(paths.dist));  
});



//压缩css
gulp.task('testCSSmin', function () {
	watch('./src/**/**.css')
		.on('add', function(file){
			console.log(file + ' 添加');
			gulp.src(file, {base : paths.src})
				.pipe(mincss())
				.pipe(gulp.dest(paths.dist));
		})
		.on('change', function(file){
			console.log(file + ' 修改');
			gulp.src(file, {base : paths.src})
				.pipe(mincss())
				.pipe(gulp.dest(paths.dist));
		})
		.on('unlink', unlinkDistFile);
});


/*一次性构建的任务：只要执行gulp deploy命令就能一次性将图片压缩、压缩JS、压缩CSS了*/
gulp.task('deploy', function(){
	//gulp.src(paths.src + './src/**/**.{png,jpg,gif,ico}')
	    //.pipe(imagemin())
		//.pipe(gulp.dest(paths.dist));
	
	//gulp.src(paths.src + '/**/**.js')
		//.pipe(minjs().on('error', function(error){
			//console.log(error.message, error.lineNumber);
		//}))
		//.pipe(gulp.dest(paths.dist));
		
	gulp.src(paths.src + '/**/**.css')
		.pipe(mincss())
		.pipe(gulp.dest(paths.dist));
	
});


function unlinkDistFile(file){
	console.log(file + ' 删除');
	var distFile = paths.dist + '/' + path.relative(paths.src, file); //计算相对路径
	fs.existsSync(distFile) && fs.unlink(distFile);
}