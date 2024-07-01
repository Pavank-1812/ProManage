const express = require("express");
const router = express.Router();
const { register, login, updateUser } = require("../Controllers/userController");
const auth = require("../Middlewares/userMiddleware");

router.post("/register", register);
router.post("/login", login);
router.put("/update", auth, updateUser);

module.exports = router;