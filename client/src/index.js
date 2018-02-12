import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import "jquery";
import "bootstrap/dist/js/bootstrap";
import { Router, Route, IndexRoute } from "react-router";
import createHistory from "history/createBrowserHistory";
import reducers from "./reducers/reducers";
import Layout from "./components/Layout/Layout";
// import styles from "./styles.pcss";

const createStoreWithMiddleware = applyMiddleware()(createStore);

render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <Router history={createHistory()}>
            <Route path="/" component={Layout} />
        </Router>
    </Provider>, document.getElementById("container"));
