import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

function Menu(props) {

    const handleSignOut = () => {
        localStorage.removeItem('jwt')
        props.onSignOut()
    }

    return( 
        <ul className='menu'>
            <li><NavLink to="/register">Register Account</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/">View Snippets</NavLink></li>
            {props.authenticated ? <li><NavLink to="/">Add Snippet</NavLink></li>: null}
            {props.authenticated ? <li><NavLink to="/update-snippet">Update Snippet</NavLink></li>: null}
            { props.authenticated ? <li className="menu-list"><a onClick={() => handleSignOut()} href="#">Sign Out</a></li>: null}
        </ul>
    )
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSignOut: () => dispatch({type: 'SIGN_OUT'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);