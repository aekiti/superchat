const { default: config } = require('./config')
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

  const preclaim = await client.aensPreclaim(name)
  console.log(preclaim)
  const claim = await client.aensClaim(name, preclaim.salt)
  console.log(claim)
  const update = await client.aensUpdate(name, [config.publicKey])
  console.log(update)
  
}

main(config.name)