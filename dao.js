const Web3 = require('web3');
const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));


const date = new Date();
const minTimestamp = date.setHours(date.getHours() - 1) / 1000;
console.log('Retreiving all transactions from', date);
var obj
web3.eth.isSyncing().then((result) => {
  console.log(result);
  obj = result
})
console.log(obj)


/*
const {currentBlock, highestBlock} = web3.eth.isSyncing();
if(currentBlock < highestBlock) {
  console.log('Warning! Node is not synced:\n');
}

let blockNum = web3.eth.blockNumber;
const transactions = [];

while(true) {
  const block = web3.eth.getBlock(blockNum);
  if(block.timestamp < minTimestamp) break;
  transactions.push.apply(transactions, block.transactions);
  --blockNum;
}

console.log('Retreived', transactions.length, 'transactions');


const total = transactions.reduce(
  (sum, tx) => web3.eth.getTransaction(tx).value.plus(sum),
  new web3.BigNumber(0)
);

console.log('Total value is', web3.fromWei(total, 'ether').toNumber(), 'Ether');
*/