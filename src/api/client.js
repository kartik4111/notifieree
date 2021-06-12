import axios from "axios";
import * as admin from "firebase";
import "firebase/auth";
import "firebase/firestore";

import config from "./config.json";
axios.defaults.baseURL = config.baseURL;

axios.interceptors.response.use(null, error => {
  const expectedError = error.response && error.response.status >= 400 && error.response.status <500;

  if (!expectedError) console.log("Unexpected error occured");

  return Promise.reject(error);
});

const firebaseConfig = config.firebase;
const firebase = admin.default;

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default axios;

export { firebase };