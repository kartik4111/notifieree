import { firebase } from "./client";

import cache from "../utils/cache";
import utilsApi from "./utils";

const COLLECTION = "depts";

const getDeptsInfo = async () => {
  const deptsInfo = {};

  const doc = await firebase.firestore().collection("depts_info").get();
  if (doc.empty) return null;
  
  doc.forEach(dept => deptsInfo[dept.id] = dept.data());

  return deptsInfo;
};

const getAll = async (collegeId) => {
  try {
    let data = [];
    const deptsInfo = await getDeptsInfo();
    const depts = await firebase.firestore().collection(COLLECTION).where("collegeId", "==", collegeId).get();

    if (depts.empty) return null;

    depts.forEach(dept => data.push({ id: dept.id, deptId: dept.data().deptId }));

    let deptInfo;
    for (let index = 0; index < data.length; index++) {
      deptInfo = deptsInfo[data[index].deptId];
      data[index] = { ...data[index], ...deptInfo };
      delete data[index].deptId;
    }

    await cache.store("AllDepts", data);
    return data;
  } catch (error) {
      console.log("Error in getting depts.");  
  }
};

const getPending = async (userId) => {
  try {
    data = [];
    const requests = await utilsApi.getRequest(userId);
    if (requests)
      requests.forEach(req => req.deptId && data.push(req.deptId));

    if (!data.length) return null;

    await cache.store("PendingDepts", data);
    return data;
  } catch (error) {
    console.error("Error in getting pending depts");
  }
};

export default { getAll, getPending };
