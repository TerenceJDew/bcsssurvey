const Reducer = (state, action) => {
    switch (action.type) {

        case 'ADD_ANSWER':
            return {
                ...state,
                ...action.payload
            };
        
        default:
            return state;
    }
};

export default Reducer