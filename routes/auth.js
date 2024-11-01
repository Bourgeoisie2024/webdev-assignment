// 1. We need to import our require packages such as express package
const express = require("express");
// 2. We also add some other variables such as registerUser, loginUser, logoutUser, and this will be from the authController
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/authController");
// 3.1 Set-up our router
const router = express.Router();

// 3.2 Configure routes

// 3.3 user registration
router.post("/register", registerUser);

// 3.4 user login
//router.post("/login", loginUser);

// 3.4 user logout
//router.get("/logout", logoutUser);

// finally we export this router
module.exports = router;
