import { connectWithWallet, accountChange } from "./init";
import Web3 from "web3";

export const loadWeb3 = async () => {
  try {
    if (window.ethereum) {
      accountChange();
      window.web3 = await new Web3(window.ethereum);
      await window.ethereum.enable();
      connectWithWallet();
    } else {
      if (
        window.confirm(
          "Unable to find Ethereum in browser, Clict ok to  Install MetaMask Wallet"
        )
      ) {
        window.open(
          "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
        );
      }
    }
  } catch (err) {
    console.log(err);
  }
};
