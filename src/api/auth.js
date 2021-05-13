import client, { firebase } from "./client";

const login = async (target, value) => {
  try {
    const { data, headers } = await client.post("/auth/" + target, value);
    await firebase.auth().signInWithCustomToken(headers["x-auth-token"]);
    
    return { error: null, data };
  } catch (error) {
    if (error.response) return { error: "Invalid credentials", data: null };
  }
};

const register = async (target, value) => {
  try {
    await client.post("/register/" + target, value);
    
    return { error: null };
  } catch (error) {
    if (error.response) return { error: "Bad request" };
  }
};

export default { login, register };