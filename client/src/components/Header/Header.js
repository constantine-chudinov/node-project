import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends PureComponent {
    renderAuthLinks() {
        if (!this.props.authenticated) {
            return (<li className="nav-item">
                <Link className="nav-link" to="login">Sign In</Link>
            </li>);
        } else {
            return (<li className="nav-item">
                <Link className="nav-link" to="logout">Sign Out</Link>
            </li>);
        }
    }

    renderSignUpLink() {
        if (!this.props.authenticated) {
            return (<li className="nav-item">
                <Link className="nav-link" to="register">Sign Up</Link>
            </li>);
        } else {
            return null;
        }
    }


    render() {
        return (
            <nav className="navbar navbar-toggleable-lg navbar-light bg-faded">
                <ul className="nav justify-content-end">
                    {this.renderAuthLinks()}
                    {this.renderSignUpLink()}
                    <li className="nav-item">
                        <Link className="nav-link" to="pricing">Pricing</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    };
}
export default connect(mapStateToProps)(Header);
