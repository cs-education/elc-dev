import gulp from 'gulp';
import webpack from 'webpack-stream';
import WebpackCore from 'webpack';
import connect from 'gulp-connect';
import watch from 'gulp-watch';
import config from './webpack.config.js';

gulp.task('build', () => {
  return gulp.src('.')
    .pipe(webpack(config))
    .pipe(gulp.dest('public/'));
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
  return watch('src/**/*', () => {
    gulp.start('build');
  });
});

gulp.task('prod', () => {
  let myConfig = Object.create(config);
  myConfig.plugins = myConfig.plugins.concat(
    new WebpackCore.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new WebpackCore.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new WebpackCore.optimize.DedupePlugin()
  );

  return gulp.src('.')
    .pipe(webpack(myConfig))
    .pipe(gulp.dest('public-prod/assets'));
});

gulp.task('default', ['serve'])
