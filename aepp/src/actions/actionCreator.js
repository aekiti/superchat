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

const updateAppState = (status) => ({
	type: "UPDATE_APP_STATE",
	payload: status,
});

export {
	addContractInstances,
	addSDK,
	addUserProfile,
	addUserImage,
	addUserAddress,
	updateAppState,
};
