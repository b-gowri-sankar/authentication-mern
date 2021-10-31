const express = require("express");
const router = express("router");

//import controllers
const { requireSignin, adminMiddleWare } = require("../controllers/auth");
const { read, update } = require("../controllers/user");

router.get("/user/:id", requireSignin, read);
router.put("/user/update", requireSignin, update);
router.put("/admin/update", requireSignin, adminMiddleWare, update);

module.exports = router;
