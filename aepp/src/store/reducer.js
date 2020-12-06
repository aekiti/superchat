const initialState = {
	pending: true,
	contractInstances: {},
	userProfile: {},
	messages: [],
};

const rootReducer = (state = initialState, action) => {
	if (action.type in actionTypes) {
		return actionTypes[action.type](state, action.payload);
	}
	return state;
};
const addOne = (state, payload) => {
	let newUser = { name: payload.name, age: payload.age };
	let newState = { ...state, newUser };
	return newState;
};

const addTwo = (payload) => payload + 2;
const actionTypes = {
	// SEND_FRIEND_REQUEST: sendFriendRequest,
	ADD_ONE: addOne,
	ADD_TWO: addTwo,
};

export default rootReducer;
