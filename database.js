const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DB_LINK);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
