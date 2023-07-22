var UserModels = require("../models/UserModel.js");
var mongoose = require("mongoose");
const Bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const passport = require("../helpers/passport.js");

exports.post_user = async (req, res) => {
  
  const User = UserModels.User;
  const { error } =  UserModels.validateUser().validate(req.body)
  if (error) {
    return res.status(400).send({ error:error.details[0].message})
  }
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });
  try {
    const userNameCheck = await User.findOne({ username: user.username });
    if (userNameCheck) {
      return res
        .status(400)
        .send({ error:"Username already exists"});
    }
    const emailCheck = await User.findOne({ email: user.email });
    if (emailCheck) {
      return res
        .status(400)
        .send({ error:"Email already exists"});
    }
    
    if (user.password.length < 5 || !user.password) {
      res.status(400).send({ error:"Password Length Too Short"});
    } else {
      user.password = Bcrypt.hashSync(user.password, 10);
      await user.save();
      delete user._doc.password;
      res.send(user);
    }
  } catch (err) {
    res.status(400).send({ error:err.toString()});
  }
};

exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const { User } = UserModels;
  const jwt_secret = process.env.JWT_SECRET;
  User.findOne({ email :email})
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "Incorrect Password or Email" });
      }

      Bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          const payload = { id: user.id };
          const token = jwt.sign(payload, jwt_secret);
          res.json({ token });
        } else {
          return res.status(400).json({ error: "Incorrect Password or Email"});
        }
      });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.toString()});
    });
};

exports.profile = (req, res) => {
  res.json({
    id: req.user.id,
  });
};
