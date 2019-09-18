
import React, {useState} from 'react';
import axios from 'axios';

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
        <div>
            <h3>Add New Snippet</h3>
            <input type='text' name='title' placeholder='Enter snippet title' onChange={(e) => handleTextChange(e)}/>
            <input type='text' name='description' placeholder='Enter code snippet' onChange={(e) => handleTextChange(e)}/>
            <button onClick={() => handleAddSnippet()}>Add Snippet</button>
        </div>
    )
}

export default AddSnippet;