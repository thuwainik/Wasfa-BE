const mongoose = require("mongoose");
mongoose.set("debug", true);
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URL);
  console.log(`mongo connected: ${conn.connection.host}`);
};

module.exports = connectDB;
