
const mongoose = require('mongoose'); 

const snippetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a snippet title!']
    },
    description: {
        type: String,
        required:[true, 'Please provide the code for this snippet!']
    },
    tag: String
})

const Snippet = mongoose.model('Snippet', snippetSchema)

module.exports = Snippet; 