// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @notice The centrlized version of the Ice Bridge.
/// The next version is planned to be without any validator using the Chain Link oracles.
/// In a long term plan, the bridge will support multiple tokens.
contract EthLock {
  IERC20 private token;
  address public tokenAddress;
  address public validator;
  uint256 public withdrawAmount = 1; // prevent double spending

  address private owner;

  mapping(address => uint256) public balance;

  event Withdrawn(address indexed token, address indexed owner, uint256 indexed withdrawAmount, uint256 amount);

  /// Notice, that only owner of the token can add it.
  constructor(address _token, address _validator) public {
    token = IERC20(_token);
    tokenAddress = _token;
    validator = _validator;
    owner = address(msg.sender);
  }

  function withdraw(uint8 _v, bytes32 _r, bytes32 _s, uint256 _amount) public {
	  bytes memory _prefix = "\x19Ethereum Signed Message:\n32";
  	bytes32 _messageNoPrefix = keccak256(abi.encodePacked(msg.sender, _amount, withdrawAmount));
	  bytes32 _message = keccak256(abi.encodePacked(_prefix, _messageNoPrefix));
	  address _recover = ecrecover(_message, _v, _r, _s);

	  require(_recover == owner, "Verification of signature failed");
	
    token.transfer(address(uint160(msg.sender)), _amount);

	  emit Withdrawn(tokenAddress, msg.sender, withdrawAmount, _amount);

    withdrawAmount = withdrawAmount + 1;
  }
}
