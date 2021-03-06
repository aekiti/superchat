export default {
  contractAddress: "ct_2cw8CMBX55asGoeyAGFcXtuBwdNBULWXpn49vtBzUzZAeY8hmM",
  contractSource: `payable contract SuperChatMessage =

  record message =
    { content  : string,
      category : string,
      amount   : int,
      time     : int,
      sender   : address }

  record state = { messages : map(address, map(address, list(message))) }

  stateful entrypoint init() : state = { messages = {} }

  private function update_message_state(receiver: address, new_message: message) : map(address, map(address, list(message))) =
    let old_state_senders_messages : map(address, list(message)) = Map.lookup_default(Call.caller, state.messages, {})
    let old_state_receiver_messages : map(address, list(message)) = Map.lookup_default(receiver, state.messages, {})

    let old_single_receiver_messages : list(message) = Map.lookup_default(Call.caller, old_state_receiver_messages, [])
    let old_single_sender_messages : list(message) = Map.lookup_default(receiver, old_state_senders_messages, [])

    let new_single_receiver_messages : list(message) = new_message::old_single_receiver_messages
    let new_single_sender_messages : list(message) = new_message::old_single_sender_messages

    let new_state_senders_message : map(address, list(message)) = old_state_senders_messages{ [receiver] = new_single_sender_messages }
    let new_state_receivers_message : map(address, list(message)) = old_state_receiver_messages{ [Call.caller] = new_single_receiver_messages }

    let updated_message_state : map(address, map(address, list(message))) = state.messages{ [Call.caller] = new_state_senders_message, [receiver] = new_state_receivers_message }
    updated_message_state

  public stateful entrypoint send_message(receiver: address, content': string) : message =
    let new_message : message = { content = content', category = "message", amount = 0, time = Chain.timestamp, sender = Call.caller }
    let new_message_state = update_message_state(receiver, new_message)
    
    put(state{ messages = new_message_state })
    new_message

  private function get_user_balance() : int = Chain.balance(Call.caller)

  public payable stateful entrypoint send_fund(receiver: address, description': string) : message =
    require(get_user_balance() > Call.value, abort("Insufficient Funds"))

    let new_fund_message : message = { content = description', category = "fund", amount = Call.value, time = Chain.timestamp, sender = Call.caller }
    let new_message_state = update_message_state(receiver, new_fund_message)

    Chain.spend(receiver, Call.value)
    put(state{ messages = new_message_state })
    new_fund_message

  private function get_user_messages() : map(address, list(message)) =
    Map.lookup_default(Call.caller, state.messages, {})

  public entrypoint get_user_friend_messages(friend_address: address) : list(message) =
    Map.lookup_default(friend_address, get_user_messages(), [])`,
};