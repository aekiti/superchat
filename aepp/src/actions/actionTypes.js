const addUserAddress = (state, payload) => {
	let newState = Object.assign({}, state);
	newState.userProfile.userAddress = payload;
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

let actionTypes = {
	ADD_USER_ADDRESS: addUserAddress,
	ADD_SDK: addSDK,
	ADD_CONTRACT_INSTANCES: addContractInstances,
	ADD_USER_PROFILE: addUserProfile,
	ADD_FRIEND_REQUESTS: addFriendRequests,
	SET_FETCHING_PROFILE: setFetchingProfile,
	SET_FETCHING_FRND_REQ: setFetchingFrndReq,
};
export default actionTypes;
