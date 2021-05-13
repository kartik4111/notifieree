import { firebase } from "./client";
import deptApi from "./depts";
import cache from "../utils/cache";

const COLLECTION = "notifications";

const get = async (collegeId, depts) => {
  try {
//    let data = await cache.get("Depts", true);
//    if (data) return data;

    const data = [];
    let deptsInfo = await cache.get("AllDepts");
    if (!deptsInfo) deptsInfo = await deptApi.getAll(collegeId);

    const notifications = await firebase.firestore().collection(COLLECTION).where("deptId", "in", depts).get();

    if (notifications.empty || !deptsInfo) return null;
    
    notifications.forEach(notification => data.push({ nid: notification.id, ...notification.data() }));
    
    for (let x = 0; x < data.length; x++) {
      for (let y = 0; y < deptsInfo.length; y++) {
        if (data[x].deptId === deptsInfo[y].id) {
          data[x] = { ...data[x], ...deptsInfo[y] };
          delete data[x].alias;
          delete data[x].id;
          delete data[x].deptId;
        }
      }
    }
    
    cache.store("Depts", data);
    return data;
  } catch (error) {
    console.error("Error in getting notifications");
  }
};

export default { get };
