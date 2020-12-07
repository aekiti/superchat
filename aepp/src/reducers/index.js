import actionTypes from "../actions/actionTypes.js";

const initialState = {
	pending: true,
	contractInstances: {},
	userProfile: {},
	messages: [],
	sdk: {},
};

const rootReducer = (state = initialState, action) => {
	if (action.type in actionTypes) {
		return actionTypes[action.type](state, action.payload);
	}
	return state;
};

export default rootReducer;
