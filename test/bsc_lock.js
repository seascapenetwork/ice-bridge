const BscLock = artifacts.require("BscLock");
const BscSampleToken = artifacts.require("BscSampleToken");

var accounts;
var lock;
var bscSampleToken;



/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("BscLock contract:", async function (accounts) {
  it("1. should prepare the data", async function () {
    bscSampleToken = await BscSampleToken.deployed();

    lock = await BscLock.deployed();

    return assert.isTrue(true);
  });

  it("2. should mint Sample Token for player", async function () {
    let amount = web3.utils.toWei("100");

    await lock.mint(accounts[1], amount, {from: accounts[0]});

    return assert.isTrue(true);
  });

  it("3. should burn Sample Token from player", async function () {
    let amount = web3.utils.toWei("100");

    await bscSampleToken.approve(lock.address, amount, {from: accounts[1]});

    await lock.burn(amount, {from: accounts[1]});

    return assert.isTrue(true);
  });
});
