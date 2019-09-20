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
    const tag = req.body.tag

    const snippet = new Snippet({
        title: title,
        description: description,
        tag: tag
    })

    snippet.save((error) => {
        if(error) {
            res.json({error: 'Unable to save snippet!'})
        } else {
            res.json({success: true, message: 'Saved new snippet!'})
        }
    });
});

app.get('/snippets', async (req, res) => {

    //async-await to get all snippets
    try{
        const snippets = await Snippet.find({})
        res.json({snippets: snippets})
    } catch(error) {
        res.json({error: 'Unable to get snippets!'})
    }

    /*
    //using promises to get all snipppets
    Snippet.find({}).then((snippets) => {
        res.json(snippets)
    }).catch(error => {
        res.json({error: 'Unable to get snippets!'})
    })*/

    /*
    //getting snippets using callbacks
    Snippet.find({}, (error, snippets) => {
        if(error) {
            res.json({error: 'Unable to load snippets!'})
        } else {
            res.json({success: true, snippets: snippets})
        }
    });*/
});

app.post('/tags', async (req,res) => {

    const snippetId = req.body.snippetId
    const tagTitle = req.body.tagTitle

    const tag = new Tag({snippetId: snippetId, tagTitle: tagTitle})

   const result = await tag.save()
   console.log(result)
   res.send('ok')
})

/*
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
});*/

app.put('/update-snippet', (req, res) => {

    const id = req.body.id
    const title = req.body.title
    const description = req.body.description
    const tag = req.body.tag

    const updatedSnippet = {
        title: title,
        id: id,
        description: description,
        tag: tag
    }

    Snippet.findByIdAndUpdate(id, updatedSnippet, (error, result) => {
        if(error) {
            res.json({error: 'Unable to update snippet!'})
        } else {
            res.json({success: true, message: 'Snippet updated!'})
        }
    });
});

app.delete('/snippets/:id', (req, res) => {
    
    const id = req.params.id

    Snippet.remove({_id: id }, (error, result) => {
        if(error) {
            res.json({error: 'Unable to delete snippet!'})
        } else {
            res.json(result)
        }
    });
});

/*
app.get('/snippets/:snippetId', (req, res) => {
    
    const snippetId = req.params.snippetId

    Snippet.findById(snippetId, ((error, snippet) => {
        if(error) {
            res.json({error: 'Unable to get snippet!'})
        } else {
            res.json(snippet)
        }
    }));
});*/

app.get('/snippets/:snippetId', async (req, res) => {
    
    const snippetId = req.params.snippetId

    const snippet = await Snippet.findById(snippetId)
    const tags = await Tag.find({
        snippetId: snippetId
    })
    res.json({snippet: snippet, tags: tags})
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}!`)
})