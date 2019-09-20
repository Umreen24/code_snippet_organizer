
import React, {useState, useEffect} from 'react';
import '../styles.css';

function ViewSnippets(props) {

    const [snippets, setSnippet] = useState([])
    const fetchSnippets = () => {
        fetch('http://localhost:3001/snippets')
        .then(response => response.json())
        .then(json => {
            setSnippet(json.snippets)
            console.log(json.snippets)
        })
    }

    useEffect(() => {
        fetchSnippets()
        },[])
    
    const deleteSnippet = (id) => {
        fetch(`http://localhost:3001/snippets/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: id
            })
        })
        .then(response => {
            props.history.push('/snippets')
        })
    }

    return <div>
                <h2 className='snip-sub'>Community Snippets</h2>
                <div className='snip-list'>
                    {snippets.map(snippet => {
                    return <div className='snips' key={snippet._id}>
                                <h3>{snippet.title}</h3>
                                <span>{snippet.description}</span>
                                <span className='tag'>{snippet.tag}</span>
                                <span className='snippet-id'> Snippet ID: {snippet._id}</span>
                                <button className='delete-btn' onClick={() => deleteSnippet(snippet._id)}>Delete Snippet</button>
                            </div>
                    })}
                </div>
            </div>
}

export default ViewSnippets;