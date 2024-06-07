import React, { useState, useEffect } from 'react';
import { getPlayerList } from '../services/api';

const Players = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            const data = await getPlayerList();
            setPlayers(data);
        };
        fetchPlayers();
    }, []);

    return (
        <div>
            <h1>Players</h1>
            <ul>
                {players.map(player => (
                    <li key={player.playerId}>{player.name} - {player.position}</li>
                ))}
            </ul>
        </div>
    );
};

export default Players;