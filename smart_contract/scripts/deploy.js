// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
// const hre = require("hardhat");

const main = async () => {

  // Auction Factory contract deploy
  const auctionFactoryFactory = await hre.ethers.getContractFactory("AuctionFactory");
  const auctionFactoryContract = await auctionFactoryFactory.deploy();

  await auctionFactoryContract.deployed();

  // Simple Auction contract deploy
  const simpleAuctionFactory = await hre.ethers.getContractFactory("AuctionFactory");
  const simpleAuctionContract = await simpleAuctionFactory.deploy();

  await simpleAuctionContract.deployed();

  console.log("AuctionFactory address: ", auctionFactoryContract.address);
  console.log("SimpleAuction address: ", simpleAuctionContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain();