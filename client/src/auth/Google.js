import React from "react";
import axios from "axios";
import GoogleLogin from "react-google-login";

const Google = ({ informParent }) => {
	const responseGoogle = (response) => {
		axios({
			method: "POST",
			url: `${process.env.REACT_APP_API}/google-login`,
			data: { idToken: response.tokenId },
		})
			.then((response) => {
				console.log("Google Signin Success", response);
				informParent(response);
			})
			.catch((err) => console.error(err.response));
	};

	return (
		<div className="pb-3" style={{ width: "100%" }}>
			<GoogleLogin
				clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				render={(renderProps) => {
					return (
						<button
							onClick={renderProps.onClick}
							disabled={renderProps.disabled}
							className="btn btn-danger btn-lg btn-block"
						>
							<i className="fab fa-google px-2"></i>Login with Google
						</button>
					);
				}}
				cookiePolicy={"single_host_origin"}
			/>
		</div>
	);
};

export default Google;
