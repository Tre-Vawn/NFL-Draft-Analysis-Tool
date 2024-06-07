const express = require("express");
const router = express.Router();
const axios = require("axios");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// @route   GET api/nfl/news
// @desc    Get latest NFL news
// @access  Public
router.get("/news", async (req, res) => {
  try {
    // Make a request to the NFL Draft API using the API key
    const response = await axios.get(
      "https://replay.sportsdata.io/api/v3/nfl/scores/json/news",
      {
        headers: {
          "Ocp-Apim-Subscription-Key": process.env.API_KEY_NFL,
        },
      }
    );
    // Respond with the data from the API
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
