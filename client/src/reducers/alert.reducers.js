const initialState = {
    type: '',
    message: ''
}

export default function alertReducer(state = initialState, action) {
    switch (action.type) {
        case 'alert/success':
            return {
                ...state,
                type: 'success',
                message: action.message
            };
        case 'alert/error':
            return {
                ...state,
                type: 'error',
                message: action.message
            };
        case 'alert/clear':
            return initialState;
        default:
            return state;
    }
}