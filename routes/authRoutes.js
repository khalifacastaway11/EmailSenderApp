//routes.authRoutes.js
const express = require("express");
const {
  register,
  login,
  logout,
  refreshAccessToken,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login)
router.post("/logout", logout)
//router.post('/token/refresh', refreshAccessToken)
//router.post("/refresh", refreshToken);
module.exports=router