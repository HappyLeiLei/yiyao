let gulp = require('gulp'),
  gutil = require('gulp-util'),
  del = require('del'),
  file_include = require('gulp-file-include'),
  html_min = require('gulp-htmlmin'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify'),
  babel = require('gulp-babel'),
  post_css = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  clean_css = require('gulp-clean-css'),
  scss = require('gulp-sass'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload;

// 清除 dist 文件
gulp.task('clear', () => {
  return del.sync('./app/dist');
});

// 整合 HTML
gulp.task('html', () => {
  let options = {
    removeComments: true, //清除HTML注释
    collapseWhitespace: true, //压缩HTML
    minfyJS: true, //压缩JS
    minfyCss: true //压缩CSS
  };
  return gulp
    .src('./app/src/template/*.html')
    .pipe(
      file_include({
        prefix: '@@',
        basepath: '@file'
      })
    )
    .pipe(html_min(options))
    .pipe(gulp.dest('./app/dist'));
});

// Copy 插件库 js
gulp.task('copy_js', () => {
  return gulp.src('./app/src/lib/**/*.js').pipe(gulp.dest('./app/dist/js'));
});

// Copy 插件库 css
gulp.task('copy_css', () => {
  return gulp.src('./app/src/lib/**/*.css').pipe(gulp.dest('./app/dist/css'));
});
// copy layer
gulp.task('z_layer', () => {
  return gulp.src('./app/src/layer/**/*').pipe(gulp.dest('./app/dist/layer'));
});
// Copy 图片 img
gulp.task('copy_img', () => {
  return gulp.src('./app/src/images/**/*').pipe(gulp.dest('./app/dist/images'));
});

// Copy 字体 font
gulp.task('copy_font', () => {
  return gulp.src('./app/src/fonts/**/*').pipe(gulp.dest('./app/dist/fonts'));
});

// Copy ckplayer
gulp.task('ckplayer', () => {
  return gulp
    .src('./app/src/lib/ckplayer/**/*')
    .pipe(gulp.dest('./app/dist/js/ckplayer'));
});

// Copy
gulp.task('copy', ['copy_js', 'copy_css','z_layer','copy_img', 'copy_font', 'ckplayer']);

// 压缩 JS
gulp.task('jsmin', () => {
  return gulp
    .src('./app/src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(
      uglify({
        mangle: true,
        compress: true
      })
    )
    .on('error', function(err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./app/dist/js'));
});

// 转换 scss 自动添加浏览器前缀 生成css  压缩css
gulp.task('scss', () => {
  let processors = [autoprefixer({ browsers: ['last 2 versions'] })];
  return gulp
    .src('./app/src/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(scss())
    .pipe(post_css(processors))
    .pipe(clean_css())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./app/dist/css'));
});

// 配置服务器
gulp.task('server', () => {
  browserSync.init({
    server: {
      baseDir: './app/dist'
    },
    port: 8886
  });
});

// 监听 Html
gulp.watch('./app/src/template/**/*.html', ['html']).on('change', reload);
// 监听 JS
gulp.watch('./app/src/js/*.js', ['jsmin']).on('change', reload);
// 监听 scss
gulp.watch('./app/src/scss/**/*.scss', ['scss']).on('change', reload);

gulp.task('default', ['clear', 'html', 'copy', 'scss', 'jsmin', 'server']);
