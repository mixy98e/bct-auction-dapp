import React, { useEffect, useState } from 'react';
import { ethers, BigNumber } from 'ethers';

import { contractABIAuctionFactory, contractAddressFactory, contractABISimpleAuction } from '../utils/constants';
import hexToEth from '../utils/hexToEth';
import hexToDecimal from '../utils/hexToDecimal';
import compareDate from '../utils/compareDate';


export const AuctionFactoryContext = React.createContext();

const { ethereum } = window;
const provider = new ethers.providers.Web3Provider(ethereum);

const getFactoryEthereumContract = () => {
    const signer = provider.getSigner();
    const auctionFactoryContract = new ethers.Contract(contractAddressFactory, contractABIAuctionFactory, signer);
    return auctionFactoryContract;
}

const getSimpleAuctionEthereumContract = (contractAddress) => {
    const signer = provider.getSigner();
    const simpleAuctionContract = new ethers.Contract(contractAddress, contractABISimpleAuction, signer);
    return simpleAuctionContract;
}


export const AuctionFactoryProvider = ({children}) => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({ unitOfTime: '', time: '' });
    // const [bidPriceFormData, setBidPriceFormData] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [allAuctions, setAllAuctions] = useState([]);
    const [auctionBidders, setAuctionBidders] = useState(new Map());
    const [currentRate, setCurrentRate] = useState(0.0);
    const [msg, setMsg] = useState("");
    const [open, setOpen] = useState(false);
    let globalSet = new Set();
    const [allAuctionsDetails, setAllAuctionsDetails] = useState([]);
    const [searchedAuctionsDetails, setSearchedAuctionsDetails] = useState([]);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }

    const checkIfWalletIsConnected = async () => {
        try {
            if(!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({ method: 'eth_accounts'});
            
            if(accounts.length) {
                setCurrentAccount(accounts[0]);
                fetchAllAuctions();
                getCurrentAccountRates(accounts[0]);

                // get my auctions
                // ...
            } else {
                console.log("No accounts found.");
            }
            console.log(accounts);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    }

    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    }

    const createAuction = async () => {
        try {
            if(!ethereum) 
                return alert("Please connect or install metamask");
            const { unitOfTime, time } = formData;
            const auctionFactoryContract = getFactoryEthereumContract();

            let convertedTime 
            switch (unitOfTime) {
                case 'days':
                    convertedTime = time * 24 * 3600;
                    break;
                case 'hours':
                    convertedTime = time * 3600;
                    break;
                case 'minutes':
                    convertedTime = time * 60;
                    break;
                case 'seconds':
                    convertedTime = time;
                    break;    
                default:
                    convertedTime = 10;
                    break;
            }
            const transactionHash = await auctionFactoryContract.createAuction(convertedTime);
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);

            // const allAuctions = await auctionFactoryContract.getAllAuctions();
            // console.log(allAuctions);

            setFormData({ unitOfTime: '', time: '' });
            fetchAllAuctions();
            //return '0xb784d54F96fbe1904F3b824cf45Ef1F5A2257a7A';
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object or error during auction creation process.");
        }
    }

    const fetchAllAuctions = async () => {
        try { 
            const auctionFactoryContract = getFactoryEthereumContract();
            let allAuctions = await auctionFactoryContract.getAllAuctions();
            allAuctions = allAuctions.slice().reverse()
            setAllAuctions(allAuctions);
            fetchAuctionDetails(allAuctions);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object or contract fail.");
        }
    }

    const fetchAuctionDetails = async (allAuctionsParam) => {
        try {
            const accounts = await ethereum.request({ method: 'eth_accounts'});
            setAllAuctionsDetails([]);
            let auctionDetailsTemp = [];
            allAuctionsParam.forEach(el => {
                const simpleAuctionContract = getSimpleAuctionEthereumContract(el);
                console.log(simpleAuctionContract)
                updateAuctionsDetailsState(el, 
                    simpleAuctionContract.beneficiary(),
                    simpleAuctionContract.auctionEndTime(),
                    simpleAuctionContract.highestBidder(),
                    simpleAuctionContract.highestBid(),
                    simpleAuctionContract.pendingReturns(accounts[0]) || 0x0
                );
                registerHighestBidIncreasedEvent(simpleAuctionContract, el);
                registerAuctionEndedEvent(simpleAuctionContract, el);
            });
            // setAllAuctionsDetails(auctionDetailsTemp);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object or contract fail.");
        }
    }

    const updateAuctionsDetailsState = async (address, beneficiary, auctionEndTime, highestBidder, highestBid, pendingReturn) => {
        let tempAuctionDetailsArray = allAuctionsDetails;
        let tempAuctionDetailsObject = {};
        tempAuctionDetailsObject['address'] = await address;
        tempAuctionDetailsObject['beneficiary'] = await beneficiary;
        tempAuctionDetailsObject['auctionEndTime'] = hexToDecimal((await auctionEndTime)._hex);
        tempAuctionDetailsObject['highestBidder'] = await highestBidder;
        tempAuctionDetailsObject['highestBid'] = hexToEth((await highestBid)._hex);
        tempAuctionDetailsObject['pendingReturn'] = hexToEth((await pendingReturn)._hex);
        tempAuctionDetailsObject['auctionTimeLeft'] = hexToDecimal((await auctionEndTime)._hex);
        tempAuctionDetailsArray.push(tempAuctionDetailsObject);

        console.log(tempAuctionDetailsObject)
        globalSet.add(tempAuctionDetailsObject);
        // allAuctionsDetails.push(tempAuctionDetailsObject);
        setAllAuctionsDetails([...globalSet]);
        setSearchedAuctionsDetails([...globalSet]);
    }

    const registerHighestBidIncreasedEvent = async (contract, address) => {
        contract.on("HighestBidIncreased", (bidder, amount) => {
            // Emitted on every block change
            console.log("HighestBidIncreased triggered",bidder, amount);
            handleHighestBidIncreasedEvent(bidder, amount, address);
        });
    }

    const handleHighestBidIncreasedEvent = async (bidder, amount, contractAddress) => {
        console.log("HANDLER", bidder, amount, contractAddress);
        let allAuctionDetailsTemp = allAuctionsDetails;
        allAuctionDetailsTemp.forEach(auction => {
            if (auction.address.toLowerCase() === contractAddress.toLowerCase()) {
                auction.highestBidder = bidder;
                auction.highestBid = hexToEth(amount._hex);
            }
        })
        console.log(allAuctionDetailsTemp);
        setAllAuctionsDetails(allAuctionDetailsTemp);
        setSearchedAuctionsDetails(allAuctionDetailsTemp);
    }

    const registerAuctionEndedEvent = async (contract, address) => {
        contract.on("AuctionEnded", (winner, amount) => {
            // Emitted on every block change
            console.log("AuctionEnded triggered",winner, amount);
            handleAuctionEndedEvent(winner, amount, address, contract);
        });
    }

    const handleAuctionEndedEvent = async (winner, amount, address, contract) => {
        await contract.auctionEnd();
    }

    const placeBid = async (auctionAddress, bidPriceFormData) => {
        try {
            if(!ethereum) 
                return alert("Please connect or install metamask");
            console.log(auctionAddress)
            const simpleAuctionContract = await getSimpleAuctionEthereumContract(auctionAddress);
            setTimeout(() => {
                simpleAuctionContract.bid({
                    value: ethers.utils.parseUnits(bidPriceFormData),
                    gasLimit: 3000000, 
                    //gasLimit: 6721975,
                    //gasPrice: simpleAuctionContract.estimateGas
               })
            }, 1000);
        } catch (error) {
            console.log(error);
            throw new Error("Ethereum transaction invalid.");
        }
    }

    const rateOwner = async (ownerAddress, auctionAddress, rateValue) => {
        try {
            if(!ethereum) 
                return alert("Please connect or install metamask");
            const auctionFactoryContract = await getFactoryEthereumContract();
            await auctionFactoryContract.rate(ownerAddress, auctionAddress, rateValue)
        } catch (error) {
            console.log(error);
            setMsg("You are not eiligible to rate the owner");
            setOpen(true);
            throw new Error("Ethereum action invalid.");
        }
    }

    const getCurrentAccountRates = async (account) => {
        try {
            if(!ethereum) 
                return alert("Please connect or install metamask");
            const auctionFactoryContract = await getFactoryEthereumContract();
            const ratings = await auctionFactoryContract.ratings(account);
            calculateAndSetRate(ratings);
        } catch (error) {
            console.log(error);
            throw new Error("Ethereum action invalid.");
        }
    }

    const calculateAndSetRate = async (ratings) => {
        let value;
        if(hexToDecimal((await ratings.numberOfRates)._hex) == '0' || hexToDecimal((await ratings.numberOfRates)._hex) == 0){
            value = parseFloat(0).toFixed(1);
        }
        else { 
            value = parseFloat(hexToDecimal((await ratings.ratingSum )._hex) / hexToDecimal((await ratings.numberOfRates)._hex)).toFixed(1);
        }
        setCurrentRate(value);
    }

    const withdrawAssets = async (auctionAddress) => {
        try {
            if(!ethereum) 
                return alert("Please connect or install metamask");
            console.log(auctionAddress)
            const simpleAuctionContract = await getSimpleAuctionEthereumContract(auctionAddress);
            await simpleAuctionContract.withdraw();
        } catch (error) {
            console.log(error);
            throw new Error("Ethereum transaction invalid.");
        }
    }

    const filterSearch = async (filter) => {
        setSearchedAuctionsDetails([]);
        switch (filter) {
            case 'allAuctions':
                setSearchedAuctionsDetails(allAuctionsDetails);
                break;
            case 'activeAuctions':
                setSearchedAuctionsDetails(allAuctionsDetails.filter(auction => compareDate(auction.auctionEndTime)));
                break;
            case 'myBids':
                setSearchedAuctionsDetails(allAuctionsDetails.filter(auction => auction.pendingReturn > 0 || auction.highestBidder.toLowerCase() === currentAccount.toLowerCase()));
                break;
            case 'auctionsWon':
                setSearchedAuctionsDetails(allAuctionsDetails.filter(auction => !compareDate(auction.auctionEndTime) && auction.highestBidder.toLowerCase() === currentAccount.toLowerCase()));
                break;
            case 'myAuctions':
                console.log(currentAccount)
                console.log(allAuctionsDetails[0].beneficiary)
                setSearchedAuctionsDetails(allAuctionsDetails.filter(auction => auction.beneficiary.toLowerCase() === currentAccount.toLowerCase()));
                break;
            default:
                setSearchedAuctionsDetails(allAuctionsDetails);
                break;
        }
    }

    const filterSearchByAddress = async (address) => {
        if(address === '') {
            setSearchedAuctionsDetails(allAuctionsDetails);
        } else {
            setSearchedAuctionsDetails(allAuctionsDetails.filter(auction => auction.address.toLowerCase() === address.toLowerCase()));
        }
    }


    const test = async (auctionAddress) => {
        const simpleAuctionContract = await getSimpleAuctionEthereumContract(auctionAddress);
    }


    const tickTime = async () => {
        setInterval(() => {
            
        }, 500);
    }


    useEffect(() => {
        checkIfWalletIsConnected();
    }, [])

    return (
        <AuctionFactoryContext.Provider value={{ 
                                                connectWallet, 
                                                currentAccount, 
                                                formData, 
                                                setFormData, 
                                                handleChange, 
                                                createAuction,
                                                allAuctions,
                                                fetchAllAuctions,
                                                allAuctionsDetails,
                                                searchedAuctionsDetails,
                                                fetchAuctionDetails,
                                                placeBid,
                                                auctionBidders,
                                                rateOwner,
                                                currentRate,
                                                msg,
                                                open,
                                                setOpen,
                                                withdrawAssets,
                                                filterSearch,
                                                filterSearchByAddress
                                            }}>
            {children}
        </AuctionFactoryContext.Provider>
    )
}
