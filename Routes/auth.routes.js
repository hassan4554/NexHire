const router = require("express").Router();
const {
  signup,
  login,
  me,
  refreshToken,
} = require("../Controllers/auth.controller");
const { validateData } = require("../Middleware/validation.middleware");
const userValidationSchema = require("../Schema/userSchema.validation");
const { passportAuth } = require("../Utils/passport.utils");
const {
  otpValidationSchema,
  emailValidationSchema,
  loginValidationSchema,
} = require("../Schema/validations.schema");
const { sendOtp, verifyOTP } = require("../Middleware/otp.middleware");

router.post(
  "/signup",
  validateData(userValidationSchema),
  passportAuth("jwt-otp", { session: false }),
  signup
);
router.post(
  "/login",
  validateData(loginValidationSchema),
  passportAuth("local"),
  login
);
router.get("/me", passportAuth("jwt-access", { session: false }), me);
router.post(
  "/refreshToken",
  passportAuth("jwt-refresh", { session: false }),
  refreshToken
);
router.post("/send-otp", validateData(emailValidationSchema), sendOtp);
router.post("/verify-otp", validateData(otpValidationSchema), verifyOTP);

module.exports = router;
