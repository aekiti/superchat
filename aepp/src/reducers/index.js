import actionTypes from "../actions/actionTypes.js";

const initialState = {
	isFetchingMessages: true,
	isFetchingFrndReq: true,
  isFetchingProfile: true,
  isFetchingUsers: true,
	contractInstances: {},
	userProfile: {},
	messages: [],
	sdk: {},
	friendRequests: [],
  friends: [],
  users: [],
};

const rootReducer = (state = initialState, action) => {
	if (action.type in actionTypes) {
		return actionTypes[action.type](state, action.payload);
	}
	return state;
};

export default rootReducer;
