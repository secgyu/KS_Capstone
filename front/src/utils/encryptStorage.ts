import * as SecureStore from 'expo-secure-store';

const setEncryptStorage = async <T>(key: string, data: T) => {
  await SecureStore.setItemAsync(key, JSON.stringify(data));
};

const getEncryptStorage = async (key: string) => {
  const storedData = await SecureStore.getItemAsync(key);
  return storedData ? JSON.parse(storedData) : null;
};

const removeEncryptStorage = async (key: string) => {
  const data = await getEncryptStorage(key);
  if (data) {
    await SecureStore.deleteItemAsync(key);
  }
};

export { setEncryptStorage, getEncryptStorage, removeEncryptStorage };
