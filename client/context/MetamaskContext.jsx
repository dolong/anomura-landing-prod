import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

export const MetamaskContext = React.createContext();

const { ethereum } = window;

export default function MetamaskProvider({ children }) {
    const [currentAccount, setCurrentAccount] = useState("");
    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    //#region Arrow Functions for wallet connection and checking.
    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");
            /*
                The below ethereum.request comes from the Ethereum provider API from metamask
                This method checks to see if their is a eth metamask account or accounts in the window.
            */
            const accounts = await ethereum.request({ method: "eth_accounts" });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
            }
        } catch (error) {
            throw new error("No ethereum object from Metamask");
        }
    };

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");
            /*
                The below ethereum.request comes from the Ethereum provider API from metamask
                This method pulls up the metamask plugin and requests the user to login and connect their account
            */
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            setCurrentAccount(accounts[0]);
        } catch (error) {
            throw new error("No ethereum object from Metamask");
        }
    };

    //#endregion
    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        //If the key and the value are the same you only need to pas the key. Same as in name wise
        <MetamaskContext.Provider value={{ connectWallet, currentAccount, handleChange }}>
            {children}
        </MetamaskContext.Provider>
    );
}
