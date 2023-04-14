// SPDX-License-Identifier: CC0-1.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./IZkBobDirectDeposits.sol";

contract SendDeposit {

    IERC20 public bob;
    IZkBobDirectDeposits public zkBob;

    constructor(address _bob, address _zkBob) {
        bob = IERC20(_bob);
        zkBob = IZkBobDirectDeposits(_zkBob);
    }

    function deposit(string memory _zkAddress) external {
        bob.approve(address(zkBob), 1000000000000000000);
        zkBob.directDeposit(msg.sender, 1000000000000000000, _zkAddress);
    }
}