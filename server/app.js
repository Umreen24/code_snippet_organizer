const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT
const mongoose = require('mongoose');
const Snippet = require('./schemas/snippet');
const Tag = require('./schemas/tag');

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

app.post('/snippets', (req, res) => {

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
            res.json({success: true, snippets: snippets})
        }
    });
});

app.post('/tags', (req, res) => {

    const snippetId = req.body.snippetId
    const title = req.body.title

    const tag = new Tag({
        title: title
    })

    Snippet.findById(snippetId, (error, snippet) => {
        snippet.tags.push(tag)
        snippet.save(error => {
            if(!error) {
                res.json({success: true})
            } else {
                res.json({error})
            }
        });
    });
});

app.put('/snippets', (req, res) => {

    const snippetId = req.body.snippetId
    const title = req.body.title
    const description = req.body.description

    const updatedSnippet = {
        title: title,
        snippetId: snippetId,
        description: description
    }

    Snippet.findByIdAndUpdate(snippetId, updatedSnippet, (error, result) => {
        if(error) {
            res.json({error: 'Unable to update snippet!'})
        } else {
            res.json({success: true, message: 'Snippet updated!'})
        }
    });
});

app.delete('/snippets/:snippetId', (req, res) => {
    
    const snippetId = req.params.snippetId

    Snippet.remove({_id: snippetId }, (error, result) => {
        if(error) {
            res.json({error: 'Unable to delete snippet!'})
        } else {
            res.json(result)
        }
    });
});

app.get('/snippets/:snippetId', (req, res) => {
    
    const snippetId = req.params.snippetId

    Snippet.findById(snippetId, ((error, snippet) => {
        if(error) {
            res.json({error: 'Unable to get snippet!'})
        } else {
            res.json(snippet)
        }
    }));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}!`)
})