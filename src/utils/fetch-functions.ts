import axios from 'axios';
import storage from '@/storage/storage';
import { Token } from '@/storage/storage';

const UID = process.env.EXPO_PUBLIC_42_UID;
const CLIENT = process.env.EXPO_PUBLIC_42_SECRET;

export const getToken = async () => {
  try {
    const response = await axios.post(
      'https://api.intra.42.fr/oauth/token',
      {
        grant_type: 'client_credentials',
        client_id: UID,
        client_secret: CLIENT
      },
      { timeout: 2000 }
    );
    const tokenData: Token = response.data;
    await storage.save('dataToken', tokenData);
    console.log('New TOKEN:', tokenData.access_token); // debug
    return tokenData.access_token;
  } catch (error) {
    //console.error('Error fetching token:', error);
    throw error;
  }
};

export const fetchUserData = async (username: string, token: string) => {
  try {
    const userResponse = await axios.get(
      `https://api.intra.42.fr/v2/users/${username.toLocaleLowerCase()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    const userId = userResponse.data.id;
    const coalitionResponse = await axios.get(
      `https://api.intra.42.fr/v2/users/${userId}/coalitions`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return { user: userResponse.data, coalition: coalitionResponse.data };
  } catch (error) {
    //console.error('Error fetching user data:', error);
    throw error;
  }
};
