import React from 'react';
import { NavLink } from 'react-router-dom';

function Menu() {

    return( 
        <ul>
            <li><NavLink to="/">Add Snippet</NavLink></li>
            <li><NavLink to="/snippets">View Snippet</NavLink></li>
        </ul>
    )
}

export default Menu;