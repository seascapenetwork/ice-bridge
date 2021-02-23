const EthLock = artifacts.require("EthLock");
const SampleToken = artifacts.require("SampleToken");

var accounts;
var lock;
var sampleToken;



/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("EthLock", async function (accounts) {
  it("1. should prepare the data", async function () {
    sampleToken = await SampleToken.deployed();

    lock = await EthLock.deployed();

    return assert.isTrue(true);
  });

  it("2. should lock Sample Token", async function () {
    await sampleToken.transfer(accounts[1], web3.utils.toWei("100"));

    await sampleToken.transfer(lock.address, web3.utils.toWei("100"), {from: accounts[1]});

    return assert.isTrue(true);
  });

  it("3. should withdraw Sample Token", async function () {
    let amount = web3.utils.toWei("100");

    //v, r, s related stuff
    let nonce = 1;
    let bytes32 = web3.eth.abi.encodeParameters(["uint256", "uint256"], [amount, nonce]);
    let data = web3.utils.keccak256(accounts[1] + bytes32.substr(2));
    let hash = await web3.eth.sign(data, accounts[0]);

    let r = hash.substr(0,66);
    let s = "0x" + hash.substr(66,64);
    let v = parseInt(hash.substr(130), 16);
    if (v < 27) {
        v += 27;
    }
    let signature = [v, r, s];

    await lock.withdraw(signature[0], signature[1], signature[2], web3.utils.toWei("100"), {from: accounts[1]});

    return assert.isTrue(true);
  });
});
