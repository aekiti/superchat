const Deployer = require('aeproject-lib').Deployer;
const profileContractPath = "./contracts/SuperChatProfile.aes";
const friendContractPath = "./contracts/SuperChatFriend.aes";
const messageContractPath = "./contracts/SuperChatMessage.aes";
const fundContractPath = "./contracts/SuperChatFund.aes";
const adminContractPath = "./contracts/SuperChatAdmin.aes";

describe('SuperChat Contract', () => {
  let deployer;
  let instance = {};
  let keyPair = {
    admin: wallets[0],
    alice: wallets[1],
    bob: wallets[2]
  };

	before(async () => {
		deployer = new Deployer('local', keyPair.admin.secretKey)
	})

	it('Deploying SuperChatProfile Contract', async () => {
		const profileDeployPromise = deployer.deploy(profileContractPath)
    await assert.isFulfilled(profileDeployPromise, 'Could not deploy the SuperChatProfile Contract');
    instance.profileContract = await Promise.resolve(profileDeployPromise)
  })
  
  it('Deploying SuperChatFriend Contract', async () => {
		const friendDeployPromise = deployer.deploy(friendContractPath, [instance.profileContract.address])
    await assert.isFulfilled(friendDeployPromise, 'Could not deploy the SuperChatFriend Contract');
    instance.friendContract = await Promise.resolve(friendDeployPromise)
  })
  
  it('Deploying SuperChatMessage Contract', async () => {
		const messageDeployPromise = deployer.deploy(messageContractPath)
    await assert.isFulfilled(messageDeployPromise, 'Could not deploy the SuperChatMessage Contract');
    instance.messageContract = await Promise.resolve(messageDeployPromise)
  })
  
  it('Deploying SuperChatFund Contract', async () => {
		const fundDeployPromise = deployer.deploy(fundContractPath)
    await assert.isFulfilled(fundDeployPromise, 'Could not deploy the SuperChatFund Contract');
    instance.fundContract = await Promise.resolve(fundDeployPromise)
  })
  
  it('Deploying SuperChatAdmin Contract', async () => {
		const adminDeployPromise = deployer.deploy(adminContractPath, [instance.profileContract.address, instance.friendContract.address, instance.messageContract.address, instance.fundContract.address])
    await assert.isFulfilled(adminDeployPromise, 'Could not deploy the SuperChatAdmin Contract');
    instance.adminContract = await Promise.resolve(adminDeployPromise)
  })
})