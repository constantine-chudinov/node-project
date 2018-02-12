import * as types from "../constants/AuthActionTypes";
const initialState = {};

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {

        case types.SIGN_IN:
            return Object.assign({}, state);

        case types.SIGN_OUT:
            return Object.assign({}, state);

        case types.SIGN_UP:
            return Object.assign({}, state);

        default:
            return state;
    }
};

export default reducer;
