import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const processQuery = async (query) => {
  try {
    const response = await axios.post(`${API_URL}/chat`, { query });
    return response.data.response;
  } catch (error) {
    console.error('Error processing chat query:', error);
    return 'Sorry, I couldn\'t process your request at this time.';
  }
};

export const getBusinessRecommendations = async (preferences) => {
  try {
    const response = await axios.post(`${API_URL}/recommendations`, preferences);
    return response.data;
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return [];
  }
};