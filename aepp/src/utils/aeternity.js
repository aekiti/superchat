import { Node, RpcAepp } from "@aeternity/aepp-sdk/es";
import Detector from "@aeternity/aepp-sdk/es/utils/aepp-wallet-communication/wallet-detector";
import BrowserWindowMessageConnection from "@aeternity/aepp-sdk/es/utils/aepp-wallet-communication/connection/browser-window-message";
import profileContractDetails from "../configs/profileContractDetails";
import friendContractDetails from "../configs/friendContractDetails";
import messageContractDetails from "../configs/messageContractDetails";
import fundContractDetails from "../configs/fundContractDetails";
import adminContractDetails from "../configs/adminContractDetails";
import nodeConfig from "../configs/nodeConfig";

let sdk,
  contractInstances = {};

let profileContract,
  friendContract,
  messageContract,
  fundContract,
  adminContract;

const scanForWallets = async () => {
  if (!sdk) throw new Error("Init sdk first");
  const scannerConnection = await BrowserWindowMessageConnection({
    connectionInfo: { id: "spy" },
  });
  const detector = await Detector({ connection: scannerConnection });

  return new Promise((resolve) => {
    detector.scan(async ({ newWallet }) => {
      if (!newWallet) return;
      await sdk.connectToWallet(await newWallet.getConnection());
      await sdk.subscribeAddress("subscribe", "current");
      let userAddress = sdk.rpcClient.getCurrentAccount();
      if (!userAddress) return;
      detector.stopScan();
      resolve(userAddress);
    });
  });
};

const initSuperchatContractIfNeeded = async () => {
  if (!sdk) throw new Error("Init sdk first");
  if (!profileContract) {
    profileContract = await sdk.getContractInstance(
      profileContractDetails.contractSource,
      {
        contractAddress: profileContractDetails.contractAddress,
      }
    );
    contractInstances.profileInstance = profileContract;
  }
  if (!friendContract) {
    friendContract = await sdk.getContractInstance(
      friendContractDetails.contractSource,
      {
        contractAddress: friendContractDetails.contractAddress,
      }
    );
    contractInstances.friendInstance = friendContract;
  }
  if (!messageContract) {
    messageContract = await sdk.getContractInstance(
      messageContractDetails.contractSource,
      {
        contractAddress: messageContractDetails.contractAddress,
      }
    );
    contractInstances.messageInstance = messageContract;
  }
  if (!fundContract) {
    fundContract = await sdk.getContractInstance(
      fundContractDetails.contractSource,
      {
        contractAddress: fundContractDetails.contractAddress,
      }
    );
    contractInstances.fundInstance = fundContract;
  }
  if (!adminContract) {
    adminContract = await sdk.getContractInstance(
      adminContractDetails.contractSource,
      {
        contractAddress: adminContractDetails.contractAddress,
      }
    );
    contractInstances.adminInstance = adminContract;
  }
};

export const initSdk = async () => {
  try {
    const node = {
      nodes: [
        {
          name: "superchat",
          instance: await Node({
            url: nodeConfig.url,
            internalUrl: nodeConfig.internalUrl,
          }),
        },
      ],
      compilerUrl: nodeConfig.compilerUrl,
    };
    sdk = await RpcAepp({
      ...node,
      name: "superchat",
      onDisconnect() {
        // store.commit('resetState');
      },
    });
    let userAddress = await scanForWallets();
    await initSuperchatContractIfNeeded();
    return { sdk, contractInstances, userAddress };
  } catch (err) {
    console.error(err);
    return;
  }
};
