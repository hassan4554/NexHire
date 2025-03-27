const router = require("express").Router();
const upload = require("../Middleware/multer.middleware");
const { validateData } = require("../Middleware/validation.middleware");
const {
  delete_user,
  update_profile,
  update_password,
} = require("../Controllers/user.controller");
const { passportAuth } = require("../Utils/passport.utils");
const passwordValidationSchema = require("../Schema/newPassword.validation");

router.delete("/", passportAuth("jwt-access", { session: false }), delete_user);

router.patch(
  "/",
  passportAuth("jwt-access", { session: false }),
  upload.single("profilePicture"),
  update_profile
);

router.patch(
  "/update-password",
  validateData(passwordValidationSchema),
  passportAuth("jwt-access", { session: false }),
  update_password
);
module.exports = router;
