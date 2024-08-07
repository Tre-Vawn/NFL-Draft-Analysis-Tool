import React, { useState, useEffect, useCallback } from "react";
import { getPlayerList, getPlayerByName } from "../services/api";
import "./Players.css";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const playerList = await getPlayerList();
      setPlayers(playerList);
    };
    fetchPlayers();
  }, []);

  const handleSearch = useCallback(async () => {
    setLoading(true);
    const result = await getPlayerByName(searchTerm);
    setSearchResult(result);
    setLoading(false);
    setSuggestions([]);
  }, [searchTerm]);

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);

    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [handleSearch]); //Ensure the effect re-runs if searchTerm changes

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 1) {
      const suggestions = players.filter((player) =>
        player.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(suggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);
    setSuggestions([]);
    handleSearch();
  }

  return (
    <div className="players-container">
      <h2>Search for a Player</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a player"
          value={searchTerm}
          onChange={handleChange}
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
          {suggestions.length > 0 && (
            <ul className="suggestions">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.playerId}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default Players;
