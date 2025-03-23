const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { User } = require("../Schema/user.schema");
const { comparePassword } = require("../Utils/bcrypt.utils");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });

      if (!user) return done({ message: "No user found" }, false);
      const same = await comparePassword(password, user.password);
      if (!same) return done({ message: "Incorrect Password" }, false);
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

const jwtAccessOptions = {
  secretOrKey: process.env.JWT_ACCESS_PRIVATE_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  "jwt-access",
  new JwtStrategy(jwtAccessOptions, async (jwt_payload, done) => {
    try {
      if (!jwt_payload) return done({ message: "Session Expired!" }, false);
      const user = await User.findOne({ _id: jwt_payload._id }).select(
        "-password"
      );
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);

const jwtRefreshOptions = {
  secretOrKey: process.env.JWT_REFRESH_PRIVATE_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  "jwt-refresh",
  new JwtStrategy(jwtRefreshOptions, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload._id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);

module.exports = { passport };
