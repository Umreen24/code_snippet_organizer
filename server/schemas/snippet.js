
const mongoose = require('mongoose'); 
const Tag = require('./tag');

const snippetSchema = new mongoose.Schema({
    title: String,
    description: String,
})

const Snippet = mongoose.model('Snippet', snippetSchema)

module.exports = Snippet; 