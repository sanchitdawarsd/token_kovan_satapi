require('dotenv').config()
var express = require('express');
var async = require('async');
var Web3 = require('web3');
var eth = require('web3-eth')
const fs = require('fs');
const path = require('path');
const Tx = require('ethereumjs-tx').Transaction





const app = express();
app.use(express.json());



var Infura_kovan = process.env.INFURA_KEY_KOVAN;
const contractAddress = process.env.CONTRACT_ADDRESS_KOVAN;
const account = process.env.OWNER_ACC;
const privateKey = Buffer.from(process.env.PRIV_KEY.substring(2, 66), 'hex')


// console.log("INFURA", Infura_kovan, "ABI \n", ccp.abi)
const web3 = new Web3(Infura_kovan)
const port = 7000;


const myContract = new web3.eth.Contract([
  {
    "constant": false,
    "inputs": [],
    "name": "acceptOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner_",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "value",
        "type": "bool"
      }
    ],
    "name": "blackListUser",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "BurnByOwner",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "_callSender",
        "type": "address"
      }
    ],
    "name": "callSenderAddress",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "epoch",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "totalSupply",
        "type": "uint256"
      }
    ],
    "name": "LogRebase",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_to",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "pause",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [],
    "name": "Pause",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "supplyDelta",
        "type": "uint256"
      }
    ],
    "name": "rebase",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "_newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "unpause",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [],
    "name": "Unpause",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "owner_",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "who",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "blacklisted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "callSender",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
      }
    ],
    "name": "isBlackListed",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "newOwner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "paused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
], contractAddress, {
  defaultAccount: account, // default from address
  defaultGasPrice: '3000000' // default gas price in wei, 20 gwei in this case
});





app.get('/balanceof', (req, res) => {
  const address = req.body.address;
  myContract.methods.balanceOf(address.toString()).call().then(function (data) {
    console.log("\n Balance of \t", data);
    res.json({ "Success": 1, "balance": data })
  }).catch(function (err) {
    res.json({ "Success": 0, "Error": err })
    console.log(err);
  });
})


app.post('/transfer', async (req, res) => {
  var recepient = req.body.recepient;
  var amount = req.body.amount;


  const tx = myContract.methods.transfer(recepient, amount);
  const gas = await tx.estimateGas({ from: account });
  const gasPrice = await web3.eth.getGasPrice();
  const data = tx.encodeABI();
  const nonce = await web3.eth.getTransactionCount(account);

  try {
    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: myContract.options.address,
        data,
        gas,
        gasPrice,
        nonce,
        chainId: 42,
      },
      process.env.PRIV_KEY
    );

    var txx = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    res.json({ Success: 1, TransactionData: { amount: req.body.amount, recepient: req.body.recepient, transactionhash: txx.logs[0].transactionHash } })

  } catch (e) {
    console.log(e)
  }
})

app.post('/rebase', async (req, res) => {
  var supplydelta = req.body.supplydelta;

  const tx = myContract.methods.rebase(supplydelta);
  const gas = await tx.estimateGas({ from: account });
  const gasPrice = await web3.eth.getGasPrice();
  const data = tx.encodeABI();
  const nonce = await web3.eth.getTransactionCount(account);

  try {
    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: myContract.options.address,
        data,
        gas,
        gasPrice,
        nonce,
        chainId: 42,
      },
      process.env.PRIV_KEY
    );

    var txx = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    res.json({ Success: 1, TransactionData: { supplydelta: req.body.supplydelta, transactionhash: txx.logs[0].transactionHash } })

  } catch (e) {
    console.log(e)
  }
})


app.post('/mint', async (req, res) => {
  var accounts = req.body.accounts;
  var amount = req.body.amount;


  const tx = myContract.methods.mint(accounts, amount);
  const gas = await tx.estimateGas({ from: account });
  const gasPrice = await web3.eth.getGasPrice();
  const data = tx.encodeABI();
  const nonce = await web3.eth.getTransactionCount(account);

  try {
    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: myContract.options.address,
        data,
        gas,
        gasPrice,
        nonce,
        chainId: 42,
      },
      process.env.PRIV_KEY
    );

    var txx = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    res.json({ Success: 1, TransactionData: { amount: req.body.amount, acounts: req.body.accounts, transactionhash: txx.logs[0].transactionHash } })

  } catch (e) {
    console.log(e)
  }
})

app.post('/burn', async (req, res) => {
  var accounts = req.body.accounts;
  var amount = req.body.amount;


  const tx = myContract.methods.BurnByOwner(accounts, amount);
  const gas = await tx.estimateGas({ from: account });
  const gasPrice = await web3.eth.getGasPrice();
  const data = tx.encodeABI();
  const nonce = await web3.eth.getTransactionCount(account);

  try {
    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: myContract.options.address,
        data,
        gas,
        gasPrice,
        nonce,
        chainId: 42,
      },
      process.env.PRIV_KEY
    );

    var txx = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    res.json({ Success: 1, TransactionData: { amount: req.body.amount, accounts: req.body.accounts, transactionhash: txx.logs[0].transactionHash } })

  } catch (e) {
    console.log(e)
  }
})










// Start the server
const server = app.listen(port, (error) => {
  if (error) return console.log(`Error: ${error}`);

  console.log(`Server listening on port ${server.address().port}`);
})
