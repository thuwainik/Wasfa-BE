const User = require("../../models/User");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const hashPassword = async (password) => {
//   return await bcrypt.hash(password, 10);
// };

// const generateToken = (user) => {
//   // payload here is the user object without the password
//   const payload = {
//     _id: user._id,
//     username: user.username,
//   };
//   // add the secret key as a signature + token duration before expiring
//   token = jwt.sign(payload, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_TOKEN_EXP,
//   });
//   return token;
// };

exports.signup = async (req, res, next) => {
  try {
    // Take the password from the request and hash it
    // const { password } = req.body;
    // password = hashPassword(password);
    const newUser = await User.create(req.body);
    // After creating the user, return a token as response
    // token = generateToken(newUser);
    const token = newUser.generateToken();
    res.status(201).json({ message: "User Created!", token: { token } });
  } catch (err) {
    next(err);
  }
};

exports.signin = async (req, res) => {
  try {
    const token = req.user.generateToken();
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (err) {
    next(err);
  }
};
