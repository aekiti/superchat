const addUserAddress = (state, payload) => {
	let newState = Object.assign({}, state);
	newState.userProfile.userAddress = payload;
	return newState;
};

const addUserBalance = (state, payload) => {
	let newState = Object.assign({}, state);
	newState.userProfile.userBalance = payload;
	return newState;
};

const addSDK = (state, payload) => {
	let newState = Object.assign({}, state);
	newState.sdk = payload;
	return newState;
};

const addContractInstances = (state, payload) => {
	let newState = Object.assign({}, state);
	newState.contractInstances = payload;
	return newState;
};

const addUserProfile = (state, payload) => {
	let newState = Object.assign({}, state);
	newState.userProfile.username = payload.username;
	newState.userProfile.about = payload.about;
	newState.userProfile.profileImg = payload.profileImg;
	return newState;
};

const addFriendRequests = (state, payload) => {
	let newState = Object.assign({}, state);
	newState.friendRequests = payload;
	return newState;
};

const addFriends = (state, payload) => {
	let newState = Object.assign({}, state);
	newState.friends = [...newState.friends, ...payload];
	return newState;
};

const addSuperchatUsers = (state, payload) => {
	let newState = Object.assign({}, state);
	newState.users = payload;
	return newState;
};

const addMessages = (state, payload) => {
	let newState = Object.assign({}, state);
	newState.messages = payload;
	return newState;
};

const updateMessages = (state, payload) => {
	let newState = Object.assign({}, state);
	newState.messages = [...newState.messages, payload];
	return newState;
};

const setFetchingMessages = (state, payload) => {
	let newState = Object.assign({}, state);
	newState.friends = [...newState.friends, ...payload];
	return newState;
};

const setFetchingProfile = (state) => {
	let newState = Object.assign({}, state);
	newState.isFetchingProfile = !newState.isFetchingProfile;
	return newState;
};

const setFetchingFrndReq = (state) => {
	let newState = Object.assign({}, state);
	newState.isFetchingFrndReq = !newState.isFetchingFrndReq;
	return newState;
};

const setFetchingFrnds = (state) => {
	let newState = Object.assign({}, state);
	newState.isFetchingFrnds = !newState.isFetchingFrnds;
	return newState;
};

const setFetchingUsers = (state) => {
	let newState = Object.assign({}, state);
	newState.isFetchingUsers = !newState.isFetchingUsers;
	return newState;
};

let actionTypes = {
	ADD_USER_ADDRESS: addUserAddress,
	ADD_USER_BALANCE: addUserBalance,
	ADD_SDK: addSDK,
	ADD_CONTRACT_INSTANCES: addContractInstances,
	ADD_USER_PROFILE: addUserProfile,
	ADD_FRIEND_REQUESTS: addFriendRequests,
	ADD_FRIENDS: addFriends,
	ADD_SUPERCHAT_USERS: addSuperchatUsers,
	ADD_MESSAGES: addMessages,
	UPDATE_MESSAGES: updateMessages,
	SET_FETCHING_MESSAGES: setFetchingMessages,
	SET_FETCHING_PROFILE: setFetchingProfile,
	SET_FETCHING_FRND_REQ: setFetchingFrndReq,
	SET_FETCHING_FRNDS: setFetchingFrnds,
	SET_FETCHING_USERS: setFetchingUsers,
};
export default actionTypes;
