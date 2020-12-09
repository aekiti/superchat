# Superchat Contract

Superchat is a defi chat system for the Superhero æpp built by the ækiti æmbassy participant of the **HumanDefiHæck**. This _README_ aims to explain the three widely used contracts of the chat æpp accordingly to their usage. The three widely used contracts arranged accordingly are SuperChatProfile, SuperChatFriend, and lastly SuperChatMessage smart contracts while the SuperChat contract has all the three early mentioned contract functionality in it.

> _Kindly note that these contracts are not security audited and should not be used without a security audit first._

## SuperChatProfile Contract
This contract helps organize the chat æpp user profiles. The state stores all user details using the user `publicKey` as a primary key for user user detials. The user details include the user name, about, image, and `publicKey`. Below is the explanation for the contract function and entrypoints:

### register_or_update_profile
Here is a public stateful entrypoint that adds a user to the contract profile state. After execution, it returns the registered user as an object with the details included when registering or updating a user profile. The entrypoint takes in 3 string attributes for proper execution and they are the user name, about, and image link.

### empty_profile
Here is a public entrypoint that returns a user object with empty details except for the owner attribute that is equal to the `publicKey` utilizing the entrypoint.

### get_profile
This is a public entrypoint that returns a user object in two ways. The first way is to check the contract profile state object using the address utilizing the entrypoint since it is a user primary key. If the user is found in the profile state it returns the user object else it returns an empty user object using the early declared `empty_profile()` entryoint.

### get_all_profile
This is a public entrypoint that returns an array of all registered users where each user is an object. Before the entrypoint returns this array, it checks if the `publicKey` utilizing the entypoint has been registered and save on the profile state property.

_To be continued_