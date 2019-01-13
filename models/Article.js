const mongoose = require('mongoose')

const Schema = mongoose.Schema

var ArticleSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	link: {
		type: String,
		required: true,
	},
	summary: {
		type: String,
		default: 'Summary unavailable.'
	},
	saved: {
		type: Boolean,
		default: false
	},
	note: {
		type: Schema.Types.ObjectId,
		ref: "Note"
	}
})

let Article = mongoose.model('Article', ArticleSchema)

module.exports = Article
