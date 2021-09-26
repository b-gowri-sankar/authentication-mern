import React from "react";
import { Link, withRouter } from "react-router-dom";

const Layout = ({ children, match, history }) => {
	const isActive = (path) => {
		if (match.path === path) {
			return { color: "#000" };
		} else {
			return { color: "#0d6efd" };
		}
	};

	const nav = () => (
		<ul className="nav nav-tabs bg-light">
			<li className="nav-item">
				<Link className="nav-link" to="/" style={isActive("/")}>
					Home
				</Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link" to="/signup" style={isActive("/signup")}>
					Signup
				</Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link" to="/signin" style={isActive("/signin")}>
					Signin
				</Link>
			</li>
		</ul>
	);

	return (
		<React.Fragment>
			{nav()}
			<div className="container">{children}</div>
		</React.Fragment>
	);
};

export default withRouter(Layout);
