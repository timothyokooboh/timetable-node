const router = require("express").Router()

const {createUser} = require("../controllers/auth/RegisterController")
const {loginUser} = require("../controllers/auth/LoginController")

// API endpoint for sign up
router.post("/register", createUser)

// API endpoint for log in
router.post("/login", loginUser)

module.exports = router