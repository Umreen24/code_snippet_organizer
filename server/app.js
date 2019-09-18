const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT
const mongoose = require('mongoose');
const Snippet = require('./schemas/snippet');

app.use(cors());
app.use(express.json());

const DB = process.env.DATABASE.replace(
    '<PASSWORD>', process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (error) => {
    if(!error) {
        console.log('Successfully connected to code_snippetsdb!')
    }
});

app.post('/add-snippet', (req, res) => {

    const title = req.body.title
    const description = req.body.description

    const snippet = new Snippet({
        title: title,
        description: description
    })

    snippet.save((error) => {
        if(error) {
            res.json({error: 'Unable to save snippet!'})
        } else {
            res.json({success: true, message: 'Saved new snippet!'})
        }
    });
});

app.get('/snippets', (req, res) => {
    Snippet.find({}, (error, snippets) => {
        if(error) {
            res.json({error: 'Unable to load snippets!'})
        } else {
            res.json(snippets)
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}!`)
})