import cookie from "js-cookie";

//set to cookie

export const setCookie = (key, value) => {
	if (window !== undefined) {
		cookie.set(key, value, {
			expires: 1,
		});
	}
};

//remove from cookie
export const removeCookie = (key) => {
	if (window !== undefined) {
		cookie.remove(key, {
			expires: 1,
		});
	}
};

//get from cookie such as stored token

export const getCookie = (key, value) => {
	if (window !== undefined) {
		return cookie.get(key);
	}
};

//will be useful wehn we need to make request to server with token

//set in localstorage
export const setLocalStorage = (key, value) => {
	if (window !== undefined) {
		localStorage.setItem(key, JSON.stringify(value));
	}
};

//remove from localstorage

export const removeLocalStorage = (key) => {
	if (window !== undefined) {
		localStorage.removeItem(key);
	}
};

//authenticate user by passing data to cookie and localstorage during signin

export const authenticate = (response, next) => {
	setCookie("token", response.data.token);
	setLocalStorage("user", response.data.user);
	next();
};

//access userinfo from localstorage

export const isAuth = (key) => {
	if (window !== undefined) {
		const cookieCheck = getCookie("token");
		if (cookieCheck) {
			if (localStorage.getItem("user")) {
				return JSON.parse(localStorage.getItem("user"));
			} else {
				return false;
			}
		} else {
			return false;
		}
	} else return false;
};

export const signOut = (next) => {
	removeCookie("token");
	removeLocalStorage("user");
	next();
};

export const updateUser = (response, next) => {
	console.log("UPDATE USER IN LOCAL STORAGE");
	if (typeof window !== undefined) {
		let auth = JSON.parse(localStorage.getItem("user"));
		auth = response.data;
		localStorage.setItem("user", JSON.stringify(auth));
	}
	next();
};
