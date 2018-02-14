import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

export default class Header extends PureComponent {
    render() {
        return (
            <nav className="navbar navbar-toggleable-lg navbar-light bg-faded">
                <ul className="nav justify-content-end">
                    <li className="nav-item">
                        <Link className="nav-link" to="login">Sign In</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="register">Sign Up</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="pricing">Pricing</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}
