import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "../App";
import SignIn from "../auth/SignIn";
import Signup from "../auth/Signup";
import Activate from "../auth/Activate";
import Private from "./Private";
import PrivateRoute from "../auth/PrivateRoute";
import Admin from "./Admin";
import AdminRoute from "../auth/AdminRoute";

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={App} />
				<Route path="/signup" exact component={Signup} />
				<Route path="/signin" exact component={SignIn} />
				<Route path="/auth/activate/:token" exact component={Activate} />
				<PrivateRoute path="/private" exact component={Private} />
				<AdminRoute path="/admin" exact component={Admin} />
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
