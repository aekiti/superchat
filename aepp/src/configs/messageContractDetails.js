export default {
  contractAddress: 'ct_JYJvp4GYCJtohyxcpqY8Fngb5hhtL6bBXth7jVhbKgZZZLZp5',
  contractSource: `contract SuperChatMessage =

  record message =
    { content : string,
      time    : int,
      sender  : address }

  record state = 
    { messages : map(address, map(address, list(message))),
      admin    : address }

  stateful entrypoint init() : state = 
    { messages = {},
      admin    = Call.caller }

  private function check_admin() : bool =
    require(state.admin == Call.origin, "Unauthorized Access")
    true

  stateful entrypoint send_message(receiver: address, content': string) : message =
    let new_message : message = { content = content', time = Chain.timestamp, sender = Call.caller }
    let old_state_senders_messages : map(address, list(message)) = Map.lookup_default(Call.caller, state.messages, {})
    let old_state_receiver_messages : map(address, list(message)) = Map.lookup_default(receiver, state.messages, {})

    let old_single_receiver_messages : list(message) = Map.lookup_default(Call.caller, old_state_receiver_messages, [])
    let old_single_sender_messages : list(message) = Map.lookup_default(receiver, old_state_senders_messages, [])

    let new_single_receiver_messages : list(message) = new_message::old_single_receiver_messages
    let new_single_sender_messages : list(message) = new_message::old_single_sender_messages

    let new_state_senders_message : map(address, list(message)) = old_state_senders_messages{ [receiver] = new_single_sender_messages }
    let new_state_receivers_message : map(address, list(message)) = old_state_receiver_messages{ [Call.caller] = new_single_receiver_messages }

    let new_updated_state : map(address, map(address, list(message))) = state.messages{ [Call.caller] = new_state_senders_message, [receiver] = new_state_receivers_message }
    put(state{ messages = new_updated_state })
    new_message

  entrypoint get_user_messages() : map(address, list(message)) =
    Map.lookup_default(Call.caller, state.messages, {})

  entrypoint get_user_friend_messages(friend_address: address) : list(message) =
    Map.lookup_default(friend_address, get_user_messages(), [])

  entrypoint get_all_messages() : map(address, map(address, list(message))) = 
    check_admin()
    state.messages`
}