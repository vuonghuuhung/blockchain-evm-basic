// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyFirstToken is ERC20, Ownable {
    constructor(address initialOwner) ERC20("MyFirstToken", "MFT") Ownable(initialOwner) {
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}