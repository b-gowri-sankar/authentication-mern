import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuth, signOut } from "../auth/helpers";

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
			{isAuth() ? (
				<li className="nav-item">
					<span
						className="nav-link"
						style={{
							cursor: "pointer",
							textTransform: "capitalize",
							...isActive(isAuth().role === "admin" ? "/admin" : "/private"),
						}}
						onClick={() => {
							isAuth().role === "subscriber" && history.push("/private");
							isAuth().role === "admin" && history.push("/admin");
						}}
					>
						{isAuth()?.name}
					</span>
				</li>
			) : (
				<React.Fragment>
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
				</React.Fragment>
			)}
			{isAuth() && (
				<li className="nav-item">
					<span
						className="nav-link"
						style={{ cursor: "pointer", textTransform: "capitalize" }}
						onClick={() => {
							signOut(() => {
								history.push("/");
							});
						}}
					>
						Signout
					</span>
				</li>
			)}
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
