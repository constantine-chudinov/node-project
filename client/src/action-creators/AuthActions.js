import axios from "axios";
import * as types from "../constants/AuthActionTypes";
import BASE_URL from "../constants/Routing";

export const signIn = (data) => (dispatch) => {
    axios.post(`${BASE_URL}/users/signin`, { email: data.email, password: data.password });
    dispatch({
        type: types.SIGN_IN
    });
};

export const signOut = (data) => (dispatch) => {
    dispatch({
        type: types.SIGN_OUT,
        payload: data
    });
};

export const signUp = (data) => (dispatch) => {
    dispatch({
        type: types.SIGN_UP,
        payload: data
    });
};
