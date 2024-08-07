import React, { useState, useEffect, useCallback } from "react";
import { getPlayerList, getPlayerByName } from "../services/api";
import "./Players.css";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [comparePlayers, setComparePlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const data = await getPlayerList();
      setPlayers(data);
    };
    fetchPlayers();
  }, []);

  const handleSearch = useCallback(async () => {
    setLoading(true);
    const result = await getPlayerByName(searchTerm);
    setSearchResult(result);
    setLoading(false);
    setSuggestions([]); // Clear suggestions after search
  }, [searchTerm]);

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);

    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [handleSearch]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 1) {
      const filteredSuggestions = players.filter(player =>
        player.name.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);
    setSuggestions([]);
    handleSearch(); // Trigger search on suggestion click
  };

  const handleCompare = (player) => {
    if (comparePlayers.length < 2) {
      setComparePlayers([...comparePlayers, player]);
    } else {
      alert("You can only compare two players at a time.");
    }
  };

  const handleRemoveCompare = (playerId) => {
    setComparePlayers(comparePlayers.filter(player => player.playerId !== playerId));
  };

  return (
    <div className="players-container">
      <h2>Search for a Player</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a player"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
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
              <button onClick={() => handleCompare(searchResult)}>Compare</button>
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
      {comparePlayers.length > 0 && (
        <div className="compare-section">
          <h3>Compare Players</h3>
          <div className="compare-players">
            {comparePlayers.map(player => (
              <div key={player.playerId} className="compare-player">
                <h3>{player.name}</h3>
                <p>Position: {player.position}</p>
                <p>College: {player.college}</p>
                <p>Team: {player.team}</p>
                <p>Number: {player.number}</p>
                <p>Age: {player.age}</p>
                <p>Height: {player.height}</p>
                <p>Weight: {player.weight}</p>
                <button onClick={() => handleRemoveCompare(player.playerId)}>Remove</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Players;