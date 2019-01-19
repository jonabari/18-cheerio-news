// Renders articles on page
// NOTE: saveArticle function is triggered by onClick event in the html set by jQuery.
const renderArticles = (articles) => {
  let i = 0
  articles.forEach(a => {
    let article = $('<div class="text-justify">')
    article.append($('<hr><br>'))
    article.append($(`<a href="${a.link}" target="_blank"><h3>${a.title}</h3></a>`))
    article.append($(`<p>${a.summary}<p>`))
    $('#news-container').append(article)
    article.append($(`<div class="text-right"><button onclick="saveArticle(${i})" type="button" class="btn btn-lg btn-success mb-2 align-right">Save</button></div>`))
    i++
  })
}

// Dynamically and contextually renders "scrape" and "clear" buttons
const renderButtons = (timeStamp) => {
  if ($('#news-container').is(':empty') ) {
    $('#messaging-container').html(`
      <h1>Click to get the<br>New York Times</h1>
    `)
    $('#btn-container').html(`
      <button type="button" class="btn btn-dark btn-lg mt-2 mb-4" id="scrape-btn">Scrape</button>
    `)
  } else {
    $('#messaging-container').html(`
      <h1>Last scraped</h1>
      <h2 id="scrape-time-stamp">${timeStamp}</h2>
    `)
    $('#btn-container').html(`
      <button type="button" class="btn btn-dark btn-lg mt-2 mb-4" id="scrape-btn">Scrape</button>
      <button type="button" class="btn btn-warning btn-lg mt-2 mb-4" id="clear-btn">Clear</button>
    `)
  }
}

// Saves individual article to MongoDB for future reference
const saveArticle = (i) => {
  let scrapedArticles = JSON.parse(sessionStorage.getItem('nytScrapeArticles'))
  $.ajax({
    method: 'POST',
    url: '/saveArticle',
    data: scrapedArticles[i]
  }).then((data) => {
    if (data) {
      Swal.fire({
        type: 'success',
        title: 'Great!',
        text: 'The article has been saved.',
        footer: '<p>You can view saved articles in the <a href="/saved" style="font-weight:bold">saved</a> tab</p>',
        confirmButtonColor: '#5cb85c',
      })    } else {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<p>Could not post to the database.</p>',
          confirmButtonColor: '#d9534f'
        })    
      }
  })
}

// Scrapes news articles and renders them on the page
$(document).on('click', '#scrape-btn', () => {
  $('#news-container').empty()
  $('.loader').toggleClass('loader-on')
  $.get('/scrape')
    .then (scraped => {
      let timeStamp = moment().format('MMMM Do YYYY, h:mm a')
      sessionStorage.setItem('nytScrapeArticles', JSON.stringify(scraped))
      if (timeStamp) {
        sessionStorage.setItem('nytScrapeTimeStamp', timeStamp)
      }
      $('.loader').toggleClass('loader-on')
      renderArticles(scraped)
      renderButtons(timeStamp)
    })
})

// Clears page of scraped news articles
$(document).on('click', '#clear-btn', () => {
  $('#news-container').empty()
  sessionStorage.clear()
  renderButtons()
})

$(document).ready(() => {
  let storedArticles = JSON.parse(sessionStorage.getItem('nytScrapeArticles'))
  let storedTimeStamp = sessionStorage.getItem('nytScrapeTimeStamp')
  if (storedArticles) {
    renderArticles(storedArticles)
    renderButtons(storedTimeStamp)
  } else {
    renderButtons()
  }
})
