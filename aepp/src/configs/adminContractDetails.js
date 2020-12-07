export default {
  contractAddress: 'ct_2i1NbTrdpXC55gyUuya1NcYNcTpT299CUYfJUSUTS5MDLLXTyU',
  contractSource: `contract ProfileContract =
  record user = { name  : string, about : string, image : string, owner : address }
  entrypoint get_all_profile : (address) => map(address, user)

contract FriendContract =
  entrypoint get_all_friends : () => map(address, list(address))

contract MessageContract =
  record message = { message : string, time : int, sender : address, seen : bool }
  entrypoint get_all_messages : () => map(address, map(address, list(message)))

contract FundContract =
  record fund = { sender : address, time : int, amount : int, description : string }
  entrypoint get_contract_balance : () => int
  entrypoint get_all_funds : () => map(address, map(address, list(fund)))

contract SuperChatAdmin =

  record state =
    { profile  : ProfileContract,
      friends  : FriendContract,
      messages : MessageContract,
      funds    : FundContract,
      admin    : address }

  stateful entrypoint init(profile_contract: ProfileContract, friend_contract: FriendContract, message_contract: MessageContract, fund_contract: FundContract) : state =
    { profile  = profile_contract,
      friends  = friend_contract,
      messages = message_contract,
      funds    = fund_contract,
      admin    = Call.caller }

  private function check_admin(caller_address: address)  : bool =
    require(state.admin == caller_address, "Admin Only Function")
    true

  entrypoint get_superchat_profiles(caller_address: address) : map(address, ProfileContract.user) =
    check_admin(caller_address)
    state.profile.get_all_profile(caller_address)

  entrypoint get_superchat_friends(caller_address: address) : map(address, list(address)) =
    check_admin(caller_address)
    state.friends.get_all_friends()

  entrypoint get_superchat_messages(caller_address: address) : map(address, map(address, list(MessageContract.message))) =
    check_admin(caller_address)
    state.messages.get_all_messages()

  entrypoint get_superchat_funds(caller_address: address) : map(address, map(address, list(FundContract.fund))) =
    check_admin(caller_address)
    state.funds.get_all_funds()

  entrypoint get_superchat_balance(caller_address: address) : int = 
    check_admin(caller_address)
    Chain.balance(state.admin)

  entrypoint get_fund_contract_balance(caller_address: address) : int = 
    check_admin(caller_address)
    state.funds.get_contract_balance()`
}