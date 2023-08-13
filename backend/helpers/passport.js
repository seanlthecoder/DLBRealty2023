const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const UserModle = require("../models/UserModel.js");
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwt_secret,
};
/* 
strategy is an instance of the JwtStrategy class for
handling user authentication and authorization for 
protected routes. 
*/
const strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
  const { User } = UserModle;
  User.findById(jwt_payload.id)
    .then((user) => {
      if (user) {
        next(null, user);
      } else {
        next(null, false);
      }
    })
    .catch((err) => {
      next(err, false);
    });
});

passport.use(strategy);

module.exports = passport;
