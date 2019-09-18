import React from 'react';

function BaseLayout(props) {

    return (
        <div>
            <h1>Code Snippets</h1>
            <div>{props.children}</div>
        </div>
    )
}

export default BaseLayout; 