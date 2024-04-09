import axios from 'axios';

export const fetchUserData = async (page) => {
  try {
    const response = await axios.get(`https://reqres.in/api/users?page=2`);
    return response.data.data;
  } catch (error) {
    throw error; 
  }
};