import { getConnectedStatus } from "./init";
import Web3 from "web3";
import { createProvider } from "./Helper";
import { connectWithWallet, getSelectedAccount } from "./init";
import {
  ERC20,
  SMARTCONTRACT_ADDRESS,
  SmartContract_WORK_WITH_NAME_GETBANANCT,
  SmartContractAddress_WORK_WITH_NAME_GETBANANCT,
  NEW_CONTRACT,
  NEW_CONTRACT_ADDRESS,
} from "../Constant/Contract";

let erc20Contract = null;
let selectedAccount = null;

export const createContract = async () => {
  const provider = createProvider();
  const web3 = new Web3(provider);
  erc20Contract = new web3.eth.Contract(NEW_CONTRACT, NEW_CONTRACT_ADDRESS);
  selectedAccount = getSelectedAccount();
};

export const getBalance = async () => {
  if (getConnectedStatus()) {
    return erc20Contract.methods.balanceOf(selectedAccount).call();
  } else {
    await connectWithWallet();
  }
};

export const getName = async () => {
  if (getConnectedStatus()) {
    return erc20Contract.methods.name().call();
  } else {
    await connectWithWallet();
  }
};

export const sendUnits = async (from, to, unit) => {
  if (getConnectedStatus()) {
    return erc20Contract.methods
      .transferFrom(from, to, unit)
      .send({ from: selectedAccount });
  } else {
    await connectWithWallet();
  }
};

export const sendFromUnits = async (to, unit) => {
  console.log(erc20Contract.methods);
  if (getConnectedStatus()) {
    return erc20Contract.methods
      .transfer(to, "1000000000000000000")
      .send({ from: selectedAccount });
  } else {
    await connectWithWallet();
  }
};

export const mintToken = async () => {
  if (getConnectedStatus()) {
    return nftContract.methods
      .mint(selectedAccount)
      .send({ from: selectedAccount });
  } else {
    await connectWithWallet();
  }
};

export const setUnits = async (units) => {
  console.log("erc20Contract", erc20Contract, units);
  if (getConnectedStatus()) {
    return erc20Contract.methods.set(units).send({ from: selectedAccount });
  } else {
    await connectWithWallet();
  }
};

export const getUnits = async () => {
  console.log("erc20Contract", erc20Contract);
  if (getConnectedStatus()) {
    return erc20Contract.methods.get().call();
  } else {
    await connectWithWallet();
  }
};
