const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");
const bcrypt = require("bcrypt");

const localStrategy = new LocalStrategy(
  // Check username and password in the database and return the user if it matches
  { usernameField: "email" },
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) return { message: "Username or Password are not found" };
      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (!passwordsMatch) return done(null, false);
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);

const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  async (payload, done) => {
    try {
      // exp is a predefined registered claim in JWT tokens
      if (Date.now() / 1000 < payload.exp) {
        const user = User.findById(payload._id);
        if (!user) done(null, false);
        done(null, user);
      }
      done(null, false, res.status(401));
    } catch (error) {
      done(error);
    }
  }
);

module.exports = { localStrategy, jwtStrategy };
