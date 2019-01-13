const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')

const db = require('../models')

const app = express.Router()

// Scrapes NYT "WORLD" section and returns array of result objects
app.get('/scrape', (req, res) => {
  axios.get('https://www.nytimes.com/section/world')
    .then(response => {
      const $ = cheerio.load(response.data)
      let scrapedArticles = []
      $('div.story-body').each((i, element) => {
        let link = $(element).find('a').attr('href')
        let title = $(element).find('h2.headline').text().trim()
        let summary = $(element).find('p.summary').text().trim()      
        scrapedArticles.push({
          title: title,
          link: link,
          summary: summary || 'No summary available.'
        })
      })
      res.json(scrapedArticles)
    })
})

app.post('/saveArticle', (req, res) => {
  console.log(req.body)
  db.Article.create(req.body)
  .then(function (savedArticle){
    if(savedArticle){
    res.status(200)
    console.log('woo')
    }
    if(!savedArticle){
      console.log('ERROR: Could not post to db');
    }
  })
})

module.exports = app
