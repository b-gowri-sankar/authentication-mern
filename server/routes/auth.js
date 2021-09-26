const express = require("express");
const { signup, accountActivation } = require("../controllers/auth");
const router = express.Router();

//import validators
const { userSignupValidator } = require("../validators/auth");
const { runValidation } = require("../validators/index");

router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/account-activation", accountActivation);

module.exports = router;
