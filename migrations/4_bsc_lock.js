var BscLock = artifacts.require("BscLock");
var BcsSampleToken = artifacts.require("BscSampleToken");

module.exports = async function(_deployer) {
  let accounts = await web3.eth.getAccounts();

  let bscSampleToken = await BcsSampleToken.deployed()
     
  // Use deployer to state migration tasks.
  await _deployer.deploy(BscLock, bscSampleToken.address, accounts[0]);
  console.log("BscLock Token address: "+BscLock.address+" with a validator "+accounts[0]);
};
