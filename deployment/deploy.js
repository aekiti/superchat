const Deployer = require('aeproject-lib').Deployer;
const fs = require('fs');

const deploy = async (network, privateKey, compiler, networkId) => {
  let deployer = new Deployer(network, privateKey, compiler, networkId)

  let profileContract = await deployer.deploy("./contracts/SuperChatProfile.aes")
  let friendContract = await deployer.deploy("./contracts/SuperChatFriend.aes", [profileContract.address])
  let messageContract = await deployer.deploy("./contracts/SuperChatMessage.aes")
  let fundContract = await deployer.deploy("./contracts/SuperChatFund.aes")

  fs.writeFileSync(__dirname + "/../integrations/contractData.md", `# SuperChat Contracts

## ProfileContract
- Address: ${profileContract.address}
- Owner: ${friendContract.owner}
- Transaction: ${messageContract.transaction}
- CreatedAt: ${fundContract.createdAt}

## FriendContract
- Address: ${friendContract.address}
- Owner: ${friendContract.owner}
- Transaction: ${messageContract.transaction}
- CreatedAt: ${fundContract.createdAt}

## MessageContract
- Address: ${messageContract.address}
- Owner: ${friendContract.owner}
- Transaction: ${messageContract.transaction}
- CreatedAt: ${fundContract.createdAt}

## FundContract
- Address: ${fundContract.address}
- Owner: ${friendContract.owner}
- Transaction: ${messageContract.transaction}
- CreatedAt: ${fundContract.createdAt}`)
};

module.exports = {
  deploy
};