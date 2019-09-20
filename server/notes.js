
//different ways to get snippets
app.get('/snippets', async (req, res) => {

    
    //using promises to get all snipppets
    Snippet.find({}).then((snippets) => {
        res.json(snippets)
    }).catch(error => {
        res.json({error: 'Unable to get snippets!'})
    })

    
    //getting snippets using callbacks
    Snippet.find({}, (error, snippets) => {
        if(error) {
            res.json({error: 'Unable to load snippets!'})
        } else {
            res.json({success: true, snippets: snippets})
        }
    });
});

//add tags as an array to snippets doc
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