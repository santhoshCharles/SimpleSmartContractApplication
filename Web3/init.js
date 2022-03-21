import Web3 from "web3";
//import MigrationsBuild from "../truffle/build/contracts/NFT.json";
import { createProvider } from "./Helper";
import { createContract } from "./ConnectWithSmartContract";

let selectedAccount = "";
let connectWeb3 = false;
let provider = null;

export const getConnectedStatus = () => connectWeb3;

export const getSelectedAccount = () => selectedAccount;

export const connectWithWallet = async () => {
  provider = createProvider();
  if (typeof provider !== "undefined") {
    provider
      .request({ method: "eth_requestAccounts" })
      .then((account) => {
        selectedAccount = account[0];
        connectWeb3 = true;
        console.log(account);
      })
      .catch((err) => {
        connectWeb3 = false;
        console.log(err);
      });
  }
  const web3 = new Web3(provider);
  const networkId = await web3.eth.net.getId();
  console.log("networkId", networkId, MigrationsBuild.networks);
  await createContract();
};

export const accountChange = () => {
  window.ethereum.on("accountsChanged", (changeddAccount) => {
    selectedAccount = changeddAccount[0];
    console.log(changeddAccount);
  });
};
