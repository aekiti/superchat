import { addUserBalance } from "../actions/actionCreator.js";
import { toAe } from '@aeternity/aepp-sdk/es/utils/amount-formatter';

const getUserBalance = async (sdk, user, dispatch) => {
  // Get user balance
  sdk.balance(user).then((value) => {
    let userBalance = toAe(value) + " AE";
    dispatch(addUserBalance(userBalance));
  }).catch(() => 0);
};

export default getUserBalance;
