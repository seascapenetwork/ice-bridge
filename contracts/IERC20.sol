// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20Mintable {
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function mint(address account, uint256 amount) external returns (bool);

    /**
     * @dev Burns.
     */
    function burn(uint256 amount) external;
}
