const express = require("express");
const router = express.Router();
const {
  getPlayerList,
  getPlayerDetails,
} = require("../controllers/playerController");

// Route to get the list of all players
router.get("/", async (req, res) => {
  try {
    const players = await getPlayerList();
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/:name", getPlayerDetails);

module.exports = router;
