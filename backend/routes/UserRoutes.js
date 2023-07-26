var express = require("express");
var router = express.Router();
const passport = require('../helpers/passport');
const auth = require("../middlewares/auth.js");
// Require controller modules.
var user_controller = require("../controllers/UserController.js");


router.post("/api/user", user_controller.post_user);
router.post("/api/user/login", user_controller.login);
router.get("/api/user/profile", auth, user_controller.profile);


module.exports = router;