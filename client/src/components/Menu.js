import React from 'react';
import { NavLink } from 'react-router-dom';

function Menu() {

    return( 
        <ul className='menu'>
            <li><NavLink to="/">Add Snippet</NavLink></li>
            <li><NavLink to="/snippets">View Snippets</NavLink></li>
            <li><NavLink to="/update-snippet">Update Snippet</NavLink></li>
        </ul>
    )
}

export default Menu;