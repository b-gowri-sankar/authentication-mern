const express = require("express");
const router = express("router");

//import controllers

const { read } = require("../controllers/user");

router.get("/user/:id", read);

module.exports = router;