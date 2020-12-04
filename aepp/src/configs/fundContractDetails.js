export default {
  contractAddress: 'ct_vrXpoL1DSz9rfZaWXdyDxbLrqWr69pLKcRffq2MAFqR3qHR4j',
  contractSource: `payable contract SuperChatFund =

  record fund =
    { sender      : address,
      time        : int,
      amount      : int,
      description : string }

  record state = { funds : map(address, map(address, list(fund))) }

  stateful entrypoint init() : state = { funds = {} }

  payable stateful entrypoint send_fund(receiver: address, description': string) : unit =
    let new_fund = { sender = Call.caller, time = Chain.timestamp, amount = Call.value, description = description' }
    let old_state_senders_funds = Map.lookup_default(Call.caller, state.funds, {})
    let old_state_receiver_funds = Map.lookup_default(receiver, state.funds, {})

    let old_single_receiver_funds = Map.lookup_default(Call.caller, old_state_receiver_funds, [])
    let old_single_sender_funds = Map.lookup_default(receiver, old_state_senders_funds, [])

    let new_single_receiver_funds = new_fund::old_single_receiver_funds
    let new_single_sender_funds = new_fund::old_single_sender_funds

    let new_state_senders_fund = old_state_senders_funds{ [receiver] = new_single_sender_funds }
    let new_state_receivers_fund = old_state_receiver_funds{ [Call.caller] = new_single_receiver_funds }

    let new_updated_state = state.funds{ [Call.caller] = new_state_senders_fund, [receiver] = new_state_receivers_fund }
    Chain.spend(receiver, Call.value)
    put(state{ funds = new_updated_state })

  entrypoint get_caller_funds() : map(address, list(fund)) =
    Map.lookup_default(Call.caller, state.funds, {})

  entrypoint get_caller_friend_fund(friend_address: address) : list(fund) =
    let all_funds = get_caller_funds()
    let friend_fund = Map.lookup_default(friend_address, all_funds, [])
    friend_fund`
}