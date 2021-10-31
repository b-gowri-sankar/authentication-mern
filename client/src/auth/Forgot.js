import React from "react";
import Layout from "../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Forgot = ({ history }) => {
	const [formData, setFormData] = React.useState({
		email: "",
		buttonText: "Request Password reset link",
	});

	const onFormControlChanger = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const onClickSubmit = (e) => {
		e.preventDefault();
		setFormData({ ...formData, buttonText: "Submitting" });
		axios({
			method: "PUT",
			url: `${process.env.REACT_APP_API}/forgot-password`,
			data: {
				email: formData.email,
			},
		})
			.then((response) => {
				console.log("Forgot Password  success", response);
				toast.success(response.data.message);
				setFormData({ ...formData, buttonText: "Requested" });
			})
			.catch((err) => {
				console.error("Forgot Password Error", err?.response?.data);
				setFormData({ ...formData, buttonText: "Request Password reset link" });
				toast.error(err.response.data.error);
			});
	};

	const passwordForgotForm = () => (
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
			{/* <div className="form-group">
				<label className="text-muted">Password</label>
				<input
					name="password"
					value={formData.password}
					type="password"
					className="form-control"
					onChange={onFormControlChanger}
				/>
			</div> */}
			<div>
				<button className="btn btn-primary mt-2" type="submit">
					{formData.buttonText}
				</button>
			</div>
		</form>
	);

	return (
		<Layout>
			<div className="col-md-6 offset-md-3">
				<ToastContainer />

				<h1 className="p-5 text-center">Forgot Password</h1>
				{passwordForgotForm()}
			</div>
		</Layout>
	);
};

export default Forgot;
