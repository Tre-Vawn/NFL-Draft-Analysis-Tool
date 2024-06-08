const axios = require("axios");
const Player = require("../models/Player");

// Function to fetch player details from NFL API
const fetchPlayerFromAPI = async (playerName) => {
  try {
    const url = `https://replay.sportsdata.io/api/v3/nfl/scores/json/playersbyrookiedraftyear/2024off?key=${process.env.API_KEY}`;
    console.log(`Fetching NFL data from URL: ${url}`);

    const response = await axios.get(url);
    const players = response.data;

    console.log("NFL API response data:", players);

    // Filter players by name
    const player = players.find(
      (p) =>
        `${p.FirstName} ${p.LastName}`.toLowerCase() ===
        playerName.toLowerCase()
    );

    return player || null;
  } catch (error) {
    console.error(`Error fetching player: ${error.message}`);
    throw error;
  }
};

// Controller function to get player list from database
const getPlayerList = async () => {
  try {
    const players = await Player.find();
    return players;
  } catch (error) {
    console.error("Error fetching players from database:", error.message);
    throw error;
  }
};

// Controller function to get player details
const getPlayerDetails = async (req, res) => {
  const playerName = req.params.name;
  console.log(`Fetching player: ${playerName}`);

  try {
    // Check if player exists in the database
    let player = await Player.findOne({ name: playerName });
    if (player) {
      console.log("Player found in database:", player);
      return res.json(player);
    }

    console.log("Player not found in database, fetching from NFL Draft API...");

    // Fetch player details from NFL API
    const nflPlayer = await fetchPlayerFromAPI(playerName);
    if (!nflPlayer) {
      return res.status(404).json({ message: "Player not found" });
    }

    // Create a new player document
    player = new Player({
      playerId: nflPlayer.PlayerID,
      name: `${nflPlayer.FirstName} ${nflPlayer.LastName}`,
      position: nflPlayer.Position,
      team: nflPlayer.Team || "Unknown Team",
      age: nflPlayer.Age,
    });

    // Save player to database
    await player.save();
    console.log("Player saved to database:", player);

    res.json(player);
  } catch (error) {
    console.error("Error fetching player:", error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getPlayerList,
  getPlayerDetails,
};
