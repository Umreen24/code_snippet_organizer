
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import '../styles.css';

function ViewSnippets(props) {

    useEffect(() => {
        fetchSnippets()
    }, [props._id])

    const fetchSnippets = () => {
        fetch('http://localhost:3001/snippets')
        .then(response => response.json())
        .then(json => {
            props.onSnippetsLoaded(json.snippets)
            console.log(json.snippets)
        })
    }

    return <div>
                <h2 className='snip-sub'>Community Snippets</h2>
                <div className='snip-list'>
                    {props.snippet.map(snip => {
                    return <div className='snips' key={snip._id}>
                                <h3>{snip.title}</h3>
                                <span>{snip.description}</span>
                            </div>
                    })}
                </div>
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