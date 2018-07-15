/*
Maintainer: Parithosh Jayanthi  parithosh.jayanthi@tum.de
Web application to  list the ENS contract events,especially the BidRevealed events
*/

// Add the web3 node module
//var Web3 = require('web3');

// Show web3 where it needs to look for the Ethereum node.
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want, if it is a local instance, use the local port
  web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/_ws'));       }


// Define the contract ABI 
var abi = [{"constant":false,"inputs":[{"name":"_hash","type":"bytes32"}],"name":"releaseDeed","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_hash","type":"bytes32"}],"name":"getAllowedTime","outputs":[{"name":"timestamp","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"unhashedName","type":"string"}],"name":"invalidateName","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"hash","type":"bytes32"},{"name":"owner","type":"address"},{"name":"value","type":"uint256"},{"name":"salt","type":"bytes32"}],"name":"shaBid","outputs":[{"name":"sealedBid","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"bidder","type":"address"},{"name":"seal","type":"bytes32"}],"name":"cancelBid","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_hash","type":"bytes32"}],"name":"entries","outputs":[{"name":"","type":"uint8"},{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"ens","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_hash","type":"bytes32"},{"name":"_value","type":"uint256"},{"name":"_salt","type":"bytes32"}],"name":"unsealBid","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_hash","type":"bytes32"}],"name":"transferRegistrars","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"}],"name":"sealedBids","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_hash","type":"bytes32"}],"name":"state","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_hash","type":"bytes32"},{"name":"newOwner","type":"address"}],"name":"transfer","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_hash","type":"bytes32"},{"name":"_timestamp","type":"uint256"}],"name":"isAllowed","outputs":[{"name":"allowed","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_hash","type":"bytes32"}],"name":"finalizeAuction","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"registryStarted","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"launchLength","outputs":[{"name":"","type":"uint32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"sealedBid","type":"bytes32"}],"name":"newBid","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"labels","type":"bytes32[]"}],"name":"eraseNode","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_hashes","type":"bytes32[]"}],"name":"startAuctions","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"hash","type":"bytes32"},{"name":"deed","type":"address"},{"name":"registrationDate","type":"uint256"}],"name":"acceptRegistrarTransfer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_hash","type":"bytes32"}],"name":"startAuction","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"rootNode","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"hashes","type":"bytes32[]"},{"name":"sealedBid","type":"bytes32"}],"name":"startAuctionsAndBid","outputs":[],"payable":true,"type":"function"},{"inputs":[{"name":"_ens","type":"address"},{"name":"_rootNode","type":"bytes32"},{"name":"_startDate","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"hash","type":"bytes32"},{"indexed":false,"name":"registrationDate","type":"uint256"}],"name":"AuctionStarted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"hash","type":"bytes32"},{"indexed":true,"name":"bidder","type":"address"},{"indexed":false,"name":"deposit","type":"uint256"}],"name":"NewBid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"hash","type":"bytes32"},{"indexed":true,"name":"owner","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"status","type":"uint8"}],"name":"BidRevealed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"hash","type":"bytes32"},{"indexed":true,"name":"owner","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"registrationDate","type":"uint256"}],"name":"HashRegistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"hash","type":"bytes32"},{"indexed":false,"name":"value","type":"uint256"}],"name":"HashReleased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"hash","type":"bytes32"},{"indexed":true,"name":"name","type":"string"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"registrationDate","type":"uint256"}],"name":"HashInvalidated","type":"event"}]


// Define the contract ABI and Address
var contract = new web3.eth.Contract(abi, '0x6090A6e47849629b7245Dfa1Ca21D94cd15878Ef');

// Creating an async function to handle the function, ensures the promise is completed
asyncCall()

async function asyncCall() {
  //using await to wait for resolution
  //the result tells us the rounded block number 1 day ago
  //
  var block_number_1day_ago = await resolveAfter2Seconds();

  contract.getPastEvents('BidRevealed',{ //Change 'BidRevealed' to the event filter required
    filter: {fromBlock: block_number_1day_ago, toBlock: 'latest'},  //filter to get events only from the past day
    fromBlock: block_number_1day_ago
  }, function(error, event){ 
    if (error) {
      return console.log(error); //All the errors would be sent to the console, access through inspect
    }

    buildCollapsible(event);  //handles the visuals
          
  })
}

//handles the resolution of the promise
function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      const bl = web3.eth.getBlock('latest'); //gets the latest block, in order to get the range needed
      bl.then(function(result){
          
          var avg_block_time = 14 //The average block time for ethereum is 14 seconds, change for different values
          var test = result.number - (86400/avg_block_time) 
          //Gives an estimate block time 86400 = seconds in a day. Seconds in a day/seconds per block gives us the blocks in the past day

          resolve(Math.floor(test)) //the result would be in decimals, rounding down since blocks are whole numbers
      })
    }, 2000);
  });
}


 
//Function to build DOM element of a collapsible given an input array 
function buildCollapsible(arr) {
  // Clear the loading element
  $("#bidEvents").html("");

  // Iterate through the array of events to display, iterating in reverse to allow latest event on top
  arr.reverse().forEach(ele => {

    // Build Table element
    var tableEle = "\
      <table>\
        <thead>\
          <tr>\
              <th>Property</th><th>Value</th>\
          </tr>\
        </thead>\
      <tbody>"

    Object.keys(ele).forEach(key => {
      // Objects dont render correctly hence filter them out and handle separately
      if (typeof ele[key] != "object" ) {
        tableEle += "<tr><td>" + key + "</td><td>" + ele[key] + "</td></tr>"
      }
    });

    tableEle += "</tbody></table>";

    // Build Collapsible DOM Element
    //in order to change the heading, change the collapsible header class
    var collapseEle = '\
      <li>\
        <div class="collapsible-header"><i class="material-icons">monetization_on</i>' + 'Block Number:' + ele.blockNumber + '</div>\
        <div class="collapsible-body">' + tableEle + '</div>\
      </li>'

      $("#bidEvents").append($(collapseEle));
  });

  // Initialize the collapsible
  $('.collapsible').collapsible();
}





