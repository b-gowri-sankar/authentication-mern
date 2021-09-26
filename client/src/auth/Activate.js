import React from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt from "jsonwebtoken";

const Activate = ({ match }) => {
	const [values, setValues] = React.useState({
		name: "",
		token: "",
		show: true,
	});

	React.useEffect(() => {
		let token = match.params.token;
		let { name } = jwt.decode(token);
		setValues({ ...values, token: token, name });
	}, []);

	const onclickHandler = () => {
		axios({
			method: "POST",
			url: `${process.env.REACT_APP_API}/account-activation`,
			data: { token: values.token },
		})
			.then((response) => {
				console.log("Account activation successful");
				setValues({ ...values, show: false });
				toast.success(response.data.message);
			})
			.catch((err) => {
				console.log(err);
				toast.error(err?.response?.data?.error);
			});
	};

	return (
		<Layout>
			<div className="col-md-6 offset-md-3 text-center">
				<h1>Hey {values?.name}, Ready to Activate you account?</h1>
				<button className="btn btn-primary btn-lg" onClick={onclickHandler}>
					Activate Your Account
				</button>
			</div>
		</Layout>
	);
};

export default Activate;
