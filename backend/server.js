const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { fetchAndStoreAllPlayers } = require("./controllers/playerController");

dotenv.config();

const app = express();

connectDB();

fetchAndStoreAllPlayers();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));

// Define routes
app.use("/api/players", require("./routes/players"));

// Define the port to run the server
const PORT = process.env.PORT || 5001;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
