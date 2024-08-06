import React, { useState, useEffect } from "react";
import { getPlayerList, getPlayerByName } from "../services/api";
import "./Players.css";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      const data = await getPlayerList();
      setPlayers(data);
      setLoading(false);
    };
    fetchPlayers();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    const result = await getPlayerByName(searchTerm);
    setSearchResult(result);
    setLoading(false);
  };

  return (
    <div className="players-container">
      <h2>Search for a Player</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a player"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {searchResult && (
            <div className="player-details">
              <h3>{searchResult.name}</h3>
              <p>Position: {searchResult.position}</p>
              <p>College: {searchResult.college}</p>
              <p>Team: {searchResult.team}</p>
              <p>Number: {searchResult.number}</p>
              <p>Age: {searchResult.age}</p>
              <p>Height: {searchResult.height}</p>
              <p>Weight: {searchResult.weight}</p>
            </div>
          )}
          <ul className="player-list">
            {players.map((player) => (
              <li key={player.playerId}>
                {player.name} - {player.position}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Players;
