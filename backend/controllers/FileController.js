const FileModels = require("../models/FileModel.js");
const AdminFileModels = require("../models/AdminFileModel.js");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

/* 
upload_file is responsible for uploading a file to the server 
when the user sends a POST request to /api/user/file endpoint 
with single file and valid JWT token in the Authorization header. 
It returns the file object if the file is uploaded successfully. 
Otherwise, it returns the error message.
*/
exports.upload_file = async (req, res) => {
  const { file, id } = req;
  const newFile = new FileModels.File({
    _id: new mongoose.Types.ObjectId(),
    path: file.path,
    user: id,
  });
  try {
    await newFile.save();
    res.send(newFile);
  } catch (err) {
    res.status(400).send({ error: err.toString() });
  }
};
exports.upload_admin_file = async (req, res) => {
  const { file, id } = req;
  const newFile = new AdminFileModels.File({
    _id: new mongoose.Types.ObjectId(),
    path: file.path,
    user: id,
  });
  try {
    await newFile.save();
    res.send(newFile);
  } catch (err) {
    res.status(400).send({ error: err.toString() });
  }
};

exports.upload_admin_files = async (req, res) => {
  const { file } = req;
  const newFile = new AdminFileModels.File({
    _id: new mongoose.Types.ObjectId(),
    path: file.path,
  });
  try {
    await newFile.save();
    res.send(newFile);
  } catch (err) {
    res.status(400).send({ error: err.toString() });
  }
};

/* 
get_files is responsible for getting a list of files
uploaded by the user when the user sends a GET request
to /api/user/files endpoint with valid JWT token in the 
Authorization header. It returns the list of files if 
the files are found. Otherwise, it returns the error message.
*/
exports.get_files = async (req, res) => {
  const { id } = req;
  const File = FileModels.File;
  try {
    const files = await File.find({ user: id });
    // File.deleteMany({});
    files.forEach((file) => {
      file.path = file.path.split("/")[1].split("-").slice(1).join("");
    });
    res.send(files);
  } catch (err) {
    res.status(400).send({ error: err.toString() });
  }
};
exports.get_admin_files = async (req, res) => {
  // const { id } = req;
  const File = AdminFileModels.File;
  try {
    const files = await File.find({});
    // File.deleteMany({});
    files.forEach((file) => {
      file.path = file.path.split("/")[1].split("-").slice(1).join("");
    });
    res.send(files);
  } catch (err) {
    res.status(400).send({ error: err.toString() });
  }
};

/* 
get_file is responsible for downloading a file that is 
specified by the id from the request parameter when the
user sends a get request to /api/user/file/:id endpoint 
with valid JWT token in the Authorization header. It 
returns the file if the file is found. Otherwise, it 
returns the error message.
*/
exports.get_file = async (req, res) => {
  const { id } = req.params;
  const File = FileModels.File;
  try {
    const file = await File.findById(id);
    if (!file) {
      return res.status(404).send({ error: "File not found" });
    }
    const name = file.path.split("/")[1].split("-").slice(1).join("");
    res.download(file.path, file.path);
  } catch (err) {
    res.status(400).send({ error: err.toString() });
  }
};
exports.get_admin_file = async (req, res) => {
  const { id } = req.params;
  const File = AdminFileModels.File;
  try {
    const file = await File.findById(id);
    if (!file) {
      return res.status(404).send({ error: "File not found" });
    }
    const name = file.path.split("/")[1].split("-").slice(1).join("");
    res.download(file.path, file.path);
  } catch (err) {
    res.status(400).send({ error: err.toString() });
  }
};
exports.delete_admin_file = async (req, res) => {
  const File = AdminFileModels.File;
  const { id } = req.params;
  console.log(id, "here");
  try {
    const file = await File.findById(id);

    console.log(file, "here");
    if (!file) res.sendStatus(404).send("Here Not Found ");
    await File.findByIdAndDelete(id);
    fs.unlink(file.path, (err) => {
      if (err) {
        console.error("An error occurred:", err);
        res.send("An error occurred while trying to delete the file.");
      } else {
        console.log("File deleted successfully");
        res.send("File deleted successfully");
      }
    });
  } catch (err) {
    res.status(400).send({ error: err.toString() });
  }
};

// exports.get_list_files = async (req, res) => {
//   try {
//     const directoryPath = path.join(path.dirname(__dirname), "Files");
//     if (!fs.existsSync(directoryPath)) {
//       res.sendStatus(404);
//       return;
//     }
//     const files = fs.readdirSync(directoryPath);
//     res.json(files);
//   } catch (e) {
//     res.status(400).send({ error: e.toString() });
//   }
// };
exports.get_list_files = async (req, res) => {
  const { id } = req;
  const File = AdminFileModels.File;
  try {
    const files = await File.find();
    // File.deleteMany({});
    files.forEach((file) => {
      file.path = file.path.split("/")[1].split("-").slice(1).join("");
    });
    res.send(files);
  } catch (err) {
    res.status(400).send({ error: err.toString() });
  }
};
exports.download_file = async (req, res) => {
  try {
    // Get the file name from the request parameters.
    const fileName = req.params.fileName;
    const directoryPath = path.join(path.dirname(__dirname), "Files");

    // Get the file path from the folder path and the file name.
    const filePath = `${directoryPath}/${fileName}`;

    // Check if the file exists.
    if (!fs.existsSync(filePath)) {
      res.sendStatus(404);
      return;
    }
    res.download(filePath, filePath);
  } catch (e) {
    res.status(400).send({ error: e.toString() });
  }
};
