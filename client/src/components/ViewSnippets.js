
import React, {useEffect} from 'react';
import {connect} from 'react-redux';

function ViewSnippets(props) {

    useEffect(() => {
        fetchSnippets()
    }, [])

    const fetchSnippets = () => {
        fetch('http://localhost:3001/snippets')
        .then(response => response.json())
        .then(json => {
            props.onSnippetsLoaded(json.snippets)
            console.log(json.snippets)
        })
    }

    return <div>
                {props.snippet.map(snip => {
                return <div key={snip._id}>
                            <h3>{snip.title}</h3>
                            {snip.description}
                        </div>
                })}
            </div>
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSnippetsLoaded: (snippets) => dispatch({type: 'SNIPPETS_LOADED', payload: snippets})
    }
}

const mapStateToProps = (state) => {
    return {
        snippet: state.snippets
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewSnippets);