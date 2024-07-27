import axios from 'axios';
import storage, { Token } from '@/storage/storage';
import shootAlert from './shoot-alert';
import { TProject } from '@/contexts/PeerContext';

const UID = process.env.EXPO_PUBLIC_42_UID as string;
const CLIENT_PRIMARY = process.env.EXPO_PUBLIC_42_SECRET as string;
const CLIENT_SECONDARY = process.env.EXPO_PUBLIC_42_SECRET_NEXT as string;
const MAX_RETRIES =
  parseInt(process.env.EXPO_PUBLIC_42_MAX_RETRIES as string, 10) || 3;

const fetchToken = async (clientSecret: string): Promise<string> => {
  try {
    const response = await axios.post(
      'https://api.intra.42.fr/oauth/token',
      {
        grant_type: 'client_credentials',
        client_id: UID,
        client_secret: clientSecret
      },
      { timeout: 2000 }
    );
    const tokenData: Token = response.data;
    await storage.save('dataToken', tokenData);
    console.log('TOKEN:', tokenData.access_token); // debug

    return tokenData.access_token;
  } catch (error) {
    if (error instanceof Error) {
      shootAlert('Error!', 'Failed to fetch token with secret');
    } else {
      shootAlert('Error!', 'Unknown error fetching token with secret');
    }
    throw error;
  }
};

export const getToken = async (): Promise<string> => {
  for (let attempts = 0; attempts < MAX_RETRIES; attempts++) {
    try {
      return await fetchToken(CLIENT_PRIMARY);
    } catch (error) {
      if (attempts === MAX_RETRIES - 1) {
        break; // If max attempts for primary secret reached, switch to secondary
      }
    }
  }

  for (let attempts = 0; attempts < MAX_RETRIES; attempts++) {
    try {
      return await fetchToken(CLIENT_SECONDARY);
    } catch (error) {
      if (attempts === MAX_RETRIES - 1) {
        throw new Error(
          'Failed to obtain token with both primary and secondary secrets'
        );
      }
    }
  }

  throw new Error(
    'Failed to obtain token with both primary and secondary secrets'
  );
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

export const fetchProjectsData = async (
  userId: number,
  token: string,
  page: number
) => {
  try {
    const projectsResponse = await axios.get<TProject[]>(
      `https://api.intra.42.fr/v2/users/${userId}/projects_users`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { 'page[size]': 42, 'page[number]': page }
      }
    );
    return { projects: projectsResponse.data };
  } catch (error) {
    //console.error('Error fetching projects data:', error);
    throw error;
  }
};
