import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Header from "../Header/Header";
import * as authActions from "../../action-creators/AuthActions";

class LayoutPage extends PureComponent {
    render() {
        return (
            <div>
                <Header />
                {this.props.children}
            </div>);
    }
}

function mapStateToProps(state) {
    return {
        authProperties: state.authProperties
    };
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LayoutPage));
