const initialState = {
    action: '',
    loading: false,
    error: {},
    areas: {}
}

export default function areaReducer(state = initialState, action) {
    switch (action.type) {
        // Create area
        case 'area/createRequest':
            return {
                ...state,
                action: action.type,
                loading: true
            };
        case 'area/createSuccess':
            return {
                ...state,
                action: action.type,
                loading: false,
                error: {}
            };
        case 'area/createFailure':
            return {
                ...state,
                action: action.type,
                loading: false,
                error: action.error
            };
        // Get areas
        case 'area/getRequest':
            return {
                ...state,
                action: action.type,
                loading: true
            };
        case 'area/getSuccess':
            return {
                ...state,
                action: action.type,
                loading: false,
                areas: { ...action.areas },
                error: {}
            };
        case 'area/getFailure':
            return {
                ...state,
                action: action.type,
                loading: false,
                error: action.error,
            };
        // Remove areas
        case 'area/removeRequest':
            return {
                ...state,
                action: action.type,
                loading: true
            };
        case 'area/removeSuccess':
            return {
                ...state,
                action: action.type,
                loading: false,
                areas: Object.fromEntries(Object.entries(state.areas).filter(([key, value]) => value.id != Number(action.areas))),
                error: {}
            };
        case 'area/removeFailure':
            return {
                ...state,
                action: action.type,
                loading: false,
                error: action.error,
            };
        // Clear redux
         case 'area/clearSuccess':
            return {
                ...state,
                action: action.type
            };
        default:
            return state;
    }
}