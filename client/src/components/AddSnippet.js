
import React, {useState} from 'react';
import axios from 'axios';
import '../styles.css';

function AddSnippet() {

    const [snippet, setSnippet] = useState({title: '', description: ''})

    const handleAddSnippet = () => {
        axios.post('http://localhost:3001/snippets', {
            title: snippet.title,
            description: snippet.description
        }).then(response => {
            console.log(response.data)
        })
    };

    const handleTextChange = (e) => {
        setSnippet({
            ...snippet,
            [e.target.name]: e.target.value
        })
    };

    return(
        <div className='add-snip'>
            <h3 className='snip-list'>Add New Snippet</h3>
            <input className='snip-title' type='text' name='title' placeholder='Enter snippet title' onChange={(e) => handleTextChange(e)}/>
            <input className='snip-description' type='text' name='description' placeholder='Enter code snippet' onChange={(e) => handleTextChange(e)}/>
            <button onClick={() => handleAddSnippet()}>Add Snippet</button>
        </div>
    )
}

export default AddSnippet;