import React from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Signup = () => {
	const [formData, setFormData] = React.useState({
		name: "",
		email: "",
		password: "",
		buttonText: "Submit",
	});

	const onFormControlChanger = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const onClickSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
	};

	const signupForm = () => (
		<form onSubmit={onClickSubmit}>
			<div className="form-group">
				<label className="text-muted">Name</label>
				<input
					name="name"
					value={formData.name}
					type="text"
					className="form-control"
					onChange={onFormControlChanger}
				/>
			</div>
			<div className="form-group">
				<label className="text-muted">email</label>
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
				{signupForm()}
			</div>
		</Layout>
	);
};

export default Signup;
