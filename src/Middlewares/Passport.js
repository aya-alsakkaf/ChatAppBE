const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const User = require("../Models/User");
const bcrypt = require("bcrypt");

const localStrategy = new LocalStrategy(
  {
    usernameField: "phoneNumber",
    passwordField: "password",
  },
  async (phoneNumber, password, done) => {
    try {
      const user = await User.findOne({ phoneNumber });
      if (!user) return done({ message: "User is Not Found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done({ message: "Password is Incorrect" });

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);

const jwtStratgey = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (!user) return done({ message: "User is Not Found" });
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);

module.exports = { localStrategy, jwtStratgey };
