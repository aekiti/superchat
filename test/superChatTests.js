const Deployer = require('aeproject-lib').Deployer;
const profileContractPath = "./contracts/SuperChatProfile.aes";
const friendContractPath = "./contracts/SuperChatFriend.aes";
const messageContractPath = "./contracts/SuperChatMessage.aes";
const fundContractPath = "./contracts/SuperChatFund.aes";
const adminContractPath = "./contracts/SuperChatAdmin.aes";

describe('SuperChat Contract', () => {
	let deployer;
  let adminKeyPair = wallets[0], aliceKeyPair = wallets[1], bobKeyPair = wallets[2];
  let profileContract, friendContract, messageContract, fundContract, adminContract;

	before(async () => {
		deployer = new Deployer('local', adminKeyPair.secretKey)
	})

	it('Deploying SuperChatProfile Contract', async () => {
		const profileDeployPromise = deployer.deploy(profileContractPath)
    await assert.isFulfilled(profileDeployPromise, 'Could not deploy the SuperChatProfile Smart Contract');
    profileContract = await Promise.resolve(profileDeployPromise)
  })
  
  it('Deploying SuperChatFriend Contract', async () => {
		const friendDeployPromise = deployer.deploy(friendContractPath, [profileContract.address])
    await assert.isFulfilled(friendDeployPromise, 'Could not deploy the SuperChatFriend Smart Contract');
    friendContract = await Promise.resolve(friendDeployPromise)
  })
  
  it('Deploying SuperChatMessage Contract', async () => {
		const messageDeployPromise = deployer.deploy(messageContractPath)
    await assert.isFulfilled(messageDeployPromise, 'Could not deploy the SuperChatMessage Smart Contract');
    messageContract = await Promise.resolve(messageDeployPromise)
  })
  
  it('Deploying SuperChatFund Contract', async () => {
		const fundDeployPromise = deployer.deploy(fundContractPath)
    await assert.isFulfilled(fundDeployPromise, 'Could not deploy the SuperChatFund Smart Contract');
    fundContract = await Promise.resolve(fundDeployPromise)
  })
  
  it('Deploying SuperChatAdmin Contract', async () => {
		const adminDeployPromise = deployer.deploy(adminContractPath, [profileContract.address, friendContract.address, messageContract.address, fundContract.address])
    await assert.isFulfilled(adminDeployPromise, 'Could not deploy the SuperChatAdmin Smart Contract');
    adminContract = await Promise.resolve(adminDeployPromise)
  })
})