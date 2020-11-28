const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const sass = require('gulp-sass')
sass.compiler = require('node-sass')
const clean = require('gulp-clean')
const nunjucksLib = require('nunjucks')
const nunjucks = require('gulp-nunjucks')
const formatHtml = require('gulp-format-html')

gulp.task('nodemon', (done) => {
  return nodemon({
    script: 'server.js',
    ignore: ['.git', 'node_modules/**/node_modules'],
    watch: ['src/', 'server.js'],
    env: { NODE_ENV: 'development' },
    ext: 'js, json, njk, css'
  })
    .on('quit', () => {
      process.exit(0)
    }, done())
})

gulp.task('sass:compile', () => {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))

    .pipe(gulp.dest('./src/styles'))
})

gulp.task('sass:watch', (done) => {
  return gulp.watch(['./src/**/*.scss'], gulp.task('sass:compile', done()))
})

gulp.task('clean', () => {
  return gulp.src('src/css', { read: false, allowEmpty: true })
    .pipe(clean())
})

gulp.task('nunjucks:compile', () => {
  return gulp.src([
    'src/views/nvda/nvda.njk',
    'src/views/os-x-voiceover/os-x-voiceover.njk'
  ])
    .pipe(nunjucks.compile(
      { name: 'moo' },
      { env: new nunjucksLib.Environment(new nunjucksLib.FileSystemLoader('src')) }
    ))
    .pipe(formatHtml({ max_preserve_newlines: '-1' }))
    .pipe(gulp.dest('html'))
})

gulp.task('default', gulp.series(
  'clean',
  'sass:compile',
  'sass:watch',
  'nodemon'
))
