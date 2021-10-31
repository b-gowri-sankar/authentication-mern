import React from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "./Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
	authenticate,
	getCookie,
	isAuth,
	signOut,
	updateUser,
} from "../auth/helpers";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
const Private = ({ history }) => {
	const [formData, setFormData] = React.useState({
		role: "",
		name: "",
		email: "",
		password: "",
		buttonText: "Submit",
	});

	const token = getCookie("token");

	const loadProfile = () => {
		axios({
			method: "GET",
			url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				console.log("PROFILE UPDATE", response);
				setFormData({ ...formData, ...response.data, password: "" });
			})
			.catch((err) => {
				console.error(err.response.data.error);
				if (err.response.status === 401) {
					signOut(() => {
						history.push("/");
					});
				}
			});
	};

	React.useEffect(() => {
		loadProfile();
	}, []);

	const onFormControlChanger = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	console.log(formData);
	const onClickSubmit = (e) => {
		e.preventDefault();
		setFormData({ ...formData, buttonText: "Submitting" });
		axios({
			method: "PUT",
			url: `${process.env.REACT_APP_API}/user/update`,
			data: {
				name: formData.name,
				password: formData.password,
			},
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				console.log("PROFILE UPDATE success", response);
				updateUser(response, () => {
					setFormData({
						...response.data,
						buttonText: "Submit",
						password: "",
					});
					toast.success("PROFILE UPDATE SUCCESSFULLY");
				});
			})
			.catch((err) => {
				console.error("PROFILE UPDATE Error", err?.response?.data?.error);
				setFormData({ ...formData, buttonText: "Submit" });
				toast.error(err.response.data.error);
			});
	};

	const updateForm = () => (
		<form onSubmit={onClickSubmit}>
			<div className="form-group">
				<label className="text-muted">Role</label>
				<input
					value={formData?.role}
					type="text"
					className="form-control"
					readOnly
				/>
			</div>
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
				<label className="text-muted">Email</label>
				<input
					name="email"
					value={formData.email}
					type="email"
					className="form-control"
					readOnly
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
			<div style={{ width: "60%", margin: "0 auto" }}>
				<ToastContainer />
				<h1 className="p-5 text-center">Update Profile</h1>

				{updateForm()}
			</div>
		</Layout>
	);
};

export default Private;
