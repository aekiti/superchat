# Superchat Contract

Superchat is a defi chat system for the Superhero æpp built by the ækiti æmbassy participant of the **HumanDefiHæck**. This _README_ aims to explain the three widely used contracts of the chat æpp accordingly to their usage. The three widely used smart contracts arranged in order of user are **_SuperChatProfile_**, **_SuperChatFriend_**, and **_SuperChatMessage_** contract. The SuperChat contract has all the three early mentioned contract functionality in it.

> _Kindly note that these contracts are not security audited and should not be used without a security audit first._

## SuperChatProfile Contract
This contract helps organize the chat æpp user profiles. The state stores all user details using the user `publicKey` as a primary key for user details. The user details include the user name, about, image, and publicKey. Below is the explanation for the contract function and entrypoints:

### register_or_update_profile
Here is a public stateful entrypoint that adds a user to the contract profile state. After execution, it returns the registered user as an object with the details included when the user is registered or updated. The entrypoint takes in 3 string attributes for proper execution; they are the user name, about, and image link.

### empty_profile
Here is a public entrypoint that returns a user object with empty details except for the owner attribute that is equal to the `publicKey` utilizing the entrypoint.

### get_profile
Here is a public entrypoint that returns a user object in two ways. The first way is to check the contract profile state object using the address utilizing the entrypoint since it is the user's primary key. If the user exists in the contract profile state, it returns the user object. If the user does not exist, it returns an empty user object using the early declared `empty_profile()` entryoint.

### get_all_profile
Here is a public entrypoint that returns an array of all registered users where each user is an object. Before the entrypoint returns this array, it checks if the `publicKey` utilizing the entypoint has been registered and save on the profile state property.

## SuperChatFriend Contract
This contract helps the friendship relationship of the chat æpp. It has the friendship starting from sending a friend request to rejecting or accepting friend request and lastly getting users friends. The contract state has properties that make the contract functional. They are the requests and friends property, and lastly, the profile state property helps call the get_all_profile() and empty_profile() entrypoint of the SuperChatProfile contract. Below is the explanation for the contract function and entrypoints:

### send_friend_request
Here is a public stateful entrypoint that returns an array of the user's friend request publicKey. This entrypoint allows a user to send a friend request to another user using his/her publicKey. The entrypoint takes in the friend publicKey, and store it in the field of the present user's friend state request map. This entrypoint relies on two private stateful functions; only_one_friend_request() and modify_friends_request() after using the other publicKey to look through the state request map. The only_one_friend_request() function executes when the friend list of the friend state requests is empty, while the modify_friends_request() executes when the user already has a list of friend requests.

### only_one_friend_request
Here is a private stateful function that returns an array of the user's friend request publicKey. Using the attributes gotten from the send_friend_request entrypoint, it updates the request array of a friend using his/her publicKey when the friend state request is empty.

### modify_friends_request
Here is also another stateful function that returns an array of the user's friend request publicKey. It also uses the attributes gotten from the send_friend_request entrypoint to update the request array of a friend using his/her publicKey when the user already has a list of friend requests.

### get_friend_request
Here is a public entrypoint that returns an array of user objects using the included ProfileContract user object. The entrypoint makes use of the List library to filter through the contract state request map. It could get the user profile due to the mode of connecting the SuperChatProfile contract remotely using the profile state object.

### reject_friend_request
Here is a public stateful entrypoint that returns an array of the user's friend request publicKey. The entrypoint uses user friend publicKey as an attribute to filter through a user friend request list. The filter removes the friend publicKey from the list and then updates the user-friend state request map.

### accept_friend_request
Here is also a public entrypoint that returns an array of the user's friend request publicKey. The entrypoint takes the user-friend publicKey as an attribute to remove the publicKey from the user list of friend requests and add it to the user list of friends and also add it to the user-friend list of friends.

### get_friends
Just as the get_friend_request() entrypoint returns an array of user objects using the included ProfileContract user object, this public entrypoint those the same. The only difference here is, it loops through the contract state friend map.

## SuperChatMessage Contract
This contract is a payable contract has it performs the defi functionalities and more for the chat æpp. It helps organize the chat æpp messages with its state that has a map of message object map. The message object includes the message content, category, amount, time, and sender property that is a user `publicKey`. The first map address primary key is the publicKey of the user that owns the whole message array, while the second address primary key is the `publicKey` of the user that sent the message. Below is the explanation for the contract function and entrypoints:

### update_message_state
Here is a private function that returns exactly the contract message state. This function helps to seamlessly update the contract message state when a new message is sent either from the  send_message() or send_fund() stateful entrypoint. The function receives the receiver publicKey and the new message object to add the new message to each user(sender and receiver) state message map.

### send_message
Here is a public stateful entrypoint that returns a message object of the sent message. It takes the receiver publicKey and message content as the argument to first create the new message object that was sent to the private update_message_state function alongside the receiver publicKey to update the message state with the new message.

### get_user_balance
Here is a private function that returns the total AE value of the address utilizing the function.

### send_fund
Here is a public payable stateful entrypoint that also returns a message object of the sent message. The entrypoint helps send tokens to friends on the chat æpp. The entrypoint takes the receiver publicKey, fund description as the argument to update the contract message state map, and the amount to be sent using the Call.value method. Before the contract executes, a check if the user has funds higher than the Call.value executes. With this, a new message object that helps the private update_message_state function just as done in the send_message() entrypoint come in. The difference here is that before the message state object is updated, the amount stipulated using the Call.value method sends to the receiver from the account of the publicKey utilizing the contract.

### get_user_messages
Here is a private function that returns a map of user messages. It makes use of the publcKey utilizing the function to get all of the user messages. If none exists, it returns an empty object.

### get_user_friend_messages
Here is a public entrypoint that returns an array of the contract message object. It makes use of a user friend publicKey to return the friend list of object messages. It makes use of the get_user_messages() private function to get the friend messages. If none exists, it returns an empty array.