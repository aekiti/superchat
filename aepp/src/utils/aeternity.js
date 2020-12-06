import { MemoryAccount, Node, Universal } from "@aeternity/aepp-sdk/es";
import Detector from "@aeternity/aepp-sdk/es/utils/aepp-wallet-communication/wallet-detector";
import BrowserWindowMessageConnection from "@aeternity/aepp-sdk/es/utils/aepp-wallet-communication/connection/browser-window-message";
import profileContractDetails from "../configs/profileContractDetails";
import friendContractDetails from "../configs/friendContractDetails";
import messageContractDetails from "../configs/messageContractDetails";
import fundContractDetails from "../configs/fundContractDetails";
import nodeConfig from "../configs/nodeConfig";
import keyPair from "../configs/keyPair";

let sdk,
  contractInstances = {};
let profileContract, friendContract, messageContract, fundContract;

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
};

export const initSdk = async () => {
  try {
    const common = {
      nodes: [
        {
          name: "node",
          instance: await Node({
            url: nodeConfig.url,
            internalUrl: nodeConfig.internalUrl,
          }),
        },
      ],
      compilerUrl: nodeConfig.compilerUrl,
    };
    sdk = await Universal({
      ...common,
      accounts: [
        MemoryAccount({
          keypair: {
            secretKey: keyPair.privateKey,
            publicKey: keyPair.publicKey,
          },
        }),
      ],
      address: keyPair.publicKey,
    });
    sdk.rpcClient = {
      getCurrentAccount: async () => await scanForWallets(),
    };
    await initSuperchatContractIfNeeded();
    return contractInstances;
  } catch (err) {
    console.error(err);
    return;
  }
};

const scanForWallets = async () => {
  const scannerConnection = await BrowserWindowMessageConnection({
    connectionInfo: { id: "spy" },
  });
  const detector = await Detector({ connection: scannerConnection });

  return new Promise((resolve) => {
    detector.scan(async ({ newWallet }) => {
      if (!newWallet) return;
      await sdk.connectToWallet(await newWallet.getConnection());
      await sdk.subscribeAddress("subscribe", "current");
      const address = sdk.rpcClient.getCurrentAccount();
      if (!address) return;
      detector.stopScan();
      resolve(address);
    });
  });
};
