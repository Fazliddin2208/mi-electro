const initialState = 'salom';

const fetchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'EXECUTE':
            return action.value;
        case 'NOT_EXECUTE':
            return state !== action.value;
        default:
            return state;
    }
};

export default fetchReducer;
