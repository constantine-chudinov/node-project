import * as types from "../constants/AuthActionTypes";
const initialState = {};

const reducer = (state = initialState, action = {}) => {
    const result = {};
    switch (action.type) {

        case types.SIGN_IN_SUCCESS:
            console.log("!!!!");
            result.authenticated = true;
            return Object.assign({}, state, result);

        case types.SIGN_OUT_SUCCESS:
            result.authenticated = false;
            return Object.assign({}, state, result);

        case types.SIGN_UP_SUCCESS:
            result.authenticated = true;
            return Object.assign({}, state, result);

        default:
            return state;
    }
};

export default reducer;
