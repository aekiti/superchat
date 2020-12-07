export default {
  contractAddress: 'ct_U9Vayey6K1WkGrpsQoMTdQk2aJRK3KDLXxM2AQAEhBeDExygc',
  contractSource: `payable contract SuperChatFund =

  record fund =
    { sender      : address,
      time        : int,
      amount      : int,
      description : string }

  record state = 
    { funds : map(address, map(address, list(fund))),
      admin :  address }

  stateful entrypoint init() : state = 
    { funds = {},
      admin = Call.caller }

  payable stateful entrypoint send_fund(sender': address, receiver: address, description': string) : fund =
    require(get_user_balance(sender') > Call.value, "Insufficient Funds")

    let new_fund : fund = { sender = sender', time = Chain.timestamp, amount = Call.value, description = description' }
    let old_state_senders_funds : map(address, list(fund)) = Map.lookup_default(sender', state.funds, {})
    let old_state_receiver_funds : map(address, list(fund)) = Map.lookup_default(receiver, state.funds, {})

    let old_single_receiver_funds : list(fund) = Map.lookup_default(sender', old_state_receiver_funds, [])
    let old_single_sender_funds : list(fund) = Map.lookup_default(receiver, old_state_senders_funds, [])

    let new_single_receiver_funds : list(fund) = new_fund::old_single_receiver_funds
    let new_single_sender_funds : list(fund) = new_fund::old_single_sender_funds

    let new_state_senders_fund : map(address, list(fund)) = old_state_senders_funds{ [receiver] = new_single_sender_funds }
    let new_state_receivers_fund : map(address, list(fund)) = old_state_receiver_funds{ [sender'] = new_single_receiver_funds }

    let new_updated_state : map(address, map(address, list(fund))) = state.funds{ [sender'] = new_state_senders_fund, [receiver] = new_state_receivers_fund }
    Chain.spend(receiver, Call.value)
    put(state{ funds = new_updated_state })
    new_fund

  private function get_user_balance(user_address: address) : int = Chain.balance(user_address)

  entrypoint get_user_funds(user_address: address) : map(address, list(fund)) =
    Map.lookup_default(user_address, state.funds, {})

  entrypoint get_user_friend_fund(user_address: address, friend_address: address) : list(fund) =
    let all_funds : map(address, list(fund)) = get_user_funds(user_address)
    let friend_fund : list(fund) = Map.lookup_default(friend_address, all_funds, [])
    friend_fund

  entrypoint get_contract_balance() : int = 
    require(Call.origin == state.admin, "Admin Only Function")
    Contract.balance

  entrypoint get_all_funds() : map(address, map(address, list(fund))) = 
    require(Call.origin == state.admin, "Admin Only Function")
    state.funds`
}