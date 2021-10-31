import React from "react";
import Layout from "../core/Layout";
import jwt from "jsonwebtoken";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Reset = ({ history, match }) => {
	const [formData, setFormData] = React.useState({
		name: "",
		token: "",
		newPassword: "",
		buttonText: "Reset Password",
	});

	React.useEffect(() => {
		let token = match.params.token;
		let { name } = jwt.decode(token);
		if (token) {
			setFormData({ ...formData, name, token });
		}
	}, []);

	const onFormControlChanger = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const onClickSubmit = (e) => {
		e.preventDefault();
		setFormData({ ...formData, buttonText: "Submitting" });
		axios({
			method: "PUT",
			url: `${process.env.REACT_APP_API}/reset-password`,
			data: {
				newPassword: formData?.newPassword,
				resetPasswordLink: formData?.token,
			},
		})
			.then((response) => {
				console.log("Reset Password  success", response);
				toast.success(response.data.message);
				setFormData({ ...formData, buttonText: "Done" });
			})
			.catch((err) => {
				console.error("Forgot Password Error", err?.response?.data);
				setFormData({ ...formData, buttonText: "Reset Password" });
				toast.error(err.response.data.error);
			});
	};

	const resetPasswordForm = () => (
		<form onSubmit={onClickSubmit}>
			{/* <div className="form-group">
				<label className="text-muted">Email</label>
				<input
					name="email"
					value={formData.email}
					type="email"
					className="form-control"
					onChange={onFormControlChanger}
				/>
			</div> */}
			<div className="form-group">
				<label className="text-muted">Password</label>
				<input
					name="newPassword"
					value={formData.password}
					type="password"
					className="form-control"
					onChange={onFormControlChanger}
					placeholder="Type new password"
					required
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
			<div className="col-md-6 offset-md-3">
				<ToastContainer />

				<h1 className="p-5 text-center">
					Hey {formData?.name}, Type your new password
				</h1>
				{resetPasswordForm()}
			</div>
		</Layout>
	);
};

export default Reset;
