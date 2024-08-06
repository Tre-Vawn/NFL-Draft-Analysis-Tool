import React, { useState, useEffect } from "react";
import { getPlayerList, getPlayerByName } from "../services/api";

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
    <div>
      <h1>Players</h1>
      <input
        type="text"
        placeholder="Search for a player"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {searchResult && (
            <div>
              <h2>{searchResult.name}</h2>
              <p>Position: {searchResult.position}</p>
              <p>College: {searchResult.college}</p>
              <p>Team: {searchResult.team}</p>
              <p>Number: {searchResult.number}</p>
              <p>Age: {searchResult.age}</p>
              <p>Height: {searchResult.height}</p>
              <p>Weight: {searchResult.weight}</p>
            </div>
          )}
          <ul>
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
