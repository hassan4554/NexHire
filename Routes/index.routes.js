const router = require("express").Router();
const authRoute = require("./auth.routes");
const userRoutes = require("./user.routes");

router.use("/auth", authRoute);
router.use("/user", userRoutes);

module.exports = router;
