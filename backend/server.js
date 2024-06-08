const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const app = express();

// Connect to MongoDB database
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Use CORS middleware
app.use(cors());

// Define routes
app.use("/api/players", require("./routes/players"));

// Define the port to run the server
const PORT = process.env.PORT || 5001;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
