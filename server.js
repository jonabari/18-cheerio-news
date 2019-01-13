const express = require('express')
const path = require('path')
const serveStatic = require('serve-static')
const logger = require('morgan')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

const apiRouter = require('./routes/api-routes')
const htmlRouter = require('./routes/html-routes')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(serveStatic(path.join(__dirname)))
app.use(serveStatic(path.join(__dirname, 'public')))

app.use('/', apiRouter)
app.use('/', htmlRouter)


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


mongoose.connect('mongodb://localhost/nytScrape', { useNewUrlParser: true })

let connection = mongoose.connection

connection.on('connected', () => {
  console.log('Now connected to MongoDB')
})
connection.on('disonnected', () => {
  console.log('ERROR: Disconnected from MongoDB')
})
connection.on('error', (error) => {
  console.log(`ERROR: ${error}`)
})

module.exports = app
