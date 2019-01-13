// Finds and formats current time using custom moment.js endpoint
const currentTime = moment().format('MMMM Do YYYY, h:mm a')

const postArticle = (data) => {
  console.log(data)
  // $.post('/saveArticle', {
  //   title: $(this).attr('data-title'),
  //   link: $(this).attr('data-link'),
  //   summary: $(this).attr('data-summary'),
  //   note: {}
  // })
}

// Renders articles on page
const renderArticles = (articles) => {
  articles.forEach(a => {
    let article = $('<div>')
    article.append($(`<a href="${a.link}" target="_blank"><h3>${a.title}</h3></a>`))
    article.append($(`<p>${a.summary}<p>`))
    $('#news-container').append(article)
    article.append($(`<button onclick="postArticle()" type="button" class="btn btn-success mb-3 save-btn">Save</button>`))
    article.append($('<br><hr><br>'))
  })
}

// Dynamically and contextually renders "scrape" and "clear" buttons
const renderButtons = (timeStamp) => {
  if( $('#news-container').is(':empty') ) {
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
      <button type="button" class="btn btn-dark btn-lg mt-2 mb-4 id="scrape-btn">Scrape</button>
      <button type="button" class="btn btn-warning btn-lg mt-2 mb-4" id="clear-btn">Clear</button>
    `)
  }
}

// Scrapes news articles and renders them on the page
$(document).on('click', '#scrape-btn', () => {
  $('#news-container').empty()
  $.get('/scrape')
    .then (scraped => {
      renderArticles(scraped)
      let timeStamp = currentTime
      renderButtons(timeStamp)
    })
})

// Clears page of news articles
$(document).on('click', '#clear-btn', () => {
  $('#news-container').empty()
  renderButtons()
})

renderButtons()
