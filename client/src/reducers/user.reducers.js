const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    action: '',
    loading: false,
    error: {},
    userInfos: user ?
    {
        ...user,
        loggedIn: true
    } : {
        loggedIn: false
    },
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        // Register user
        case 'user/registerRequest':
            return {
                ...state,
                action: action.type,
                loading: true
            };
        case 'user/registerSuccess':
            return {
                ...state,
                action: action.type,
                loading: false,
                error: {},
                userInfos: { ...action.user, loggedIn: true }
            };
        case 'user/registerFailure':
            return {
                ...state,
                action: action.type,
                loading: false,
                error: action.error,
                user: {}
            };
        // Login user
        case 'user/loginRequest':
            return {
                ...state,
                action: action.type,
                loading: true
            };
        case 'user/loginSuccess':
            return {
                ...state,
                action: action.type,
                loading: false,
                error: {},
                userInfos: { ...action.user, loggedIn: true }
            };
        case 'user/loginFailure':
            return {
                ...state,
                action: action.type,
                loading: false,
                error: action.error,
                user: {}
            };
        // Logout User
        case 'user/logoutRequest':
            return {
                ...state,
                action: action.type,
                loading: true
            };
        case 'user/logoutSuccess':
            return {
                ...state,
                action: action.type,
                loading: false,
                error: {},
                userInfos: { loggedIn: false }
            };
        case 'user/logoutFailure':
            return {
                ...state,
                action: action.type,
                loading: false,
                error: action.error,
            };
        // Get User
        case 'user/getRequest':
            return {
                ...state,
                action: action.type,
                loading: true
            };
        case 'user/getSuccess':
            return {
                ...state,
                action: action.type,
                loading: false,
                error: {},
                userInfos: { ...action.user, loggedIn: true }
            };
        case 'user/getFailure':
            return {
                ...state,
                action: action.type,
                loading: false,
                error: action.error,
            };
        // Create user
        case 'user/createRequest':
            return {
                ...state,
                action: action.type,
                loading: true
            };
        case 'user/createSuccess':
            return {
                ...state,
                action: action.type,
                loading: false,
                error: {}
            };
        case 'user/createFailure':
            return {
                ...state,
                action: action.type,
                loading: false,
                error: action.error
            };
        // Clear redux
         case 'user/clearSuccess':
            return {
                ...state,
                action: action.type
            };
        default:
            return state;
    }
}