import React, { useEffect, useState } from 'react';
import { ethers, BigNumber } from 'ethers';
// import Web3 from 'web3';

import { contractABIAuctionFactory, contractAddressFactory, contractABISimpleAuction } from '../utils/constants';


export const AuctionFactoryContext = React.createContext();

const { ethereum } = window;
const provider = new ethers.providers.Web3Provider(ethereum);

const getFactoryEthereumContract = () => {
    // const provider = new ethers.providers.Web3Provider(ethereum);

    const signer = provider.getSigner();

    const auctionFactoryContract = new ethers.Contract(contractAddressFactory, contractABIAuctionFactory, signer);

    return auctionFactoryContract;
}


const getSimpleAuctionEthereumContract = (contractAddress) => {
    // const provider = new ethers.providers.Web3Provider(ethereum);
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

    let globalSet = new Set();
    const [allAuctionsDetails, setAllAuctionsDetails] = useState([]);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }

    // const handleBidPriceChange = (e) => {
    //     setBidPriceFormData(e.target.value);
    // }

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
                case 'Days':
                    convertedTime = time * 24 * 3600;
                    break;
                case 'Hours':
                    convertedTime = time * 3600;
                    break;
                case 'Minutes':
                    convertedTime = time * 60;
                    break;
                case 'Seconds':
                    convertedTime = time;
                    break;    
                default:
                    convertedTime = 10;
                    break;
            }
            const transactionHash = await auctionFactoryContract.createAuction(Math.floor(Date.now() / 1000) + convertedTime);
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
            const allAuctions = await auctionFactoryContract.getAllAuctions();
            setAllAuctions(allAuctions);
            console.log(allAuctions);
            fetchAuctionDetails(allAuctions);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object or contract fail.");
        }
    }

    const fetchAuctionBidders = async (auctionAddress) => {
        // const simpleAuctionContract = getSimpleAuctionEthereumContract(auctionAddress);
        // const allAuctionBidders = await simpleAuctionContract.pendingReturns(0);
        // auctionBidders.set(auctionAddress, allAuctionBidders);
        // console.log(allAuctionBidders);
    }

    const fetchAuctionDetails = async (allAuctionsParam) => {
        try {
            setAllAuctionsDetails([]);
            let auctionDetailsTemp = [];
            allAuctionsParam.forEach(el => {
                console.log('u foreach')
                const simpleAuctionContract = getSimpleAuctionEthereumContract(el);
                updateAuctionsDetailsState(el, 
                    simpleAuctionContract.beneficiary(),
                    simpleAuctionContract.auctionEndTime(),
                    simpleAuctionContract.highestBidder(),
                    simpleAuctionContract.highestBid()
                );
            });
            setAllAuctionsDetails(auctionDetailsTemp);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object or contract fail.");
        }
    }

    const updateAuctionsDetailsState = async (address, beneficiary, auctionEndTime, highestBidder, highestBid) => {
        let tempAuctionDetailsArray = allAuctionsDetails;
        let tempAuctionDetailsObject = {};
        tempAuctionDetailsObject['address'] = await address;
        tempAuctionDetailsObject['beneficiary'] = await beneficiary;
        tempAuctionDetailsObject['auctionEndTime'] = await auctionEndTime;
        tempAuctionDetailsObject['highestBidder'] = await highestBidder;
        tempAuctionDetailsObject['highestBid'] = await highestBid;
        tempAuctionDetailsArray.push(tempAuctionDetailsObject);
        console.log("uso u ovo drugo", tempAuctionDetailsArray)

        globalSet.add(tempAuctionDetailsObject);
        // allAuctionsDetails.push(tempAuctionDetailsObject);
        setAllAuctionsDetails([...globalSet]);
    }

    const placeBid = async (auctionAddress, bidPriceFormData) => {
        try {
            if(!ethereum) 
                return alert("Please connect or install metamask");
            console.log(auctionAddress)
            const simpleAuctionContract = await getSimpleAuctionEthereumContract(auctionAddress);
            console.log('price to bid in eth (context) ', bidPriceFormData);
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
            console.log('rateOwner (context) ', ownerAddress, auctionAddress, rateValue);
            auctionFactoryContract.rate(ownerAddress, auctionAddress, rateValue)
        } catch (error) {
            console.log(error);
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

    const calculateAndSetRate = (ratings) => {
        console.log(ratings)
        const value = ratings.ratingSum._hex / ratings.numberOfRates._hex;
        setCurrentRate(value);
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
                                                fetchAuctionDetails,
                                                placeBid,
                                                auctionBidders,
                                                fetchAuctionBidders,
                                                rateOwner,
                                                currentRate
                                            }}>
            {children}
        </AuctionFactoryContext.Provider>
    )
}
