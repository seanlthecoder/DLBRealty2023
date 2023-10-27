// require statements to import necessary modules and dependencies - ie UserModels, mongoose, Bcrypt, jsonwebtoken, dotenv, and passport.

var UserModels = require("../models/UserModel.js");
var mongoose = require("mongoose");
const Bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const passport = require("../helpers/passport.js");

exports.create_admin = async (req, res) => {
  const User = UserModels.User;

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    email: process.env.EMAIL,
    userType: "admin",
  });
  try {
    user.password = Bcrypt.hashSync(user.password, 10);
    await user.save();
    res.send("Successfully Created");
  } catch (err) {
    res.status(400).send({ error: err.toString() });
  }
};

/* controller that handles user registration. It is receiving
 a POST request with user information (username, password, and email) 
 in the request body. The function validates the input data using
  a schema defined in UserModels.validateUser() and then checks 
  if the username and email are not already taken in the database. 
  If all checks pass, the password is hashed using Bcrypt and the user data is saved in the database.
*/
exports.post_user = async (req, res) => {
  const User = UserModels.User;
  const { error } = UserModels.validateUser().validate(req.body);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
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
      return res.status(400).send({ error: "Username already exists" });
    }
    const emailCheck = await User.findOne({ email: user.email });
    if (emailCheck) {
      return res.status(400).send({ error: "Email already exists" });
    }

    if (user.password.length < 5 || !user.password) {
      res.status(400).send({ error: "Password Length Too Short" });
    } else {
      user.password = Bcrypt.hashSync(user.password, 10);
      await user.save();
      delete user._doc.password;
      res.send(user);
    }
  } catch (err) {
    res.status(400).send({ error: err.toString() });
  }
};

/* The login function is responsible for handling user login. When a user sends a POST 
request with their email and password, the function checks if there is a matching user 
with the provided email in the database. If a user is found, it verifies the password by
comparing the provided password with the stored hashed password (using Bcrypt). If the 
password is correct, the function generates a JSON Web Token (JWT) to authenticate the 
user and sends it back to the client. The JWT allows the user to access protected routes
 and resources on the server.
 */
exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const { User } = UserModels;
  const jwt_secret = process.env.JWT_SECRET;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "Incorrect Password or Email" });
      }

      Bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          const payload = { id: user.id };

          const token = jwt.sign(payload, jwt_secret);
          res.cookie("token", token);
          res.json({ token, userType: user.userType });
        } else {
          return res.status(400).json({ error: "Incorrect Password or Email" });
        }
      });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.toString() });
    });
};
/*
profile is responsible for handling the GET request to the /profile 
route and return the user data. In order to access this endpoint the
user has to have token that is valid to use this route. The token 
is sent in the request header. The function uses the verifyToken 
middleware to verify the token and get the user id from the payload. 
Then it uses the id to find the user in the database and return the 
user data. The password is removed from the user data before sending 
it back to the client.
*/
exports.profile = async (req, res) => {
  const id = req.id;
  const { User } = UserModels;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    delete user._doc.password;
    res.send(user);
  } catch (err) {
    res.status(400).send({ error: err.toString() });
  }
};

exports.get_users = async (req, res) => {
  const { User } = UserModels;
  try {
    const users = await User.find({   });
    if (!users) {
      return res.status(404).send({ error: "User not found" });
    }
    users.forEach((user) => {
      delete user._doc.password;
    });
    res.send(users);
  } catch (err) {
    res.status(400).send({ error: err.toString() });
  }
};
