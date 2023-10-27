const multer = require("multer");
/* 
upload is responsible for storing the file to 
the server and assigning the file name when it is Uploaded 
*/

exports.upload = (fileName) =>
  multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        // cb(null, "Resources/");
        cb(null, fileName);
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
      },
    }),
  });
