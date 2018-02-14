import React, { PureComponent } from "react";

export default class Registration extends PureComponent {
    render() {
        return (
            <form>
                <fieldset className="form-group">
                    <label htmlFor="email">Email</label>
                    <input id="email" className="form-control" />
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="login">Login</label>
                    <input id="login" className="form-control" />
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="password">Password</label>
                    <input id="password" className="form-control" />
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="retypePassword">Re-type password</label>
                    <input id="retypePassword" className="form-control" />
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" className="form-control" />
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" className="form-control" />
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="country">Country</label>
                    <input id="country" className="form-control" />
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="company">Company</label>
                    <input id="company" className="form-control" />
                </fieldset>
                <button className="btn btn-primary">Register</button>
            </form>
        );
    }
}
