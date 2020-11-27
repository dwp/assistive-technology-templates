const express = require('express')
const nunjucks = require('nunjucks')
const app = express()

nunjucks.configure('src', {
  autoescape: true,
  express: app
})

app.set('view engine', 'njk')

app.get('/', (req, res, next) => {
  res.render('views/index.njk')
})

app.get(/^([^.]+)$/, (req, res, next) => {
  var path = req.path
  path = path.substr(1)
  if (path === '') {
    path = 'index'
  }
  res.render(`views/${path}/index.njk`)
})

app.listen(3000)
console.log('listening on port 3000')
