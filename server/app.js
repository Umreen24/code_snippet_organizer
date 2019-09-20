const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT
const mongoose = require('mongoose');
const User = require('./schemas/user');
const Snippet = require('./schemas/snippet');
const Tag = require('./schemas/tag');
const authentication = require('./authMiddleware');

app.use(cors());
app.use(express.json());
app.all('/api/*', authentication);

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

app.post('/api/snippets', (req, res) => {

    const title = req.body.title
    const description = req.body.description
    const tag = req.body.tag

    const snippet = new Snippet({
        title: title,
        description: description,
        tag: tag
    })

    snippet.save();
});

app.get('/snippets', async (req, res) => {

    //async-await to get all snippets
    try{
        const snippets = await Snippet.find({})
        res.json({snippets: snippets})
    } catch(error) {
        res.json({error: 'Unable to get snippets!'})
    }

});

app.post('/api/tags', async (req,res) => {

    const snippetId = req.body.snippetId
    const tagTitle = req.body.tagTitle

    const tag = new Tag({snippetId: snippetId, tagTitle: tagTitle})

   const result = await tag.save()
   console.log(result)
   res.send('ok')
})

app.put('/api/update-snippet', (req, res) => {

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

app.delete('/api/snippets/:id', (req, res) => {
    
    const id = req.params.id

    Snippet.remove({_id: id }, (error, result) => {
        if(error) {
            res.json({error: 'Unable to delete snippet!'})
        } else {
            res.json(result)
        }
    });
});

app.get('/snippets/:snippetId', async (req, res) => {
    
    const snippetId = req.params.snippetId

    const snippet = await Snippet.findById(snippetId)
    const tags = await Tag.find({
        snippetId: snippetId
    })
    res.json({snippet: snippet, tags: tags})
});

app.post('/register', async(req, res) => {
    
    try {
        const user = new User(req.body)
        await user.save()
        res.json({user, message: 'Registration successful!'})
    } catch (error) {
        res.send(error)
    }
});

app.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body
        const user = await User.findByCredentials(username, password)
        if(!user) {
            return res.json({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch(error) {
        res.send(error)
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}!`)
})