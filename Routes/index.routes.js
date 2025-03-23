const router = require("express").Router();
const authRoute = require("./auth.routes");
const upload = require("../Middleware/multer.middleware");
const { upload_picture } = require("../Controllers/user.controller");
const { passportAuth } = require("../Utils/passport.utils");

router.use("/auth", authRoute);
router.patch(
  "/upload-picture",
  passportAuth("jwt-access", { session: false }),
  upload.single("profilePicture"),
  upload_picture
);

module.exports = router;
