import client, { firebase } from "./client";

import cache from "../utils/cache";

const REQ_COLLECTION = "requests";

const deleteRequest = async (userId, target, id) => {
  try {
    return { error: null };
  } catch (error) {
    return { error: "Error in deleting request" };
  }
};

const forgetPassword = async (email) => {
  try {
    await client.post('/utils/forgetPassword', { email });
    return true;
  } catch (error) {
    return false; 
  }
};

const getRequest = async (userId) => {
  try {
    const data = [];
    const docs = await firebase.firestore().collection(REQ_COLLECTION).where("userId", "==", userId).get();
    if (docs.empty) return null;

    docs.forEach(doc => data.push({ ...doc.data(), id: doc.id }));
    return data;
  } catch (error) {
    console.error("Error in getting request");
  }
};

const resetPassword = async (value) => {
  try {
    await client.post('/utils/resetPassword', value);
    return true;
  } catch (error) {
    return false; 
  }
};

const sendRequest = async (userId, data) => {
  try {
    let flag = 0;
    const requests = await getRequest(userId);
    if (requests) {
      requests.forEach(req => {
        if (req.deptId === data.deptId) flag = 1; 
      });
    }
    if (flag) return;

    await firebase.firestore().collection(REQ_COLLECTION).add({ ...data, userId });
    
    let pendingDepts = await cache.get("PendingDepts");
    if (!pendingDepts) pendingDepts = [];

    pendingDepts.push(data.deptId);
    await cache.store("PendingDepts", JSON.stringify(pendingDepts));
  } catch (error) {
    console.error("Error in creating request");
  }
};

const validateOTP = async (value) => {
  try {
    const { data, headers } = await client.post('/utils/validateOTP', value);    
    if (value.password) await firebase.auth().signInWithCustomToken(headers['x-auth-token']);

    return { error: null, data };
  } catch (error) {
    if (error.response) return { error: 'Invalid OTP', data: null };
  }
};

export default { deleteRequest, forgetPassword, getRequest, resetPassword, sendRequest, validateOTP };