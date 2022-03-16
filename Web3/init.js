import Web3 from "web3";
import MigrationsBuild from "../truffle/build/contracts/NFT.json";

let selectedAccount = '';
let connectWeb3 = false;
let nftContract = null;
let erc20Contract = null;

export const initWeb3 = async() => {
  const providerUrl = "https://localhost:8545";
  let provider = window.ethereum;
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
          console.log(err)
        });
    window.ethereum.on("accountsChanged", (changeddAccount) => {
        selectedAccount=changeddAccount[0];
      console.log(changeddAccount);
    });
  }
  const web3 = new Web3(provider);
  const networkId = await web3.eth.net.getId();
  console.log('networkId', networkId, MigrationsBuild.networks)
  //nftContract = new web3.eth.Contract(MigrationsBuild.abi, MigrationsBuild.networks[networkId].address)
  const erc20 = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
  ];
  erc20Contract = new web3.eth.Contract(erc20, '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea');

};

export const getBalance = async() => {
    if(connectWeb3) {
    return erc20Contract.methods.balanceOf(selectedAccount).call();
    }else {
        await initWeb3();
    }
}

export const mintToken = async() => {
    if(connectWeb3) {
        return nftContract.methods.mint(selectedAccount).send({from: selectedAccount})
    } else {
        await initWeb3();
    }
}
