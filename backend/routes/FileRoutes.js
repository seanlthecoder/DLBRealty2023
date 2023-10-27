const auth = require("../middlewares/auth.js");
const fileUploader = require("../middlewares/fileUploader.js");

const express = require("express");
const file_controller = require("../controllers/FileController.js");
const router = express.Router();

router.post(
  "/api/user/file",
  auth,
  fileUploader.upload("Resources/").single("file"),
  file_controller.upload_file
);

router.post(
  "/api/user/file",
  auth,
  fileUploader.upload("Files/").single("file"),
  file_controller.upload_admin_file
);
router.post(
  "/api/admin/file",
  auth,
  fileUploader.upload("Files/").single("file"),
  file_controller.upload_admin_files
);
router.get("/api/user/files", auth, file_controller.get_files);
router.get("/api/user/file/:id", auth, file_controller.get_file);
router.get("/api/admin/file/:id", auth, file_controller.get_admin_file);
router.get("/api/files", file_controller.get_list_files);
router.get("/api/admin/files", file_controller.get_admin_files);
router.delete("/api/admin/file/:id", auth, file_controller.delete_admin_file);
module.exports = router;
