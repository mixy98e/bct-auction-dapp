import React, { useEffect, useState } from 'react';
import {ethers} from 'ethers';

import { contractABIAuctionFactory, contractAddressFactory,} from '../utils/constants';


export const AuctionFactoryContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    const auctionFactoryContract = new ethers.Contract(contractAddressFactory, contractABIAuctionFactory, signer);

    return auctionFactoryContract;
}

export const AuctionFactoryProvider = ({children}) => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({ unitOfTime: '', time: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }

    const checkIfWalletIsConnected = async () => {

        try {
            if(!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({ method: 'eth_accounts'});
            
            if(accounts.length) {
                setCurrentAccount(accounts[0]);
    
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
            const auctionFactoryContract = getEthereumContract();


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

            const allAuctions = await auctionFactoryContract.getAllAuctions();
            console.log(allAuctions);

        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, [])

    return (
        <AuctionFactoryContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, createAuction }}>
            {children}
        </AuctionFactoryContext.Provider>
    )
}

//ethereum standard transaction

            // await ethereum.request({
            //     method: 'eth_setTransaction',
            //     params: [{
            //         from: currentAccount,
            //         to: contractAddressFactory,
            //         gas: '0x5028', //21000 GWEI
            //         value: time
            //     }]
            // })