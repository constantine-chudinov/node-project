import React, { PureComponent } from "react";

export default class Header extends PureComponent {
    render() {
        return (
            <nav className="navbar navbar-light">
                <ul className="nav navbar-nav">
                    <li className="nav-item">
                        Sign In
                    </li>
                </ul>
            </nav>);
    }
}
