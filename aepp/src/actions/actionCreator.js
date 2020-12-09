const addContractInstances = (instances) => ({
	type: "ADD_CONTRACT_INSTANCES",
	payload: instances,
});

const addSDK = (sdk) => ({
	type: "ADD_SDK",
	payload: sdk,
});

const addUserProfile = (profile) => ({
	type: "ADD_USER_PROFILE",
	payload: profile,
});

const addUserImage = (imgAdddress) => ({
	type: "ADD_USER_IMG",
	payload: imgAdddress,
});

const addUserAddress = (address) => ({
	type: "ADD_USER_ADDRESS",
	payload: address,
});

const addFriendRequests = (friendList) => ({
	type: "ADD_FRIEND_REQUESTS",
	payload: friendList,
});

const setFetchingProfile = () => ({
	type: "SET_FETCHING_PROFILE",
});

const setFetchingFrndReq = () => ({
	type: "SET_FETCHING_FRND_REQ",
});

export {
	addContractInstances,
	addSDK,
	addUserProfile,
	addUserImage,
	addUserAddress,
	addFriendRequests,
	setFetchingProfile,
	setFetchingFrndReq,
};
