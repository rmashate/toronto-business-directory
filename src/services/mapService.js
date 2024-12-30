import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getBusinessLocations = async () => {
  try {
    const response = await axios.get(`${API_URL}/locations`);
    return response.data;
  } catch (error) {
    console.error('Error fetching business locations:', error);
    return [];
  }
};

export const getNearbyBusinesses = async (lat, lng, radius) => {
  try {
    const response = await axios.get(`${API_URL}/locations/nearby`, {
      params: { lat, lng, radius }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching nearby businesses:', error);
    return [];
  }
};