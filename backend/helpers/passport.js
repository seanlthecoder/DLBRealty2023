const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const UserModle = require("../models/UserModel.js");
// const config = require('../config/config');
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwt_secret,
};

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
