const express = require("express");
const router = express.Router();
const { register, login, logout,updateUser } = require("../Controllers/userController");
const auth = require("../Middlewares/userMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update", auth, updateUser);

module.exports = router;