const initialState = 'Tashkent'

const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_LOCATION':
            return action.city;
        case 'REMOVE_LOCATION':
            return state !== action.city;
        default:
            return state;
    }
}

export default locationReducer;