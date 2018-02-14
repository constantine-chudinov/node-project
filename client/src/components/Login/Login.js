import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../../action-creators/AuthActions";

class Login extends PureComponent {

    constructor() {
        super();
        this.handleSubmitBound = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        this.props.authActions.signIn({
            email: formData.get("email"),
            password: formData.get("password")
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmitBound}>
                <fieldset className="form-group">
                    <label htmlFor="email">Login</label>
                    <input id="email" className="form-control" />
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="password">Password</label>
                    <input id="password" className="form-control" />
                </fieldset>
                <button action="submit" className="btn btn-primary">Sign In</button>
            </form>
        );
    }
}


function mapStateToProps(state) {
    return { authProperties: state.authProperties };
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);

export { Login as PureLogin };
