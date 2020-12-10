const Deployer = require('aeproject-lib').Deployer;
const { keyPair, contractPath, users, requestArguments } = require('./config');

describe('Superchat Multiple Contracts', () => {
  let deployer, superchat = {};

	before(async () => {
		deployer = new Deployer('local', keyPair.superchat.secretKey)
  })

	it('Should deploy SuperChatProfile contract', async () => {
		const profileDeployPromise = deployer.deploy(contractPath.profile)
    await assert.isFulfilled(profileDeployPromise, 'Could not deploy the SuperChatProfile Contract');
    superchat.profileContract = await Promise.resolve(profileDeployPromise)
  })
  
  it('Should deploy SuperChatFriend contract', async () => {
		const friendDeployPromise = deployer.deploy(contractPath.friend, [superchat.profileContract.address])
    await assert.isFulfilled(friendDeployPromise, 'Could not deploy the SuperChatFriend Contract');
    superchat.friendContract = await Promise.resolve(friendDeployPromise)
  })
  
  it('Should deploy SuperChatMessage contract', async () => {
		const messageDeployPromise = deployer.deploy(contractPath.message)
    await assert.isFulfilled(messageDeployPromise, 'Could not deploy the SuperChatMessage Contract');
    superchat.messageContract = await Promise.resolve(messageDeployPromise)
  })

  it('Should add 3 profiles using the SuperChatProfile contract', async () => {
    for (let user = 0; user < users.length; user++) {
      let profile = users[user];
      await superchat.profileContract.register_or_update_profile(profile.name, profile.about, profile.image, profile.owner)
    }

    let result = (await superchat.profileContract.get_all_profile(keyPair.superchat.publicKey)).decodedResult.length

    assert.equal(result, 3)
  })

  it("User Alice & Bob should send friend request to User Superchat for a friend request count of 2 using the SuperChatFriend contract", async () => {
    for (let argument = 0; argument < requestArguments.length; argument++) {
      let arg = requestArguments[argument];
      await superchat.friendContract.send_friend_request(arg.caller, arg.friend)
    }

    let result = (await superchat.friendContract.get_friend_request(keyPair.superchat.publicKey)).decodedResult.length

    assert.equal(result, 2)
  })

  it("User Superchat should accept User Alice friend request using the SuperChatFriend contract", async () => {
    let result = await superchat.friendContract.accept_friend_request(keyPair.superchat.publicKey, keyPair.alice.publicKey)

    assert.isOk(result)
  })

  it("User Superchat should reject User Bob friend request using the SuperChatFriend contract", async () => {
    let result = await superchat.friendContract.reject_friend_request(keyPair.superchat.publicKey, keyPair.bob.publicKey)

    assert.isOk(result)
  })

  it("Should verify User Superchat friends equal 1 using the SuperChatFriend contract", async () => {
    let result = (await superchat.friendContract.get_friends(keyPair.superchat.publicKey)).decodedResult.length

    assert.equal(result, 1)
  })

  it("User Superchat should verify friendship connection with User Alice using the SuperChatFriend contract", async () => {
    let result = (await superchat.friendContract.get_friends(keyPair.superchat.publicKey)).decodedResult[0].owner

    assert.equal(result, keyPair.alice.publicKey)
  })

  it("User Alice should send message to User Superchat requesting funds using the SuperChatMessage contract", async () => {
    let result = await superchat.messageContract.send_message(keyPair.alice.publicKey, keyPair.superchat.publicKey, "Hey, what's up with the promised AE")

    assert.isOk(result)
  })

  it("User Superchat should verify User Alice first message using the SuperChatMessage contract", async () => {
    let result = (await superchat.messageContract.get_user_friend_messages(keyPair.superchat.publicKey, keyPair.alice.publicKey)).decodedResult[0].content

    assert.equal(result, "Hey, what's up with the promised AE")
  })

  it("User Superchat should revert User Alice with the promised funds using the SuperChatMessage contract", async () => {
    let result = await superchat.messageContract.send_fund(keyPair.superchat.publicKey, keyPair.alice.publicKey, "Hello, here is the promised funds", {amount: 1000})

    assert.isOk(result)
  })

  it("User Alice should verify is User Superchat first message constist of the funds using the SuperChatMessage contract", async () => {
    let result = (await superchat.messageContract.get_user_friend_messages(keyPair.superchat.publicKey, keyPair.alice.publicKey)).decodedResult[0].amount

    assert.equal(result, 1000)
  })
})