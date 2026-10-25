const router = require("express").Router();
const { register, login, getUserData } = require("../controllers/UserController");
const protect = require("../middleware/Auth");
const { registerRules, loginRules } = require("../middleware/Validate");

router.post("/register", registerRules, register);
router.post("/login", loginRules, login);
router.get("/me", protect, getUserData);

module.exports = router;
