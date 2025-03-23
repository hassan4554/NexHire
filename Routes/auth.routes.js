const router = require("express").Router();
const passport = require("passport");
const {
  signup,
  login,
  me,
  refreshToken,
} = require("../Controllers/auth.controller");
const { validateData } = require("../Middleware/validation.middleware");
const userValidationSchema = require("../Schema/userSchema.validation");
const { passportAuth } = require("../Utils/passport.utils");

router.get("/", passportAuth("jwt-access", { session: false }), me);
router.post("/signup", validateData(userValidationSchema), signup);
router.post("/login", passportAuth("local"), login);
router.post(
  "/refreshToken",
  passportAuth("jwt-refresh", { session: false }),
  refreshToken
);

module.exports = router;
