import React, { useState, useEffect } from "react";
import { getPlayerList, getPlayerByName } from "../services/api";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      const data = await getPlayerList();
      setPlayers(data);
    };
    fetchPlayers();
  }, []);

  const handleSearch = async () => {
    const result = await getPlayerByName(searchTerm);
    setSearchResult(result);
  };

  return (
    <div>
      <h1>Players</h1>
      <input
        type="text"
        placeholder="Search for a player"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {searchResult && (
        <div>
          <h2>{searchResult.name}</h2>
          <p>Position: {searchResult.position}</p>
          <p>Team: {searchResult.team}</p>
          <p>Age: {searchResult.age}</p>
        </div>
      )}
      <ul>
        {players.map((player) => (
          <li key={player.playerId}>
            {player.name} - {player.position}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Players;
