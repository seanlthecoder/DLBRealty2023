const multer = require("multer");
/* 
fileStorage is responsible for storing the file to 
the server and assigning the file name when it is Uploaded 
*/
const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "Resources/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  exports.upload = multer({ storage: fileStorage });
