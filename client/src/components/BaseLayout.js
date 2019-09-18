import React from 'react';
import Menu from './Menu';

function BaseLayout(props) {

    return (
        <div>
            <Menu/>
            <h1>Code Snippets</h1>
            <div>{props.children}</div>
        </div>
    )
}

export default BaseLayout; 