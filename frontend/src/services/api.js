import axios from "axios";

const API_BASE_URL = "http://localhost:5001/api";

export const getPlayerList = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/players`);
    return response.data;
  } catch (error) {
    console.error("Error fetching players:", error);
    return [];
  }
};

export const getPlayerByName = async (name) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/players/${name}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching player ${name}:`, error);
    return null;
  }
};
