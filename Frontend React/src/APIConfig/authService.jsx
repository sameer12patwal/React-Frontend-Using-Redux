import { apiClient } from './apiConfig';

export const login = async (email, password) => {
  try {
    const response = await apiClient.post('login', { email, password });
    return response.data.token;
  } catch (error) {
    throw error.response?.data;
  }
};

export const register = async (email, password) => {
  try {
    const response = await apiClient.post('register', { email, password });
    return response.data.id;
  } catch (error) {
    throw error.response.data;
  }
};
