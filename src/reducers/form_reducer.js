export default function (state = {}, action) {
    switch (action.type) {
        case 'SET_CLEAN_STATE':
            return { ...state, forms: action.payload }
        case 'ADD_FIRST_COMPONENT':
            return {
                ...state,
                // forms:[...state.forms, action.payload]
                forms: state.forms.concat(action.payload)
            }
        case 'ADD_CHILD_COMPONENT':
            return {
                ...state,
                forms: state.forms.concat(action.payload)
            }
        // case 'DELETE_FORM':
        //     return {
        //         ...state,
        //         forms: action.payload
        //     }
        case 'DELETE_FORM':
            return {
                ...state,
                forms: state.forms.map(form => form)
            };
        default:
            return state;
    }
}