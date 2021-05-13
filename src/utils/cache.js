import cache from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";

const prefix = "cache";
const expiryInMinutes = 5;

const store = async (key, value) => {
  try {
    const data = { value, timestamp: Date.now() };
    await cache.setItem(prefix + key, JSON.stringify(data));
  } catch (error) {
    console.error("Error in storing value.");
  }
};

const isExpired = (timestamp) => {
  const now = dayjs();
  const storedTime = dayjs(timestamp);
  return now.diff(storedTime, "minute") > expiryInMinutes;
};

const get = async (key, checkExpiry = false) => {
  try {
    let expired = false;
    const data =  JSON.parse(await cache.getItem(prefix + key));
    if (!data) return null;
    
    if (checkExpiry) {
      expired = isExpired(data.timestamp);
    }

    if (expired) return null;
    return data.value;
  } catch (error) {
    console.error("Error in getting value.");
  }
};

const remove = async (key) => {
  try {
    await cache.removeItem(prefix + key);
  } catch (error) {
    console.error("Error in removing value.");
  }
};

const clear = async () => {
  try {
    await cache.clear();
  } catch (error) {
    console.error("Error in clearing values.")
  }
};

export default { store, get, remove, clear };