import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
	const nav = () => (
		<ul className="nav nav-tabs bg-light">
			<li className="nav-item">
				<Link className="nav-link" to="/">
					Home
				</Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link" to="/signup">
					Signup
				</Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link" to="/signin">
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

export default Layout;
