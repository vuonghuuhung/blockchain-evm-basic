// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract SimpleStorage {
    uint storageData;

    function set(uint newData) public {
        storageData = newData;
    }

    function get() public view returns (uint) {
        return storageData;
    }
}