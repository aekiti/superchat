export default {
  contractAddress: 'ct_ie3oi3QbpqPxr3VcLCuSdrvFWix7YWp4f4DxV1myxze3SWVn7',
  contractSource: `contract SuperChatMessage =

  record message =
    { message : string,
      time    : int,
      sender  : address,
      seen    : bool }

  record state = 
    { messages : map(address, map(address, list(message))),
      admin    : address }

  stateful entrypoint init() : state = 
    { messages = {},
      admin    = Call.caller }

  stateful entrypoint send_message(sender': address, receiver: address, message': string) : message =
    let new_message : message = { message = message', time = Chain.timestamp, sender = sender', seen = false }
    let old_state_senders_messages : map(address, list(message)) = Map.lookup_default(sender', state.messages, {})
    let old_state_receiver_messages : map(address, list(message)) = Map.lookup_default(receiver, state.messages, {})

    let old_single_receiver_messages : list(message) = Map.lookup_default(sender', old_state_receiver_messages, [])
    let old_single_sender_messages : list(message) = Map.lookup_default(receiver, old_state_senders_messages, [])

    let new_single_receiver_messages : list(message) = new_message::old_single_receiver_messages
    let new_single_sender_messages : list(message) = new_message::old_single_sender_messages

    let new_state_senders_message : map(address, list(message)) = old_state_senders_messages{ [receiver] = new_single_sender_messages }
    let new_state_receivers_message : map(address, list(message)) = old_state_receiver_messages{ [sender'] = new_single_receiver_messages }

    let new_updated_state : map(address, map(address, list(message))) = state.messages{ [sender'] = new_state_senders_message, [receiver] = new_state_receivers_message }
    put(state{ messages = new_updated_state })
    new_message

  entrypoint get_user_messages(user_address: address) : map(address, list(message)) =
    Map.lookup_default(user_address, state.messages, {})

  entrypoint get_user_friend_messages(user_address: address, friend_address: address) : list(message) =
    let all_messages : map(address, list(message)) = get_user_messages(user_address)
    let friend_messages : list(message) = Map.lookup_default(friend_address, all_messages, [])
    friend_messages

  entrypoint get_all_messages() : map(address, map(address, list(message))) = 
    require(Call.origin == state.admin, "Admin Only Function")
    state.messages`
}