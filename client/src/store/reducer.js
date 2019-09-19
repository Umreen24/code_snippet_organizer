
const initialState = {
    snippets: []
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case 'SNIPPETS_LOADED':
            return {
                ...state,
                snippets: action.payload
            }
        default:
            return state
    }
}

export default reducer; 