import {
  addSuperchatUsers,
  setFetchingUsers,
} from "../actions/actionCreator.js";

const getSuperchatUsers = async (profileInstance, dispatch) => {
  // Get superchat users
  await profileInstance.methods
    .get_all_profile()
    .then((result) => {
      let users = result.decodedResult;
      dispatch(addSuperchatUsers(users));
      dispatch(setFetchingUsers()); // remove spinner
    })
    .catch(() => {
      dispatch(setFetchingUsers()); // remove spinner
    });
};

export default getSuperchatUsers;
