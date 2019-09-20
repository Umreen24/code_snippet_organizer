
import React, {useState} from 'react';
import axios from 'axios';
import '../styles.css';

function Register() {

    const [user, setUser] = useState({username: '', password: ''})

    const handleRegister = () => {
        axios.post('http://localhost:3001/register', {
            username: user.username,
            password: user.password
        }).then(response => {
            console.log(response.data)
        })
    };

    const handleTextChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    };

    return(
        <div className='add-snip'>
        <h3 className='snip-list'>New User Registration</h3>
        <input className='snip-description' type='text' name='username' placeholder='Enter a username' onChange={(e) => handleTextChange(e)}/>
        <input className='snip-description' type='password' name='password' placeholder='Enter a password' onChange={(e) => handleTextChange(e)}/>
        <button className='add-btn' onClick={() => handleRegister()}>Register</button>
    </div>
    )
};

export default Register;