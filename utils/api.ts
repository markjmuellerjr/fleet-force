import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL, // Define per brand or use a dynamic approach
  headers: {
    'Content-Type': 'application/json',
    // Add authorization headers if needed
  },
});

// Example function to fetch machinery data
export const fetchMachineryData = async (brand: string) => {
  const response = await apiClient.get(`/brands/${brand}/machinery`);
  return response.data;
};

// Add more functions as per API documentation