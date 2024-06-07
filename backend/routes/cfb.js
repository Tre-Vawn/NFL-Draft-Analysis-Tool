const express = require("express");
const router = express.Router();
const axios = require("axios");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// @route   GET api/cfb/stats
// @desc    Get CFB stats
// @access  Public
router.get("/stats", async (req, res) => {
  try {
    // Make a request to the CFB API using the API key
    const response = await axios.get(
      "https://replay.sportsdata.io/api/v3/cfb/scores/json/currentseasondetails",
      {
        headers: {
          "Ocp-Apim-Subscription-Key": process.env.API_KEY_CFB,
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
