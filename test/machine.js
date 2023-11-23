const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const typechain = require("../src/types");

describe("Machine test", function () {
    async function prepare() {
        const accounts = await ethers.getSigners();
        const [minter, buyer] = accounts;
        const erc20 = await new typechain.MyERC20Token__factory(minter).deploy(minter.address);
        const machine = await new typechain.NFTMachine__factory(minter).deploy(erc20.target);
        await erc20.connect(minter).mint(buyer.address, 10);
        await machine.connect(minter).setApprovalForAll(machine.target, true);
        const bool = await machine.isApprovedForAll.staticCall(minter.address, machine.target)
        console.log(bool);
        await machine.connect(minter).mintNewNFT("nft1", 1);
        await machine.connect(minter).mintNewNFT("nft2", 1);
        await machine.connect(minter).mintNewNFT("nft3", 1);
        const allNFTs = await machine.getAllNFT.staticCall();
        console.log(allNFTs);
        await erc20.connect(buyer).approve(machine.target, 1);
        await machine.connect(buyer).buyNFT(0);
        const owner = await machine.ownerOf(0);
        console.log(`${owner} ${buyer.address}`);
    }

    it("test", async function () {
        await loadFixture(prepare);
    })
});