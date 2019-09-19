
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const tagSchema = new mongoose.Schema({
    snippetId: ObjectId,
    tagTitle: String,
})

const Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag; 