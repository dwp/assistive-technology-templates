const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const sass = require('gulp-sass')
sass.compiler = require('node-sass')
const clean = require('gulp-clean')

gulp.task('nodemon', (done) => {
  return nodemon({
    script: 'server.js',
    ignore: ['.git', 'node_modules/**/node_modules'],
    watch: ['src/', 'server.js'],
    env: { NODE_ENV: 'development' },
    ext: 'js, json, njk'
  })
    .on('quit', () => {
      process.exit(0)
    }, done())
})

gulp.task('sass:compile', () => {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/styles'))
})

gulp.task('sass:watch', (done) => {
  return gulp.watch(['./src/**/*.scss'], gulp.task('sass:compile', done()))
})

gulp.task('clean', () => {
  return gulp.src('src/css', { read: false, allowEmpty: true })
    .pipe(clean())
})

gulp.task('default', gulp.series(
  'clean',
  'sass:compile',
  'sass:watch',
  'nodemon'
))
