
import React , {useState} from 'react';
import axios from 'axios';
import '../styles.css';

function UpdateSnippet() {

    const [snippet, setUpdatedSnippet] = useState({title: '', description: '', tag: '', id: ''})

    const handleUpdateSnippet = () => {
        axios.put('http://localhost:3001/update-snippet', {
            title: snippet.title,
            description: snippet.description,
            tag: snippet.tag,
            id: snippet.id
        }).then(response => {
            console.log(response.data)
        })
    };

    const handleTextChange = (e) => {
        setUpdatedSnippet({
            ...snippet,
            [e.target.name]: e.target.value
        })
    };

    return (
        <div className='add-snip'>
            <h3 className='snip-list'>Update Snippet</h3>
            <input className='snip-description' type='text' name='title' placeholder='Enter updated title' onChange={(e) => handleTextChange(e)}/>
            <input className='snip-description' type='text' name='description' placeholder='Enter updated code' onChange={(e) => handleTextChange(e)}/>
            <input className='snip-description' type='text' name='tag' placeholder='Enter updated tag' onChange={(e) => handleTextChange(e)}/>
            <input className='snip-description' type='text' name='id' placeholder='Enter snippet id to update' onChange={(e) => handleTextChange(e)}/>
            <button className='add-btn' onClick={() => handleUpdateSnippet()}>Update Snippet</button>
        </div>
    )
}

export default UpdateSnippet;