const express = require("express");
const {
  authRegister,
  authLogin,
  authHome,
} = require("../controllers/auth.controller");

const router = express.Router();

router.get("/", authHome);
router.post("/register", authRegister);
router.post("/login", authLogin);

module.exports = router;
