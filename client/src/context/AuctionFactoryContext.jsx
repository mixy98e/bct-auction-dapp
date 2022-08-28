import React, { useEffect, useState } from 'react';
import { ethers, BigNumber } from 'ethers';

import { contractABIAuctionFactory, contractAddressFactory, contractABISimpleAuction } from '../utils/constants';


export const AuctionFactoryContext = React.createContext();

const { ethereum } = window;

const getFactoryEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    const auctionFactoryContract = new ethers.Contract(contractAddressFactory, contractABIAuctionFactory, signer);

    return auctionFactoryContract;
}


const getSimpleAuctionEthereumContract = (contractAddress) => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    const simpleAuctionContract = new ethers.Contract(contractAddress, contractABISimpleAuction, signer);

    return simpleAuctionContract;
}


export const AuctionFactoryProvider = ({children}) => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({ unitOfTime: '', time: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [allAuctions, setAllAuctions] = useState([]);

    let globalSet = new Set();
    const [allAuctionsDetails, setAllAuctionsDetails] = useState([]);

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
                return alert("Please install metamask");
            const { unitOfTime, time } = formData;
            const auctionFactoryContract = getFactoryEthereumContract();


            let convertedTime;
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
            throw new Error("No ethereum object.");
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
            throw new Error("No ethereum object.");
        }
    }

    const fetchAuctionDetails = async (allAuctionsParam) => {
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

    const placeBid = async (auctionAddress) => {
        try {
            if(!ethereum) 
                return alert("Please install metamask");

            console.log(auctionAddress)
            const simpleAuctionContract = await getSimpleAuctionEthereumContract(auctionAddress);
            console.log(simpleAuctionContract.bid);
           
            // await simpleAuctionContract.bid()
            const price = ethers.utils.parseUnits('1.0', 'ether')
            setTimeout(() => {
                simpleAuctionContract.bid({
                    value: ethers.utils.parseEther("0.1"),
                    gasLimit: 6721970,
                    // gasPrice: 2000000000,
                    // nonce: "0"
               })

            }, 3000);
            /*.bid({
                value: price
            
            });
            transaction.wait();
    this.state.socialNetwork.methods.tipPost(id).send({ from: this.state.account, value: tipAmount })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
        
            /*1000000000000000000

            {
                value: 1,
                gas: 30000,
                gasPriceInWei : 1000
            }

             const gas = await TodolistContract.methods
      .addToList(itemToAdd)
      .estimateGas();
    await TodolistContract.methods
      .addToList(itemToAdd)
      .send({ from: account, gas });
            */

        } catch (error) {
            console.log(error);
            // throw new Error("No ethereum object.");
        }
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
                                                placeBid
                                            }}>
            {children}
        </AuctionFactoryContext.Provider>
    )
}
