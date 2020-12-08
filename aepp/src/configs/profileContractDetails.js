export default {
  contractAddress: 'ct_VZ3J3tYuRC7yy152dMWbDWXnbAL7TsSQdTyUAp4EZKbCSZTHK',
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

  private function check_admin() : bool =
    require(state.admin == Call.origin, "Unauthorized Access")
    true

  private function check_user() : bool =
    require(Map.member(Call.caller, state.profile), "User Not Found")
    true
    
  entrypoint empty_profile() : user =
    let empty_profile : user = { name = "", about = "", image = "", owner = Call.caller }
    empty_profile

  stateful entrypoint register_profile(name': string, about': string, image': string) : user =
    let new_profile : user = { name = name', about = about', image = image', owner = Call.caller }
    put(state{ profile[Call.caller] = new_profile })
    new_profile

  entrypoint get_profile() : user =
    Map.lookup_default(Call.caller, state.profile, empty_profile())

  entrypoint get_all_profile() : map(address, user) = 
    (check_admin() || check_user())
    state.profile`
}