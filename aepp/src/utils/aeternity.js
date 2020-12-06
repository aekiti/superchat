import { Node, RpcAepp } from '@aeternity/aepp-sdk/es';
import Detector from '@aeternity/aepp-sdk/es/utils/aepp-wallet-communication/wallet-detector';
import BrowserWindowMessageConnection from '@aeternity/aepp-sdk/es/utils/aepp-wallet-communication/connection/browser-window-message';
import profileContractDetails from '../configs/profileContractDetails';
import friendContractDetails from '../configs/friendContractDetails';
import messageContractDetails from '../configs/messageContractDetails';
import fundContractDetails from '../configs/fundContractDetails';
import adminContractDetails from '../configs/adminContractDetails';
import nodeConfig from '../configs/nodeConfig';

let sdk;
let profileContract, friendContract, messageContract, fundContract, adminContract;

const initSuperchatContractIfNeeded = async () => {
  if (!sdk) throw new Error('Init sdk first');
  if (!profileContract) {
    profileContract = await sdk.getContractInstance(profileContractDetails.contractSource, {
      contractAddress: profileContractDetails.contractAddress,
    });
    console.log('Profile Instance', profileContract);
  }
  if (!friendContract) {
    friendContract = await sdk.getContractInstance(friendContractDetails.contractSource, {
      contractAddress: friendContractDetails.contractAddress,
    });
    console.log('Friend Instance', friendContract);
  }
  if (!messageContract) {
    messageContract = await sdk.getContractInstance(messageContractDetails.contractSource, {
      contractAddress: messageContractDetails.contractAddress,
    });
    console.log('Message Instance', messageContract);
  }
  if (!fundContract) {
    fundContract = await sdk.getContractInstance(fundContractDetails.contractSource, {
      contractAddress: fundContractDetails.contractAddress,
    });
    console.log('Fund Instance', fundContract);
  }
  if (!adminContract) {
    adminContract = await sdk.getContractInstance(adminContractDetails.contractSource, {
      contractAddress: adminContractDetails.contractAddress,
    });
    console.log('Admin Instance', adminContract);
  }
};

export const initSdk = async () => {
  try {
    const node = {
      nodes: [{ 
        name: 'node', 
        instance: await Node({ 
          url: nodeConfig.url, 
          internalUrl: nodeConfig.internalUrl 
        }) 
      }],
      compilerUrl: nodeConfig.compilerUrl,
    };
    sdk = await RpcAepp({
      ...node,
      name: 'superchat',
      onDisconnect() {
        // store.commit('resetState');
      },
    });
    await scanForWallets();
    await initSuperchatContractIfNeeded();
    return sdk;
  } catch (err) {
    console.error(err);
    return;
  }
};

const scanForWallets = async () => {
  const scannerConnection = await BrowserWindowMessageConnection({
    connectionInfo: { id: 'spy' },
  });
  const detector = await Detector({ connection: scannerConnection });

  return new Promise((resolve) => {
    detector.scan(async ({ newWallet }) => {
      if (!newWallet) return;
      await sdk.connectToWallet(await newWallet.getConnection());
      await sdk.subscribeAddress('subscribe', 'current');
      const address = sdk.rpcClient.getCurrentAccount();
      console.log('Current User Address', address);
      if (!address) return;
      detector.stopScan();
      resolve(address);
    });
  });
};