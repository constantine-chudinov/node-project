import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "!style-loader!css-loader!bootstrap/dist/css/bootstrap.css";
import "./include/bootstrap";
import reducers from "./reducers/reducers";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Layout from "./components/Layout/Layout";
import thunk from "redux-thunk";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);


render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <Router>
            <Layout>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Registration} />
            </Layout>
        </Router>
    </Provider>, document.getElementById("container"));
