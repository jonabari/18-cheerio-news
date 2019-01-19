// Dynamically and contextually renders messaging-container
const renderMessagingContainer = () => {
  if ($('#news-container').is(':empty') ) {
    $('#messaging-container').html(`
      <h1>There are no saved articles.</h1>
    `)
  } else {
    $('#messaging-container').html(`
    <h1>Saved articles.</h1>
    `)
  }
}

// Gets saved articles from db, if any
const getArticlesCollection = () => {
  $.get('/getArticlesCollection')
  .then (articles => {
    renderMessagingContainer()
    renderSavedArticles(articles)
  })
}

// Removes one article from the database
const removeArticle = (id) => {
  $.ajax({
    url: `deleteArticle/${id}`,
    type: 'DELETE',
    success: function(removed) {
      if (removed) {
        Swal.fire({
          type: 'success',
          title: 'You got it!',
          text: 'The article has been removed.',
          confirmButtonColor: '#5cb85c',
        }).then(() => {
          $('#news-container').empty()
          getArticlesCollection()
        })
      } else {
        console.log(err)
        Swal.fire({
          type: 'error',
          title: 'Sorry!',
          text: '<h3>Could not remove article from database.</h3>',
          confirmButtonColor: '#d9534f',
        })
      }
    }  
  })
}

const addNote = () => {
  console.log('its aliiiiive')
}

// Renders savedArticles on page
const renderSavedArticles = (articles) => {
  articles.forEach(a => {
    let article = $('<div class="text-justify">')
    article.append($('<hr><br>'))
    article.append($(`<a href="${a.link}" target="_blank"><h3>${a.title}</h3></a>`))
    article.append($(`<p>${a.summary}<p>`))
    article.append($(`
      <div class="d-flex flex-row-reverse">
          <div class="col-xs-6 text-right">
            <button onclick="addNote('${a._id}')" type="button" class="btn btn-primary mb-2 ml-2 align-right">Add Note</button>
        </div>
          <div class="col-xs-6 text-right">
            <button onclick="removeArticle('${a._id}')" type="button" class="btn btn-danger mb-2 ml-2 align-right">Remove</button>
          </div>
      </div>
    `))

    $('#news-container').append(article)
  })
  renderMessagingContainer()
}

$(document).ready(() => {
  getArticlesCollection()
})
