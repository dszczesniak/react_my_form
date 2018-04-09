export default function (state = {}, action) {
    switch (action.type) {
        // case 'USER_LOGIN':
        //     return {...state, login:action.payload}
        // case 'USER_AUTH':
        //     return {...state, login:action.payload}
        // case 'GET_USER_POSTS':
        //     return {...state, userPosts: action.payload}
        // case "GET_USERS":
        //     return {...state, users: action.payload}
        // case "USER_REGISTER":
        //     return {
        //         ...state,
        //         register: action.payload.success,
        //         users:action.payload.users
        //     }

        case 'SET_CLEAN_STATE':
            return { ...state, forms: action.payload }
        case 'ADD_FIRST_COMPONENT':
            return {
                ...state,
                // forms:[...state.forms, action.payload]
                forms: state.forms.concat(action.payload)

            }
        default:
            return state;
    }
}