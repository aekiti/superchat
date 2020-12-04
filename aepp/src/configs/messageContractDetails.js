export default {
  contractAddress: 'ct_qsn2PTkKR42tLZdFVmne2s5q3rdMJu2Lc83RY5958eos7k3HF',
  contractSource: `contract SuperChatMessage =

  record message =
    { message   : string,
      time      : int,
      sender    : address,
      seen      : bool }

  record state = { messages : map(address, map(address, list(message))) }

  stateful entrypoint init() : state = { messages = {} }

  stateful entrypoint send_message(receiver: address, message': string) : unit =
    let new_message = { message = message', time = Chain.timestamp, sender = Call.caller, seen = false }
    let old_state_senders_messages = Map.lookup_default(Call.caller, state.messages, {})
    let old_state_receiver_messages = Map.lookup_default(receiver, state.messages, {})

    let old_single_receiver_messages = Map.lookup_default(Call.caller, old_state_receiver_messages, [])
    let old_single_sender_messages = Map.lookup_default(receiver, old_state_senders_messages, [])

    let new_single_receiver_messages = new_message::old_single_receiver_messages
    let new_single_sender_messages = new_message::old_single_sender_messages

    let new_state_senders_message = old_state_senders_messages{ [receiver] = new_single_sender_messages }
    let new_state_receivers_message = old_state_receiver_messages{ [Call.caller] = new_single_receiver_messages }

    let new_updated_state = state.messages{ [Call.caller] = new_state_senders_message, [receiver] = new_state_receivers_message }
    put(state{ messages = new_updated_state })

  entrypoint get_caller_messages() : map(address, list(message)) =
    Map.lookup_default(Call.caller, state.messages, {})

  entrypoint get_caller_friend_messages(friend_address: address) : list(message) =
    let all_messages = get_caller_messages()
    let friend_messages = Map.lookup_default(friend_address, all_messages, [])
    friend_messages`
}