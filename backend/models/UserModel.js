const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

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
