var EthLock = artifacts.require("EthLock");
var SampleToken = artifacts.require("SampleToken");

module.exports = async function(_deployer) {
  let accounts = await web3.eth.getAccounts();

  let sampleToken = await SampleToken.deployed();

  // Use deployer to state migration tasks.
  await _deployer.deploy(EthLock, sampleToken.address, accounts[0]);
  console.log("EthLock Token address: "+EthLock.address+" with a validator "+accounts[0]);
};
