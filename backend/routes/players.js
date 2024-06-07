const express = require('express');
const router = express.Router();
const axios = require('axios');
const Player = require('../models/Player');

const NFL_API_KEY =  'c736c6e4179946bba7901e35eeb436d3'
const NFL_API_URL = `https://replay.sportsdata.io/api/v3/nfl/scores/json/playersbyrookiedraftyear/2024off?key=${NFL_API_KEY}`;

// @route   GET api/players/fetch
// @desc    Fetch players from external API and store in MongoDB
// @access  Public
router.get('/fetch/nfl', async (req, res) => {
    try {
        const response = await axios.get(NFL_API_URL);
        const players = response.data;

        for (const player of players) {
            console.log(player); // Log the player data to inspect it

            // Check if the player already exists
            const existingPlayer = await Player.findOne({ playerId: player.PlayerID });
            if (existingPlayer) {
                console.log(`Player with ID ${player.PlayerID} already exists. Skipping...`);
                continue; // Skip to the next player
            }

            // If the player doesn't exists, create a new one
            const newPlayer = new Player({
                playerId: player.PlayerID,
                name: player.Name,
                position: player.Position,
                team: player.Team || 'Unknown Team',
                age: player.Age || 'Unknown Age',
            });
            await newPlayer.save();
        }
        
        res.status(200).json({ message: 'NFL players fetched and stored successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// Get all players from MongoDB
router.get('/', async (req, res) => {
    try {
        const players = await Player.find();
        res.json(players);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;