import axios from "axios";
import * as types from "../constants/AuthActionTypes";
import BASE_URL from "../constants/Routing";

export const signIn = (data) => (dispatch) => {
    console.log(data);
    axios.post(`${BASE_URL}/users/signin`, { email: data.email, password: data.password })
        .then(response => {
            console.log(response);

            localStorage.setItem("token", response.data.token);
            dispatch({
                type: types.SIGN_IN_SUCCESS,
                payload: response
            });
        })
        .catch(error => {
            console.log(error);
            dispatch({
                type: types.SIGN_IN_ERROR,
                payload: error
            });
        });
};

export const signOut = (data) => (dispatch) => {
    dispatch({
        type: types.SIGN_OUT_SUCCESS,
        payload: data
    });
};

export const signUp = (data) => (dispatch) => {
    dispatch({
        type: types.SIGN_UP_SUCCESS,
        payload: data
    });
};
