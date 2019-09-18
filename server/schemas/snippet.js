
const mongoose = require('mongoose'); 
const Tag = require('./tag');

const snippetSchema = new mongoose.Schema({
    title: String,
    description: String,
    tags: [Tag.schema]
})

const Snippet = mongoose.model('Snippet', snippetSchema)

module.exports = Snippet; 