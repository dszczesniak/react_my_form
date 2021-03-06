export default function (state = {}, action) {
    switch (action.type) {
        case 'ADD_FIRST_COMPONENT':
            return {
                ...state,
                // forms:[...state.forms, action.payload]
                forms:
                    state.forms ? state.forms.concat(action.payload) : action.payload
            }
        case 'ADD_CHILD_COMPONENT':
            return {
                ...state,
                forms: state.forms.concat(action.payload)
            }
        case 'DELETE_FORM':
            return {
                ...state,
                forms: state.forms.map(
                    (form, i) => i === action.id ? { ...form, childs: action.newChildren } : form
                )

            };
        case 'ADD_NEW_DATA_FORM':
            return {
                ...state,
                forms: state.forms.map(
                    (form, i) => i === action.id ? { ...form, dataForm: action.payload } : form
                )
            }
        case 'ADD_CHILD_TO_TREE':
            return {
                ...state,
                forms: state.forms.map(
                    (form, i) => i === action.toSearchId ? { ...form, childs: action.newChilds } : form
                )
            }
        default:
            return state;
    }
}