const multer = require("multer");
const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "Resources/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  exports.upload = multer({ storage: fileStorage });
