const { expect } = require("chai");
const { ethers } = require("hardhat");

const TIME_END = 3600 * 25;
const ACCOUNT_0 = '0xd405Dc6A4E49B6879862F093d11a0fe0c5547a9F';

describe("SimpleAuction", function () {
    this.timeout(5000);
    let contract;

    // this.beforeEach(async () => {
    //     const saContract = await ethers.getContractFactory("SimpleAuction");
    //     contract = await saContract.deploy();
    // });

    describe("constructor", async = () => {
        it("Verifies time for ending of simple auction", async () => {
            const saContract = await ethers.getContractFactory("SimpleAuction");
            contract = await saContract.deploy(TIME_END, ACCOUNT_0);
            auctionTime = await contract.auctionEndTime()
            expect(parseInt((await auctionTime)._hex, 16) * 1000).to.greaterThan(Date.now());
        });
    });

    describe("testing bid function", async = () => {
        beforeEach(async () => {
            const saContract = await ethers.getContractFactory("SimpleAuction");
            contract = await saContract.deploy(TIME_END, ACCOUNT_0);
        });

        it("valid bid", async () => {
            await contract.bid({
                value: ethers.utils.parseUnits('1'),
                gasLimit: '3000000' });
            highestBid = await contract.highestBid();
            expect(parseInt((await highestBid)._hex, 16)/10 ** 18).to.equals(1);
        });

        it("invalid bid", async () => {
            await contract.bid({
                value: ethers.utils.parseUnits('2'),
                gasLimit: '3000000' });
            highestBid = await contract.highestBid();
            expect(parseInt((await highestBid)._hex, 16)/10 ** 18).to.equals(2);
            try {
                await contract.bid({
                    value: ethers.utils.parseUnits('1'),
                    gasLimit: '3000000' });
                highestBid = await contract.highestBid();
            } catch (error) {
                expect(parseInt((await highestBid)._hex, 16)/10 ** 18).to.equals(2);
            }
        });
    });


    describe("testing withdraw function", async = () => {
        beforeEach(async () => {
            const saContract = await ethers.getContractFactory("SimpleAuction");
            contract = await saContract.deploy(TIME_END, ACCOUNT_0);
        });

        it("invalid withdraw", async () => {
            pendingReturn = await contract.pendingReturns(ACCOUNT_0) || 0x00;
            expect(parseInt((await pendingReturn)._hex, 16)/ 10 ** 18).to.equals(0);
            await contract.bid({
                value: ethers.utils.parseUnits('1'),
                gasLimit: '3000000' });
            highestBid = await contract.highestBid();
            await contract.withdraw();
            expect(parseInt((await pendingReturn)._hex, 16)/ 10 ** 18).to.equals(0);
        });

        it("valid withdraw", async () => {
            await contract.bid({
                value: ethers.utils.parseUnits('1'),
                gasLimit: '3000000' });
            await contract.bid({
                value: ethers.utils.parseUnits('2'),
                gasLimit: '3000000' }).then(async () => {
                    pendingReturn = await contract.pendingReturns(ACCOUNT_0) || 0x00;
                    expect(parseInt((await pendingReturn)._hex, 16)/ 10 ** 18).to.equals(1);
                    await contract.withdraw().then(async () => {
                        pendingReturn = await contract.pendingReturns(ACCOUNT_0) || 0x00;
                        expect(parseInt((await pendingReturn)._hex, 16)/ 10 ** 18).to.equals(0);
                    })
                })
        });
    });

    describe("testing auctionEnd function", async = () => {
        it("valid auctionEnd", async () => {
            const saContract = await ethers.getContractFactory("SimpleAuction");
            contract = await saContract.deploy(2, ACCOUNT_0);
            setTimeout(async () => {
                await contract.auctionEnd();
                pass = false;
                try{
                    await contract.auctionEnd();
                    pass = true;
                } catch (error) {
                    expect(pass).to.equals(false);
                }
            },2200)
        });

        it("invalid auctionEnd", async () => {
            const saContract = await ethers.getContractFactory("SimpleAuction");
            contract = await saContract.deploy(TIME_END, ACCOUNT_0);
            pass = false;
            try{
                await contract.auctionEnd();
                pass = true;
            } catch (error) {
                expect(pass).to.equals(false);
            }
        });
    });
})