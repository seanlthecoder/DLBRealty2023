const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const fileSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  path: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

function validateFile(user) {
   return schema = Joi.object({
    path: Joi.string().email().required(),
  });
  return Joi.validate(user._doc, schema);
}

const File = mongoose.model("File", fileSchema);

exports.File = File;
exports.validateFile = validateFile;
