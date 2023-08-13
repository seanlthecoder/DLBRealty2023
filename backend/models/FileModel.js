const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
/* 
fileSchema is responsible defining the schema of the file 
and storing it to the database. fileSchema have 2 fields: 
path and user. the path field is required, must be a string, 
and must be unique. the user field is a reference to the user schema.
*/
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
