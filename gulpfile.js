const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const nodemon = require('gulp-nodemon');
const rimraf = require('rimraf');
const runSequence = require('run-sequence');
const tsConfig = ts.createProject('./tsconfig.json');

const paths = {
  ts: './src/**/*.ts',
  dest: './public',
  destIndex: './public/app.js',
};

gulp.task('clean', (callback) => (
  rimraf(paths.dest, callback)
));

gulp.task('ts', () => (
  gulp.src(paths.ts)
    .pipe(sourcemaps.init())
    .pipe(tsConfig())
    .js
    .pipe(sourcemaps.write(
      '.', {
        includeContent: false,
        sourceRoot: '',
      }))
    .pipe(gulp.dest(paths.dest))
));

gulp.task('start', () => (
  nodemon({
    script: paths.destIndex,
  })
));

gulp.task('watch', () => (
  gulp.watch([paths.ts], ['ts'])
));

gulp.task('build', [
  'clean',
  'ts'
]);

gulp.task('dev', [
  'watch',
  'start'
]);
