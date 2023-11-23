// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const typechain = require("../src/types");

async function main() {
  const accounts = await hre.ethers.getSigners();
  const minter = accounts[0];
  const buyer = accounts[1];
  console.log('prepare accounts');

  const erc20 = await new typechain.MyERC20Token__factory(minter).deploy(minter.address);
  console.log('deploying erc20');
  console.log('erc20: ', erc20.target);

  const machine = await new typechain.NFTMachine__factory(minter).deploy(erc20.target);
  console.log('deploying machine');
  console.log('machine: ', machine.target);

  let tx = await erc20.connect(minter).mint(buyer.address, 10);
  console.log('tx: ', tx.hash);

  tx = await machine.connect(minter).setApprovalForAll(machine.target, true);
  console.log('tx: ', tx.hash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
