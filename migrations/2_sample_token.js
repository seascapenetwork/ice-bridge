var SampleToken = artifacts.require("./SampleToken.sol");
var BscSampleToken = artifacts.require("./BscSampleToken.sol");

let million = web3.utils.toWei("1000000");

module.exports = async function(_deployer) {
  // Use deployer to state migration tasks.
  await _deployer.deploy(SampleToken, "Sample", "SMPL", million);
  await _deployer.deploy(BscSampleToken, "Bsc Sample", "bSMPL");

  console.log("Sample Token address: "+SampleToken.address);
  console.log("Sample Token address on Bsc: "+BscSampleToken.address);
};
