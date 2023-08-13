const auth = require("../middlewares/auth.js");
const fileUploader = require("../middlewares/fileUploader.js");

const express = require("express");
const file_controller = require("../controllers/FileController.js");
const router = express.Router();

router.post(
  "/api/user/file",
  auth,
  fileUploader.upload.single("file"),
  file_controller.upload_file
);
router.get("/api/user/files", auth, file_controller.get_files);
router.get("/api/user/file/:id", auth, file_controller.get_file);
router.get("/api/files", file_controller.get_list_files);
router.get("/api/files/:fileName", file_controller.download_file);
module.exports = router;
