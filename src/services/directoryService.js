import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const searchBusinesses = async (searchTerm) => {
  try {
    const response = await axios.get(`${API_URL}/businesses`, {
      params: { search: searchTerm }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching businesses:', error);
    return [];
  }
};

export const filterByCategory = (businesses, category) => {
  if (category === 'all') return businesses;
  return businesses.filter(business => business.category === category);
};

export const getBusinessDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/businesses/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching business details:', error);
    return null;
  }
};