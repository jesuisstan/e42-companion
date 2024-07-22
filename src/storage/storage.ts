import * as SecureStore from 'expo-secure-store';

export type Token = {
  access_token: string;
  created_at: number;
  expires_in: number;
}

const saveToken = async (key: string, value: Token): Promise<void> => {
  await SecureStore.setItemAsync(key, JSON.stringify(value));
};

const getToken = async (key: string): Promise<Token | null> => {
  const result = await SecureStore.getItemAsync(key);
  return result ? JSON.parse(result) : null;
};

const deleteToken = async (key: string): Promise<void> => {
  await SecureStore.deleteItemAsync(key);
};

export default {
  save: saveToken,
  load: getToken,
  delete: deleteToken
};