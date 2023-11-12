const express = require("express");
const passport = require("passport");
const router = express.Router();
module.exports = router;

router.post(
  "/category",
  passport.authenticate("jwt", { session: false }),
  createCategory
);
router.put(
  "/category/:categoryId",
  passport.authenticate("jwt", { session: false }),
  updtCategory
);
router.delete(
  "/category/:categoryId",
  passport.authenticate("jwt", { session: false }),
  delCategory
);
