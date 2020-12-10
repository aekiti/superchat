const Deployer = require('aeproject-lib').Deployer;
const { keyPair, contractPath, users, requestArguments } = require('./config');

describe('Superchat Single Contract', () => {
  let deployer, SuperchatContract;

	before(async () => {
		deployer = new Deployer('local', keyPair.superchat.secretKey)
  })

	it('Should deploy SuperChat contract', async () => {
		const deployPromise = deployer.deploy(contractPath.superchat)
    await assert.isFulfilled(deployPromise, 'Could not deploy the Superchat Contract');
    SuperchatContract = await Promise.resolve(deployPromise)
  })

  it('Should add 3 profiles to the Superchat contract', async () => {  
    for (let user = 0; user < users.length; user++) {
      let profile = users[user];
      await SuperchatContract.register_or_update_profile(profile.name, profile.about, profile.image, profile.owner)
    }

    let result = (await SuperchatContract.get_all_profile(keyPair.superchat.publicKey)).decodedResult.length

    assert.equal(result, 3)
  })

  it("User Alice & Bob should send friend request to User Superchat for a friend request count of 2", async () => {
    for (let argument = 0; argument < requestArguments.length; argument++) {
      let arg = requestArguments[argument];
      await SuperchatContract.send_friend_request(arg.caller, arg.friend)
    }

    let result = (await SuperchatContract.get_friend_request(keyPair.superchat.publicKey)).decodedResult.length

    assert.equal(result, 2)
  })

  it("User Superchat should accept User Alice friend request", async () => {
    let result = await SuperchatContract.accept_friend_request(keyPair.superchat.publicKey, keyPair.alice.publicKey)

    assert.isOk(result)
  })

  it("User Superchat should reject User Bob friend request", async () => {
    let result = await SuperchatContract.reject_friend_request(keyPair.superchat.publicKey, keyPair.bob.publicKey)

    assert.isOk(result)
  })

  it("Should verify User Superchat friends equal 1", async () => {
    let result = (await SuperchatContract.get_friends(keyPair.superchat.publicKey)).decodedResult.length

    assert.equal(result, 1)
  })

  it("User Superchat should verify friendship connection with User Alice", async () => {
    let result = (await SuperchatContract.get_friends(keyPair.superchat.publicKey)).decodedResult[0].owner

    assert.equal(result, keyPair.alice.publicKey)
  })

  it("User Alice should send message to User Superchat requesting funds", async () => {
    let result = await SuperchatContract.send_message(keyPair.alice.publicKey, keyPair.superchat.publicKey, "Hey, what's up with the promised AE")

    assert.isOk(result)
  })

  it("User Superchat should verify User Alice first message", async () => {
    let result = (await SuperchatContract.get_user_friend_messages(keyPair.superchat.publicKey, keyPair.alice.publicKey)).decodedResult[0].content

    assert.equal(result, "Hey, what's up with the promised AE")
  })

  it("User Superchat should revert User Alice with the promised funds", async () => {
    let result = await SuperchatContract.send_fund(keyPair.superchat.publicKey, keyPair.alice.publicKey, "Hello, here is the promised funds", {amount: 1000})

    assert.isOk(result)
  })

  it("User Alice should verify is User Superchat first message constist of the funds", async () => {
    let result = (await SuperchatContract.get_user_friend_messages(keyPair.superchat.publicKey, keyPair.alice.publicKey)).decodedResult[0].amount

    assert.equal(result, 1000)
  })
})