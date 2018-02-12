import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import authReducer from "./AuthReducer";

// Combine all our reducers together
const rootReducer = combineReducers({
    authReducer,
    routing: routerReducer
});

export default rootReducer;
