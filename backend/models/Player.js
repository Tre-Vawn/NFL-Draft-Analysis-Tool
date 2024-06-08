const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  playerId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Player", PlayerSchema);
