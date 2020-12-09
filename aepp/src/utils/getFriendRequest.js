import {
	addFriendRequests,
	setFetchingFrndReq,
} from "../actions/actionCreator.js";

const getFriendRequest = async (friendInstance, userAddr, dispatch) => {
	// Get user friend request
	let frndReq = (await friendInstance.methods.get_friend_request())
		.decodedResult;

	if (frndReq.length < 1) {
		dispatch(setFetchingFrndReq());
		return false;
	}

	console.log(frndReq);
};

export default getFriendRequest;
