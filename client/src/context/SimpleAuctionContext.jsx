import React, { useState } from 'react';
import {ethers} from 'ethers';

import { contractABISimpleAuction } from '../utils/constants';

export const AuctionFactoryContext = React.createContext();

const { ethereum } = window;


const getSaEthereumContract = (addresOfSimpleAuctionContract) => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    const simpleAuctionContract = new ethers.Contract(addresOfSimpleAuctionContract, contractABISimpleAuction, signer);

    return simpleAuctionContract;
}


export const SimpleAuctionProvider = ({children}) => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({ unitOfTime: '', time: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }


    const createAuction = async () => {
        try {


        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    }


    return (
        <AuctionFactoryContext.Provider value={{ currentAccount, formData, setFormData, handleChange, createAuction }}>
            {children}
        </AuctionFactoryContext.Provider>
    )
}