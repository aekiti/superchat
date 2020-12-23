const config = require('./config')
const { Universal: Ae, MemoryAccount, Node } = require('@aeternity/aepp-sdk')

const main = async (name) => {
  const node = await Node({ url: config.url, internalUrl: config.internalUrl })
  const acc = MemoryAccount({
    keypair: {
      publicKey: config.publicKey,
      secretKey: config.privateKey
    }
  })

  const client = await Ae({
    nodes: [
      { name: 'superchat', instance: node },
    ],
    accounts: [
      acc,
    ],
  })

  await client.aensPreclaim(name).then((preclaim) => {
    console.log("AENS Preclaim", preclaim);

    await client.aensClaim(name, preclaim.salt).then((result) => console.log("AENS Claim", result)).catch((e) => console.error("AENS Claim", e)) 
  }).catch((e) => console.error("AENS Preclaim", e))

  await client.aensQuery(name).then((result) => console.log("AENS Query", result)).catch((e) => console.error("AENS Query", e))

  await client.aensUpdate(name, [config.publicKey]).then((result) => console.log("AENS Update", result)).catch((e) => console.error("AENS Update", e))

  await client.aensTransfer(name, config.recipientPub).then((result) => console.log("AENS Transfer", result)).catch((e) => console.error("AENS Transfer", e))
}

main(config.name)