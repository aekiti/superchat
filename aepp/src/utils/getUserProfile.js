import {
	addUserProfile,
	setFetchingProfile,
} from "../actions/actionCreator.js";

const getUserProfile = async (profileInstance, userAddr, dispatch) => {
	// Fetch user profile
	let getProfile = (await profileInstance.methods.get_profile()).decodedResult;

	// Empty profile
	if (getProfile.name === "") {
		try {
			let getSHProfile = await fetch(
				`https://raendom-backend.z52da5wt.xyz/profile/${userAddr}`
			);
			let response = await getSHProfile.json();

			// Save user profile to blockchain
			await profileInstance.methods.register_or_update_profile(
				response.preferredChainName || "false",
				response.biography || "false",
				response.image || "false"
			);

			// Save response to store
			dispatch(
				addUserProfile({
					username: response.preferredChainName,
					about: response.biography,
					profileImg: `https://raendom-backend.z52da5wt.xyz${response.image}`,
				})
			);

			// User Profile fetch is completed
			dispatch(setFetchingProfile());
		} catch (e) {
			console.error("Error", e);
		}

		return;
	}

	// Save response to store
	dispatch(
		addUserProfile({
			username: getProfile.name,
			about: getProfile.about,
			profileImg: `https://raendom-backend.z52da5wt.xyz${getProfile.image}`,
		})
  );

	// User Profile fetch is completed
	dispatch(setFetchingProfile());
};

export default getUserProfile;
