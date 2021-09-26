import React from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SignIn = () => {
	const [formData, setFormData] = React.useState({
		email: "",
		password: "",
		buttonText: "Submit",
	});

	const onFormControlChanger = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
	console.log(process.env.REACT_APP_API);
	const onClickSubmit = (e) => {
		e.preventDefault();
		setFormData({ ...formData, buttonText: "Submitting" });
		axios({
			method: "POST",
			url: `${process.env.REACT_APP_API}/signin`,
			data: {
				email: formData.email,
				password: formData.password,
			},
		})
			.then((response) => {
				console.log("Login success", response);
				//save the response which contains the user and token in localstorate/cookie
				setFormData({
					email: "",
					password: "",
					buttonText: "Submit",
				});
				toast.success(`${response.data.user.name}, Welcome back`);
			})
			.catch((err) => {
				console.error("Signup Error", err?.response?.data);
				setFormData({ ...formData, buttonText: "Submit" });
				toast.error(err.response.data.error);
			});
	};

	const signinForm = () => (
		<form onSubmit={onClickSubmit}>
			<div className="form-group">
				<label className="text-muted">Email</label>
				<input
					name="email"
					value={formData.email}
					type="email"
					className="form-control"
					onChange={onFormControlChanger}
				/>
			</div>
			<div className="form-group">
				<label className="text-muted">Password</label>
				<input
					name="password"
					value={formData.password}
					type="password"
					className="form-control"
					onChange={onFormControlChanger}
				/>
			</div>
			<div>
				<button className="btn btn-primary mt-2" type="submit">
					{formData.buttonText}
				</button>
			</div>
		</form>
	);

	return (
		<Layout>
			<div className="col-d-6 offset-md-3">
				<ToastContainer />
				<h1 className="p-5 text-center">Signup</h1>
				{signinForm()}
			</div>
		</Layout>
	);
};

export default SignIn;
