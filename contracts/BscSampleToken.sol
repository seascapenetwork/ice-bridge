// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";

contract BscSampleToken is ERC20Burnable {
  constructor(string memory name, string memory symbol) public ERC20(name, symbol) {
  }

  function mint(address _account, uint256 _amount) public returns(bool) {
    _mint(_account, _amount);
    return true;
  }
}
