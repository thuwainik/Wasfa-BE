const { model, Schema } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
});

//this automatically hashes the password before it's saved!
UserSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

// this method generates a jwt token
UserSchema.methods.generateToken = () => {
  // add the secret key as a signature + token duration before expiring
  token = jwt.sign(
    { _id: this._id, username: this.username },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_TOKEN_EXP,
    }
  );
  return token;
};

module.exports = model("User", UserSchema);
