import { addFriends, setFetchingFrnds } from "../actions/actionCreator.js";

const getFriends = async (friendInstance, dispatch) => {
	// Get user friend request
	let frnds = (await friendInstance.methods.get_friends()).decodedResult;

	dispatch(addFriends(frnds));
	dispatch(setFetchingFrnds()); // remove spinner
};

export default getFriends;
