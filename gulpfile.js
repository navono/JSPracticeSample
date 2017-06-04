var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('minify', function () {
    gulp.src('./demo.js')
     .pipe(uglify())
     .pipe(gulp.dest('./build.js'))
});

// gulpfile.js加载gulp和gulp-uglify模块之后，使用gulp模块的task方法指定任务minify。task方法有两个参数，
// 第一个是任务名，第二个是任务函数。在任务函数中，使用gulp模块的src方法，指定所要处理的文件，然后使用pipe方法，将上一步的输出转为当前的输入，进行链式处理。

// task方法的回调函数使用了两次pipe方法，也就是说做了两种处理。第一种处理是使用gulp-uglify模块，压缩源码；
// 第二种处理是使用gulp模块的dest方法，将上一步的输出写入本地文件，这里是build.js（代码中省略了后缀名js）。

// 执行minify任务时，就在项目目录中执行下面命令就可以了。

gulp.task('greet', function () {
    console.log('Hello, world!');
})

// gulp.watch('./demo.js', function (event) {
//     console.log('Event type: ' + event.type);
//     console.log('Event path: ' + event.path);
// });

var watcher = gulp.watch('./demo.js', ['build']);

watcher.on('change', function (event) {
    console.log('Event type: ' + event.type);
    console.log('Event path: ' + event.path);
});
