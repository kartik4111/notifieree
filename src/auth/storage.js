import authStorage from "expo-secure-store";

const key = "authToken";

const store = async (token) => {
  try {
    await authStorage.setItemAsync(key, token);
  } catch (error) {
    console.log("Error in storing token.");
  }
};

const get = async () => {
  try {
    return await authStorage.getItemAsync(key);
  } catch (error) {
    console.log("Error in getting token.");
  }
};

const remove = async () => {
  try {
    await authStorage.deleteItemAsync(key);
  } catch (error) {
    console.log("Error in removing token.");
  }
};

export default { store, get, remove };