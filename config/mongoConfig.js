var mongojs = require('mongojs');
var databaseUrl = 'news-scrape';
var collections = ['articles'];

var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log('Database Error:', error);
});

module.exports = db
