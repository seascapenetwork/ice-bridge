// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "./IERC20.sol";

contract BscLock {
  using SafeERC20 for IERC20;

  IERC20 private token;
  IERC20Mintable private mintableToken;
  address public tokenAddress;

  address public deck;

  event Minted(address indexed token, address indexed owner, uint256 amount);
  event Burnt(address indexed token, address indexed owner, uint256 amount);

  constructor(address _token, address _deck) public {
    token = IERC20(_token);
    mintableToken = IERC20Mintable(_token);
    tokenAddress = _token;
    deck = _deck;
  }

  /// @dev Restricted to members of the Deck role.
  modifier onlyDeck() {
	  require(msg.sender == deck, "Restricted to deck.");
	  _;
  }

  function mint(address _account, uint256 _amount) onlyDeck external {
    mintableToken.mint(_account, _amount);

    emit Minted(tokenAddress, _account, _amount);
  }

  function burn(uint256 _amount) external {
    token.safeTransferFrom(msg.sender, address(this), _amount);
    mintableToken.burn(_amount);

    Burnt(tokenAddress, msg.sender, _amount);
  }
}
