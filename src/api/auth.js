import client from "./client";

const login = async (value) => {
  try {
    const { data } = await client.post("/auth/student", value);
    if (data) return { error: data };

    return { error: null };
  } catch (error) {
    if (error.response) return { error: "Invalid credentials" };
  }
};

const register = async (value) => {
  try {
    await client.post("/register/student", value);
    
    return { error: null };
  } catch (error) {
    if (error.response) return { error: "Bad request" };
  }
};

export default { login, register };