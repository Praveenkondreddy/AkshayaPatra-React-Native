import AsyncStorage from '@react-native-async-storage/async-storage';
// store item
export const storeStringData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};
// get item
export const getStringData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return {
      success: true,
      value,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export default {
  getStringData,
  storeStringData,
};
