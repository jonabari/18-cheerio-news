const express = require('express')
const app = express.Router()

// Index
app.get('/', function(req, res, next) {
  res.render('index')
})

// Saved articles
app.get('/saved', function(req, res, next) {
  res.render('saved')
})

// 404 catch-all
app.get('*', function(req, res) {
  res.render('404')
})

module.exports = app
