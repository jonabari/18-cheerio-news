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

app.get('/getArticlesCollection', (req, res) => {
  db.Article.find({})
  .then(articlesCollection => {
    if (articlesCollection){
      res.json(articlesCollection)
    } else if(!articlesCollection)
    console.log("ERROR: cannot get from db")
  })
})

app.get('/getArticleById/:id', (req, res) => {
  let id = req.params.id
  db.Article.find({_id: id})
  .then(article => {
    if (article){
      res.json(article)
    } else if(!article)
    console.log("ERROR: cannot get from db")
  })
})

app.post('/saveArticle', (req, res) => {
  console.log(req.body)
  db.Article.create(req.body)
  .then(savedArticle => {
    if(savedArticle){
      res.send(savedArticle)
      console.log("I'm working!");
    } else if(!savedArticle){
      console.log('ERROR: Could not post to db');
    }
  })
})

app.delete('/deleteArticle/:id', (req, res) =>{
  let id = req.params.id
  db.Article.remove({_id: id})
    .then(deleted => {
      if(deleted){
        res.send(deleted)
      } else if(!deleted){
      }
    })
})

app.delete('/deleteAllArticles', (req, res) =>{
  db.Article.remove({})
    .then(deleted => {
      if(deleted){
        res.send(deleted)
      } else if(!deleted){
      }
    })
})

app.put('/updateNotes/:id', (req,res) => {
  let id = req.params.id
  console.log(req.body, id)
  db.Article.updateOne(
    {_id: id},
    req.body
  ).then(update => {
      if(update){
        res.send(update)
      } else if(!update){
        console.log("Could not update article in db")
      }
    })
})


module.exports = app
