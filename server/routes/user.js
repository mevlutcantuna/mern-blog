const express = require("express");
const { login, signup, getUser } = require("../controllers/user");

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/user", getUser);

module.exports = router;
