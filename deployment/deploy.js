const Deployer = require('aeproject-lib').Deployer;
const fs = require('fs');

const deploy = async (network, privateKey, compiler, networkId) => {
  let deployer = new Deployer(network, privateKey, compiler, networkId)

  let profileContract = await deployer.deploy("./contracts/SuperChatProfile.aes")
  let friendContract = await deployer.deploy("./contracts/SuperChatFriend.aes", [profileContract.address])
  let messageContract = await deployer.deploy("./contracts/SuperChatMessage.aes")

  fs.writeFileSync(__dirname + "/../contracts/DeployedContractData.md", `# Superchat Contracts

_The following contracts was deployed to æternity ${network} network._

## SuperChatProfile Contract
- Address: ${profileContract.address}
- Owner: ${profileContract.owner}
- Transaction: ${profileContract.transaction}
- CreatedAt: ${profileContract.createdAt}

## SuperChatFriend Contract
- Address: ${friendContract.address}
- Owner: ${friendContract.owner}
- Transaction: ${friendContract.transaction}
- CreatedAt: ${friendContract.createdAt}

## SuperChatMessage Contract
- Address: ${messageContract.address}
- Owner: ${messageContract.owner}
- Transaction: ${messageContract.transaction}
- CreatedAt: ${messageContract.createdAt}`)
};

module.exports = {
  deploy
};