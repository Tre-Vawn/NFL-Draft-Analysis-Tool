import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

export const getPlayerList = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/players`);
        return response.data;
    } catch (error) {
        console.error('Error fetching players:', error);
        throw error;
    }
};