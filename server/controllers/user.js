const User = require("../models/User");

exports.read = (req, res) => {
	const userId = req.params.id;
	User.findById({ _id: userId }).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "User not found",
			});
		}
		user.hashed_password = undefined;
		user.salt = undefined;
		res.status(200).json(user);
	});
};
