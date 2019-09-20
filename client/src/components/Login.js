import React, {useState} from 'react';
import axios from 'axios';
import {setAuthenticationHeader} from '../utils/authenticate';
import '../styles.css';
import {connect} from 'react-redux';

function Login(props) {

    const [user, setUser] = useState({username: '', password: ''})

    const handleLogin = () => {
        axios.post('http://localhost:3001/login', {
            username: user.username,
            password: user.password
        }).then(response => {
            const token = response.data.token
            localStorage.setItem('jwt', token)
            setAuthenticationHeader(token)
            console.log(response.data)
            props.onAuthenticated(token)
        })
    };

    const handleTextChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    };

    return (
        <div className='add-snip'>
        <h3 className='snip-list'>User Login</h3>
        <input className='snip-description' type='text' name='username' placeholder='Enter username' onChange={(e) => handleTextChange(e)}/>
        <input className='snip-description' type='password' name='password' placeholder='Enter password' onChange={(e) => handleTextChange(e)}/>
        <button className='add-btn' onClick={() => handleLogin()}>Login</button>
    </div>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthenticated: (token) => dispatch({
            type: 'ON_AUTHENTICATED', token: token
        })
    }
};

export default connect(null, mapDispatchToProps)(Login);