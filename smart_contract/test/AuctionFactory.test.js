const { expect } = require("chai");
const { ethers } = require("hardhat");

const TIME_END = 3600 * 25;
const ACCOUNT_0 = '0xd405Dc6A4E49B6879862F093d11a0fe0c5547a9F';
const ACCOUNT_1 = '0x5A8d0065d09d34D3bacc90e72FB2080AC3033025';

describe("AuctionFactory", function () {
    this.timeout(5000);
    let contract;


    describe("testing createAuction function", async = () => {
        beforeEach(async () => {
            const afContract = await ethers.getContractFactory("AuctionFactory");
            contract = await afContract.deploy();
        });

        it("test valid auction creation", async () => {
            await contract.createAuction(TIME_END);
            auctions = await contract.getAllAuctions();
            owners = await contract.getOwners();
            expect(auctions.length).to.equals(1);
            expect(owners.length).to.equals(1);
        });
    });

    describe("testing canRate function", async = () => {
        beforeEach(async () => {
            const afContract = await ethers.getContractFactory("AuctionFactory");
            contract = await afContract.deploy();
        });

        // it("test valid canRate", async () => {
        //     auctionAddress = await contract.createAuction(TIME_END);
        //     auctions = await contract.getAllAuctions();
        //     owners = await contract.getOwners();
        //     expect(auctions.length).to.equals(1);
        //     expect(owners.length).to.equals(1);
        
        //     [deployer, account1, account2] = await ethers.getSigners();
        //     saContract = await ethers.getContractFactory("SimpleAuction");
        //     console.log(auctionAddress.to)
        //     contractAuctionAttached = await saContract.attach(await auctionAddress.to);
        //     console.log(contractAuctionAttached)
        //     console.log(account2)
        //     await contractAuctionAttached.connect(await account2).functions.bid({
        //         value: ethers.utils.parseUnits('5'),
        //         gasLimit: '3000000' });
        //     // isRateValid = await contract.connect(account1).canRate();
        //     // expect(await isRateValid).to.equal(true);
        // });

        it("test invalid canRate", async () => {
            auctionAddress = await contract.createAuction(TIME_END);
            auctions = await contract.getAllAuctions();
            owners = await contract.getOwners();
            expect(auctions.length).to.equals(1);
            expect(owners.length).to.equals(1);
        
            isRateValid = await contract.canRate(ACCOUNT_0, auctionAddress.to);
            expect(await isRateValid).to.equal(false);
        });

        it("test invalid rate", async () => {
            auctionAddress = await contract.createAuction(TIME_END);
            pass = false;
            try{
                await contract.rate(ACCOUNT_0, auctionAddress.to, 5);
                pass = true;
            } catch (error) {
                expect(await pass).to.equal(false);
            }
        });
    });

})