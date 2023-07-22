var express = require("express");
var router = express.Router();
const passport = require('../helpers/passport');

// Require controller modules.
var user_controller = require("../controllers/UserController.js");


router.post("/api/user", user_controller.post_user);
router.post("/api/user/login", user_controller.login);

router.get("/api/user",  passport.authenticate('jwt', { session: false }), user_controller.profile);


module.exports = router;