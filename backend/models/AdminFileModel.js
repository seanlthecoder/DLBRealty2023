const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
/* 
adminFileSchema is responsible defining the schema of the file 
and storing it to the database. adminFileSchema have 2 fields: 
path and user. the path field is required, must be a string, 
and must be unique. the user field is a reference to the user schema.
*/
const adminFileSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  path: {
    type: String,
    required: true,
    unique: true,
  },
});

function validateFile(user) {
  return (schema = Joi.object({
    path: Joi.string().required(),
  }));
  return Joi.validate(user._doc, schema);
}

const File = mongoose.model("AdminFile", adminFileSchema);

exports.File = File;
exports.validateFile = validateFile;
