
import React, {useState} from 'react';
import axios from 'axios';
import '../styles.css';

function AddSnippet() {

    const [snippet, setSnippet] = useState({title: '', description: '', tag: ''})

    const handleAddSnippet = () => {
        axios.post('http://localhost:3001/snippets', {
            title: snippet.title,
            description: snippet.description,
            tag: snippet.tag
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
            <input className='snip-description' type='text' name='title' placeholder='Enter snippet title' onChange={(e) => handleTextChange(e)}/>
            <input className='snip-description' type='text' name='description' placeholder='Enter code snippet' onChange={(e) => handleTextChange(e)}/>
            <input className='snip-description' type='text' name='tag' placeholder='Enter snippet tag' onChange={(e) => handleTextChange(e)}/>
            <button className='add-btn' onClick={() => handleAddSnippet()}>Add Snippet</button>
        </div>
    )
}

export default AddSnippet;