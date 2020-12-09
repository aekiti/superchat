import {
	addFriendRequests,
	setFetchingFrndReq,
} from "../actions/actionCreator.js";

const getFriendRequest = async (friendInstance, dispatch) => {
	// Get user friend request
	let frndReq = (await friendInstance.methods.get_friend_request())
		.decodedResult;

	console.log(frndReq);

	dispatch(addFriendRequests(frndReq));
	dispatch(setFetchingFrndReq()); // remove spinner
};

export default getFriendRequest;
