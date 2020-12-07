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

let actionTypes = {
	ADD_USER_ADDRESS: addUserAddress,
	ADD_SDK: addSDK,
	ADD_CONTRACT_INSTANCES: addContractInstances,
	ADD_USER_PROFILE: addUserProfile,
};
export default actionTypes;
