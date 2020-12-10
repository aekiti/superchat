export const contractPath = {
  superchat: "./contracts/test/SuperChat.aes",
  profile: "./contracts/test/SuperChatProfile.aes",
  friend: "./contracts/test/SuperChatFriend.aes",
  message: "./contracts/test/SuperChatMessage.aes"
}

export const keyPair = {
  superchat: wallets[0],
  alice: wallets[1],
  bob: wallets[2]
}

export const users = [
  {
    name : "User Superchat",
    about: "Superchat Test User",
    image: "just_a_test_image_string_for_superchat.png",
    owner: keyPair.superchat.publicKey
  },
  {
    name : "User Alice",
    about: "Alice Test User",
    image: "just_a_test_image_string_for_alice.png",
    owner: keyPair.alice.publicKey
  },
  {
    name : "User Bob",
    about: "Bob Test User",
    image: "just_a_test_image_string_for_bob.png",
    owner: keyPair.bob.publicKey
  }
];

export const requestArguments = [
  {
    caller : keyPair.alice.publicKey,
    friend: keyPair.superchat.publicKey
  },
  {
    caller : keyPair.bob.publicKey,
    friend: keyPair.superchat.publicKey
  }
];