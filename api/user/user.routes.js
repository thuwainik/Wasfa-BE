const express = require("express");
const router = express.Router();

const { signup, signin, getUsers } = require("./users.controllers");
const passport = require("passport");

router.post("/signup", signup);
// checks user and passport through passport middleware && generate a token and return token through the function
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
router.get("/", getUsers);

module.exports = router;
