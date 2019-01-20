// Dynamically and contextually renders messaging-container
const renderMessagingContainer = () => {
  if ($('#news-container').is(':empty') ) {
    $('#messaging-container').html(`
      <h1>There are no saved articles.</h1>
    `)
  } else {
    $('#messaging-container').html(`
    <h1>Saved articles.</h1>
    <button type="button" onclick="deleteAllArticles()" class="btn btn-warning mt-2 mb-4" id="clear-btn">Remove All Articles</button>
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

// Removes all articles from the db
const deleteAllArticles = () => {
  $.ajax({
    url: `/deleteAllArticles`,
    type: 'DELETE',
    success: removed => {
      if (removed) {
        Swal.fire({
          type: 'warning',
          title: 'Alert!',
          text: 'All articles have been removed from the db.',
          confirmButtonColor: '#ffc107',
        }).then(() => {
          $('#news-container').empty()
          getArticlesCollection()
        })
      } else {
        console.log(err)
        Swal.fire({
          type: 'error',
          title: 'Sorry!',
          text: 'Could not remove all articles from database.',
          confirmButtonColor: '#d9534f',
        })
      }
    }  
  })
}

// Removes one article from the database
const removeArticle = id => {
  $.ajax({
    url: `deleteArticle/${id}`,
    type: 'DELETE',
    success: removed => {
      if (removed) {
        $('#news-container').empty()
        getArticlesCollection()
      } else {
        console.log(err)
        Swal.fire({
          type: 'error',
          title: 'Sorry!',
          text: 'Could not remove article from database.',
          confirmButtonColor: '#d9534f',
        })
      }
    }  
  })
}

const saveNote = (id) => {
  $.get(`/getArticleById/${id}`)
    .then (article => {
      let notes = article[0].notes
      let newNote = $('.new-note').val()
      notes.push(newNote)
      fetch(`/updateNotes/${id}`, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'notes': notes,
        })
      }).then(() => {
        viewNotes()
      })

    })
}

const viewNotes = id => {
  $.get(`/getArticleById/${id}`)
    .then (article => {
      let notesDiv = $('<div>')
      article[0].notes.forEach(n => {
        notesDiv.append($('<hr>'))
        notesDiv.append($(`<h6>${n}</h6>`))
      })
      notesDiv.append($(`
      <form>
        <div class="input-group m-2">
          <input type="text" class="form-control new-note" placeholder="Type a new note.">
          <div class="input-group-append" onclick="saveNote('${id}')">
            <button class="btn btn-success" type="button">Save</button>
          </div>
        </div>     
      </form>
      `))
      Swal.fire({
        title: 'Notes',
        text: article[0].title,
        html: notesDiv
      })
    })    
}

// Renders savedArticles on page
const renderSavedArticles = articles => {
  articles.forEach(a => {
    let article = $('<div class="text-justify">')
    article.append($('<hr><br>'))
    article.append($(`<a href="${a.link}" target="_blank"><h3>${a.title}</h3></a>`))
    article.append($(`<p>${a.summary}<p>`))
    article.append($(`
      <div class="d-flex flex-row-reverse">
          <div class="col-xs-6 text-right">
            <button onclick="viewNotes('${a._id}')" type="button" class="btn btn-primary mb-2 ml-2 align-right">View Notes</button>
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
