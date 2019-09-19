import React from 'react';
import Menu from './Menu';

function BaseLayout(props) {

    return (
        <div>
            <h1 className='snip-main'>Code Snippets</h1>
            <Menu/>
            <div>{props.children}</div>
        </div>
    )
}

export default BaseLayout; 