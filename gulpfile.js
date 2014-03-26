var gulp = require('gulp')
var fs = require('fs')


// prevent the process from exiting
process.on('uncaughtException', console.log)
process.on('error', console.log)


gulp.task('rework', function () {
  var rework = require('rework')
  var reworknpm = require('rework-npm')

  var source = fs.readFileSync('./example/index.css', 'utf8')
  var css = rework(source).use(reworknpm({ dir: __dirname + '/example' })).toString()

  fs.writeFileSync('./example/bundle.css', css, 'utf8')
})


gulp.task('browserify', function () {
  var browserify = require('browserify')

  var bundle = fs.createWriteStream('./example/bundle.js')

  browserify('./example/index.js', { debug: true })
    .bundle()
    .pipe(bundle)
})


gulp.task('watch', function () {
  var livereload = require('gulp-livereload')
  var lr = livereload()

  gulp.watch(['./*.js', './example/*.js', '!./example/bundle.js'], ['browserify'])
  gulp.watch(['./*.css', './example/*.css', '!./example/bundle.css'], ['rework'])

  gulp
    .watch(['./example/*.*'])
    .on('change', function (file) {
      console.log('File changed: ' + file.path)
      lr.changed(file.path.replace(__dirname + '/example', ''))
    })
})


gulp.task('server', function () {
  var http = require('http')
  var url = require('url')
  var send = require('send')

  http.createServer(function (request, response) {
    send(request, url.parse(request.url).pathname)
      .root(__dirname + '/example')
      .pipe(response)
  }).listen(3000)
})


gulp.task('default', ['server', 'rework', 'browserify', 'watch'])