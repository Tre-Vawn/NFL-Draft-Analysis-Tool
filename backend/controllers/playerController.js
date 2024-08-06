const axios = require("axios");
const Player = require("../models/Player");

// Mapping of TeamID to full team names
const teamIdToFullName = {
  0: "Free Agent",
  1: "Arizona Cardinals",
  2: "Atlanta Falcons",
  3: "Baltimore Ravens",
  4: "Buffalo Bills",
  5: "Carolina Panthers",
  6: "Chicago Bears",
  7: "Cincinnati Bengals",
  8: "Cleveland Browns",
  9: "Dallas Cowboys",
  10: "Denver Broncos",
  11: "Detroit Lions",
  12: "Green Bay Packers",
  13: "Houston Texans",
  14: "Indianapolis Colts",
  15: "Jacksonville Jaguars",
  16: "Kansas City Chiefs",
  19: "Miami Dolphins",
  20: "Minnesota Vikings",
  21: "New England Patriots",
  22: "New Orleans Saints",
  23: "New York Giants",
  24: "New York Jets",
  25: "Las Vegas Raiders",
  26: "Philadelphia Eagles",
  28: "Pittsburgh Steelers",
  29: "Los Angeles Chargers",
  30: "Seattle Seahawks",
  31: "San Francisco 49ers",
  32: "Los Angeles Rams",
  33: "Tampa Bay Buccaneers",
  34: "Tennessee Titans",
  35: "Washington Commanders",
};

// Function to fetch all players from NFL API and store them in the database
const fetchAndStoreAllPlayers = async () => {
  try {
    const url = `https://replay.sportsdata.io/api/v3/nfl/scores/json/playersbyrookiedraftyear/2024off?key=${process.env.API_KEY}`;
    console.log("Fetching all players from NFL API...");

    const response = await axios.get(url);
    const players = response.data;

    // Log the API response for debugging
    console.log("Full API Response:", JSON.stringify(players, null, 2));

    console.log("API response length:", players.length);

    // Loop through each player and store them in the database
    for (const player of players) {
      if (player.TeamID === null) {
        player.TeamID = 0;
      }

      const teamFullName = teamIdToFullName[player.TeamID.toString()];

      if (player.Number === null) {
        player.Number = "Undecided";
      }
      
      if (player.Age === null) {
        player.Age = "Unknown";
      }

      const playerData = {
        playerId: player.PlayerID,
        name: `${player.FirstName} ${player.LastName}`,
        position: player.Position,
        college: player.College,
        team: teamFullName,
        number: player.Number.toString(),
        age: player.Age.toString(),
        height : player.Height.toString(),
        weight: player.Weight.toString(),
      };

      const existingPlayer = await Player.findOneAndUpdate(
        { playerId: player.PlayerID },
        playerData,
        {upsert: true, new: true}
      );

      if (!existingPlayer) {
        console.log("New player saved to database:", playerData);
      } else {
        console.log("Player updated in database:", playerData);
    }
  }
    console.log("All players have been fetched and stored in the database.");
  } catch (error) {
    console.error("Error fetching and storing players:", error.message);
    throw error;
  }
};

// Controller function to get player list from database
const getPlayerList = async () => {
  try {
    const players = await Player.find();
    console.log("Players fetched from database:", players);
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
    let player = await Player.findOne({
      name: new RegExp(`^${playerName}$`, "i"),
    });
    if (player) {
      console.log("Player found in database:", player);
      return res.json(player);
    }

    console.log("Player not found in database.");
    return res.status(404).json({ message: "Player not found" });
  } catch (error) {
    console.error("Error fetching player:", error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  fetchAndStoreAllPlayers,
  getPlayerList,
  getPlayerDetails,
};
