const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

/* 
userSchema is responsible defining the schema of the user and storing it to the database.
 the user schema is also responsible for validating the user input. the user schema have 
 3 fields: username, password, and email. the username field is required, must be a string, 
 and must be between 3 and 50 characters long. the password field is required, must be a string, 
 and must be between 6 and 50 characters long. the email field is required, must be a string, and 
 must be a valid email address.  
*/
const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

/*
validateUser is a function that takes a user object as a parameter. 
the user object is validated using a schema defined in validateUser(). 
the schema is defined using Joi.object(). the schema has 3 fields: 
username, password, and email. the username field is required, must 
be a string, and must be between 3 and 50 characters long. the password 
field is required, must be a string, and must be between 6 and 50 characters 
long. the email field is required, must be a string, and must be a valid email address. 
*/
function validateUser(user) {
   return schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
  });
  return Joi.validate(user._doc, schema);
}

const User = mongoose.model("User", userSchema);

exports.User = User;
exports.validateUser = validateUser;
