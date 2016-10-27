import gulp from 'gulp';
import webpack from 'webpack-stream';
import connect from 'gulp-connect';
import watch from 'gulp-watch';

gulp.task('build', () => {
  return gulp.src('.')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('public'));
});

gulp.task('serve', ['build'], () => {
  gulp.start('watch');
  connect.server({
    name: 'dev',
    root: ['.'],
    port: 8000,
    livereload: true
  });
});

gulp.task('watch', () => {
  return watch('src/**/*.js', () => {
    gulp.start('build');
  });
});
