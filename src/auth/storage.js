import authStorage from "expo-secure-store";

const store = async (value, key = "authToken") => {
  try {
    await authStorage.setItemAsync(key, value);
  } catch (error) {
    console.log("Error in storing value.");
  }
};

const get = async (key = "authToken") => {
  try {
    return await authStorage.getItemAsync(key);
  } catch (error) {
    console.log("Error in getting value.");
  }
};

const remove = async (key = "authToken") => {
  try {
    await authStorage.deleteItemAsync(key);
  } catch (error) {
    console.log("Error in removing value.");
  }
};

export default { store, get, remove };