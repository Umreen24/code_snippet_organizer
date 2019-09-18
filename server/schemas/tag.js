
const mongoose = require('mongoose'); 

const tagSchema = new mongoose.Schema({
    title: String,
})

const Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag; 