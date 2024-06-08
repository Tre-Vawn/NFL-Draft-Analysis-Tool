const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connection SUCCESS");
  } catch (error) {
    console.error("MongoDB connection FAIL");
    setTimeout(connectDB, 5000); // Retry after 5 seconds
  }
};

module.exports = connectDB;
