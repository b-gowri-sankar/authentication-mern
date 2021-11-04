import React from "react";
import axios from "axios";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

const Facebook = ({ informParent }) => {
	const responseFacebook = (response) => {
		console.log(response);
		// axios({
		// 	method: "POST",
		// 	url: `${process.env.REACT_APP_API}/google-login`,
		// 	data: { idToken: response.tokenId },
		// })
		// 	.then((response) => {
		// 		console.log("Google Signin Success", response);
		// 		informParent(response);
		// 	})
		// 	.catch((err) => console.error(err.response));
	};

	return (
		<div className="pb-3">
			<FacebookLogin
				appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
				autoLoad={false}
				callback={responseFacebook}
				render={(renderProps) => (
					<button
						onClick={renderProps.onClick}
						disabled={renderProps.disabled}
						className="btn btn-primary btn-lg btn-block"
					>
						<i className="fab fa-facebook px-2"></i>
						Login with Facebook
					</button>
				)}
			/>
		</div>
	);
};

export default Facebook;