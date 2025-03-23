const { passport } = require("../Configs/passport.config");

const passportAuth = (strategy, options = {}) => {
  return (req, res, next) => {
    passport.authenticate(strategy, options, (err, user, info) => {
      try {
        if (err)
          return res
            .status(400)
            .json({ message: "Server error", error: err?.message });
        if (!user)
          return res
            .status(404)
            .json({
              message: info?.message || "Unauthorized",
              error: "No User Found",
            });

        req.user = user;
        next();
      } catch (error) {
        return res.status(500).json({ message: "Server error", error: error });
      }
    })(req, res, next);
  };
};

module.exports = { passportAuth };
