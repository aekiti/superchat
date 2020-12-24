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

const addUserBalance = (balance) => ({
	type: "ADD_USER_BALANCE",
	payload: balance,
});

const addFriendRequests = (friendList) => ({
	type: "ADD_FRIEND_REQUESTS",
	payload: friendList,
});

const addFriends = (frnds) => ({
	type: "ADD_FRIENDS",
	payload: frnds,
});

const addSuperchatUsers = (userList) => ({
	type: "ADD_SUPERCHAT_USERS",
	payload: userList,
});

const addMessages = (messages) => ({ type: "ADD_MESSAGES", payload: messages });
const updateMessages = (message) => ({
	type: "UPDATE_MESSAGES",
	payload: message,
});

const setFetchingMessages = () => ({
	type: "SET_FETCHING_MESSAGES",
});

const setFetchingProfile = () => ({
	type: "SET_FETCHING_PROFILE",
});

const setFetchingFrndReq = () => ({
	type: "SET_FETCHING_FRND_REQ",
});

const setFetchingFrnds = () => ({
	type: "SET_FETCHING_FRNDS",
});

const setFetchingUsers = () => ({
	type: "SET_FETCHING_USERS",
});

export {
	addContractInstances,
	addSDK,
	addUserProfile,
	addUserImage,
	addUserAddress,
	addUserBalance,
	addFriendRequests,
	addFriends,
	addSuperchatUsers,
	addMessages,
	updateMessages,
	setFetchingMessages,
	setFetchingProfile,
	setFetchingFrndReq,
	setFetchingFrnds,
	setFetchingUsers,
};
