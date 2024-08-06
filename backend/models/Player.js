const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  playerId: { type: String, required: true, unique: true},
  name: { type: String, required: true },
  position: { type: String, required: true },
  college: { type: String },
  team: { type: String },
  teamId: { type: String },
  number: { type: String },
  age: { type: String },
  height: { type: String },
  weight: { type: String },
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
