const Deployer = require('aeproject-lib').Deployer;
const profileContractPath = "./contracts/SuperChatProfile.aes";
const friendContractPath = "./contracts/SuperChatFriend.aes";
const messageContractPath = "./contracts/SuperChatMessage.aes";
const fundContractPath = "./contracts/SuperChatFund.aes";

describe('SuperChat Contract', () => {
	let deployer;
  let ownerKeyPair = wallets[0];
  let profileContract, friendContract, messageContract, fundContract;

	before(async () => {
		deployer = new Deployer('local', ownerKeyPair.secretKey)
	})

	it('Deploying SuperChatProfile Contract', async () => {
		const profileDeployPromise = deployer.deploy(profileContractPath)
    await assert.isFulfilled(deployPromise, 'Could not deploy the SuperChatProfile Smart Contract');
    profileContract = await Promise.resolve(profileDeployPromise)

    console.log(profileContract);
  })
  
  it('Deploying SuperChatFriend Contract', async () => {
		const friendDeployPromise = deployer.deploy(friendContractPath, [profileContract.address])
    await assert.isFulfilled(deployPromise, 'Could not deploy the SuperChatFriend Smart Contract');
    friendContract = await Promise.resolve(friendDeployPromise)
  })
  
  it('Deploying SuperChatMessage Contract', async () => {
		const messageDeployPromise = deployer.deploy(messageContractPath)
    await assert.isFulfilled(deployPromise, 'Could not deploy the SuperChatMessage Smart Contract');
    messageContract = await Promise.resolve(messageDeployPromise)
  })
  
  it('Deploying SuperChatFund Contract', async () => {
		const fundDeployPromise = deployer.deploy(fundContractPath)
    await assert.isFulfilled(deployPromise, 'Could not deploy the SuperChatFund Smart Contract');
    fundContract = await Promise.resolve(fundDeployPromise)
	})
})