export default {
  contractAddress: 'ct_kdQ8q2GJSu2TwDJN2JVwdr2ngD7z4o5bQKsobtd7w1sgNEcQq',
  contractSource: `contract SuperChatProfile =

  record user =
    { name  : string,
      about : string,
      image : string,
      owner : address }

  record state = 
    { profile : map(address, user),
      admin   : address }

  stateful entrypoint init() : state = 
    { profile = {},
      admin   = Call.caller }

  private function check_user(caller_address : address) : bool =
    require(Map.member(caller_address, state.profile), "User Not Found")
    true
    
  entrypoint empty_profile(caller_address: address) : user =
    let empty_profile : user = { name = "", about = "", image = "", owner = caller_address }
    empty_profile

  stateful entrypoint register_profile(name': string, about': string, image': string, owner': address) : user =
    let new_profile : user = { name = name', about = about', image = image', owner = owner' }
    put(state{ profile[owner'] = new_profile })
    new_profile

  entrypoint get_profile(caller_address: address) : user =
    Map.lookup_default(caller_address, state.profile, empty_profile(caller_address))

  entrypoint get_all_profile(caller_address: address) : map(address, user) = 
    require((Call.origin == state.admin || check_user(caller_address)), "Unauthorized Access")
    state.profile`
}