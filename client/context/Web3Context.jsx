import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ethers, utils, BigNumber } from "ethers";
import * as UAuthWeb3Modal from "@uauth/web3modal";
import UAuthSPA from "@uauth/js";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal, { CLOSE_EVENT, CONNECT_EVENT, ERROR_EVENT, ICoreOptions } from "web3modal";
import Web3 from "web3";
import axios from "axios";
import { signIn, useSession, signOut } from "next-auth/react";

export const uauthOptions = {
    clientID: process.env.NEXT_PUBLIC_UNSTOPPABLE_CLIENT_ID,
    redirectUri: process.env.NEXT_PUBLIC_UNSTOPPABLE_REDIRECT_URI,
    // https://anomura-staging.vercel.app/inventory
    // redirectUri: "https://anomura-staging.vercel.app/inventory",
    // Must include both the openid and wallet scopes.
    scope: "openid wallet",
};

const providerOptions = {
    network: "1",
    cacheProvider: true,
    disableInjectedProvider: false,

    "custom-uauth": {
        // The UI Assets
        display: UAuthWeb3Modal.display,

        // The Connector
        connector: UAuthWeb3Modal.connector,

        // The SPA libary
        package: UAuthSPA,

        // The SPA libary options
        options: uauthOptions,
    },

    // For full functionality we include the walletconnect provider as well.
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
        },
        qrcodeModalOptions: {
            mobileLinks: ["trust", "metamask", "coinbase"],
            desktopLinks: ["encrypted ink"],
        },
    },

    // Include any other web3modal providers here
};

//////////////////////////////////////////////
// import { UAuthConnector } from "@uauth/web3-react";
// import { InjectedConnector } from "@web3-react/injected-connector";
// import { WalletConnectConnector } from "@web3-react/walletconnect-connector";;

// // Instanciate your other connectors.
// export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });

// export const walletconnect = new WalletConnectConnector({
//     infuraId: process.env.NEXT_PUBLIC_INFURA_URL,
//     qrcode: true,
// });

// export const uauth = new UAuthConnector({
//     clientID: process.env.NEXT_PUBLIC_UNSTOPPABLE_CLIENT_ID,
//     redirectUri: process.env.NEXT_PUBLIC_UNSTOPPABLE_REDIRECT_URI,
//     //   postLogoutRedirectUri: process.env.REACT_APP_POST_LOGOUT_REDIRECT_URI!,
//     // Scope must include openid and wallet
//     scope: "openid wallet",

//     // Injected and walletconnect connectors are required.
//     connectors: { injected, walletconnect },
// });

// const connectors = {
//     injected,
//     walletconnect,
//     uauth,
// };
const connectors = {};
export const Web3Context = React.createContext();

export function Web3ContextProvider({ children }) {
    const [networkId, setNetworkId] = useState();
    const [chainId, setChainId] = useState();
    const [provider, setProvider] = useState();
    const [address, setAddress] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [user, setUser] = useState();
    const { data: session, status } = useSession({ required: false });
    let web3modal;

    useEffect(async () => {
        if (window) {
            // const session = await getSession();
            web3modal = new Web3Modal({
                cacheProvider: true, // optional,
                providerOptions,
            });
            UAuthWeb3Modal.registerWeb3Modal(web3modal);
            if (
                web3modal.cachedProvider &&
                localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER") &&
                session
            ) {
                connect();
            }
            if (!session) {
                removeLocalStorageMetamask();
                removeLocalStorageWalletConnect();
                removeLocalStorageUath();
            }
        }
        document.addEventListener("visibilitychange", function () {
            // if (window.visibilityState === "hidden") {
            localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");
            //  }
        });
    }, []);

    const web3 = useMemo(() => {
        return provider ? new Web3(provider) : undefined;
    }, [provider]);

    const uauth = useMemo(() => {
        console.log("New UAuth instance!");
        const { package: uauthPackage, options: uauthOptions } = providerOptions["custom-uauth"];
        return UAuthWeb3Modal.getUAuth(uauthPackage, uauthOptions);
    }, []);

    console.log(user);

    const connect = async (id = "") => {
        // const session = await getSession();
        setLoading(true);
        setError(undefined);
        try {
            if (!web3modal) {
                web3modal = new Web3Modal({
                    cacheProvider: true, // optional,
                    providerOptions,
                });
                UAuthWeb3Modal.registerWeb3Modal(web3modal);
            }
            const provider = id ? await web3modal.connectTo(id) : await web3modal.connect();

            let uathUser = undefined;
            if (web3modal.cachedProvider === "custom-uauth") {
                uathUser = await uauth.user().then((r) => r.sub);
                setUser(uathUser);
            }

            setProvider(provider);

            const tempWeb3 = new Web3(provider);

            const [address] = await tempWeb3.eth.getAccounts();
            setAddress(address);

            let chainId = await tempWeb3.eth.getChainId();
            setChainId(chainId);
            setNetworkId(await tempWeb3.eth.net.getId());

            setError(undefined);
            setLoading(false);

            if (!session) {
                try {
                    const userData = { address, chain: chainId, network: "evm" };
                    const requestMessage = await axios.post(`/api/auth/requestMessage`, userData);
                    if (requestMessage?.data?.message) {
                        const { message } = requestMessage.data;
                        const signature = await provider.request({
                            method: "personal_sign",
                            params: [message, address],
                        });

                        if (uathUser) {
                            await signIn("credentials", {
                                // redirect: false,
                                message,
                                signature,
                                uathUser,
                            });
                        } else {
                            await signIn("credentials", {
                                // redirect: false,
                                message,
                                signature,
                            });
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (e) {
            setError(e);
            setLoading(false);
            console.log(e);
            console.error("Failed to connect!");
        }
    };

    const disconnect = async () => {
        if (web3modal?.cachedProvider === "custom-uauth") {
            await uauth.logout();
        }

        await web3modal?.clearCachedProvider();
        unsubscribeFromProvider(provider);
        setProvider(undefined);
        setAddress(undefined);
        setLoading(false);
        setChainId(undefined);
        setNetworkId(undefined);
        removeLocalStorageMetamask();
        removeLocalStorageWalletConnect();
        removeLocalStorageUath();
        await signOut();

        console.log("Disconnected!");
    };

    useEffect(() => {
        // const onErrorEvent = (error) => {
        //     console.error("web3modal.ERROR_EVENT", error);
        //     setError(error);
        // };
        // const onCloseEvent = () => {
        //     console.log("web3modal.CLOSE_EVENT");
        // };
        // const onConnectEvent = async (provider) => {
        //     console.log("web3modal.CONNECT_EVENT", provider);
        // };
        // console.log("Attaching event listeners to web3modal!");
        // web3modal.on(ERROR_EVENT, onErrorEvent);
        // web3modal.on(CLOSE_EVENT, onCloseEvent);
        // web3modal.on(CONNECT_EVENT, onConnectEvent);
        // return () => {
        //     console.log("Removing event listeners to web3modal!");
        //     web3modal.off(ERROR_EVENT, onErrorEvent);
        //     web3modal.off(CLOSE_EVENT, onCloseEvent);
        //     web3modal.off(CONNECT_EVENT, onConnectEvent);
        // };
    }, [web3modal]);

    const onClose = () => {
        console.log("provider.close");

        setProvider(undefined);
        setAddress(undefined);
    };

    const onAccountsChanged = async ([address]) => {
        console.log("provider.accountsChanged", [address]);
        // setAddress(address);
        disconnect();
    };

    const onChainChanged = async (chainId) => {
        console.log("provider.chainChanged", chainId);
        // setChainId(chainId);
        // setNetworkId(await web3.eth.net.getId());
        disconnect();
    };

    const onNetworkChanged = async (networkId) => {
        console.log("provider.networkChanged", networkId);
        // setNetworkId(networkId);
        // setChainId(await web3.eth.getChainId());
        disconnect();
    };

    const subscribeToProvider = (provider) => {
        // console.log("Attaching event listeners to provider...");
        if (provider == null || typeof provider.on !== "function") {
            return;
        }

        provider.on("close", onClose);
        provider.on("accountsChanged", onAccountsChanged);
        provider.on("chainChanged", onChainChanged);
        provider.on("networkChanged", onNetworkChanged);

        // console.log("Attached event listeners to provider!");
    };

    const unsubscribeFromProvider = (provider) => {
        // console.log("Removing event listeners to provider...");

        if (provider == null || typeof provider.removeListener !== "function") {
            return;
        }

        provider.removeListener("close", onClose);
        provider.removeListener("accountsChanged", onAccountsChanged);
        provider.removeListener("chainChanged", onChainChanged);
        provider.removeListener("networkChanged", onNetworkChanged);

        // console.log("Removed event listeners to provider!");
    };

    useEffect(() => {
        subscribeToProvider(provider);
        return () => {
            unsubscribeFromProvider(provider);
        };
    }, [provider]);

    const value = {
        web3modal,
        connect,
        disconnect,
        networkId,
        chainId,
        provider,
        web3,
        address,
        isConnected: provider != null,
        isLoading: loading,
        error,
        user,
        uauth,
    };

    // useEffect(() => {
    //     // RemoveLocalStorageWalletConnect();
    //     // document.addEventListener("visibilitychange", function () {
    //     //     // if (window.visibilityState === "hidden") {
    //     //     localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");
    //     //     //  }
    //     // });
    //     // return () => {
    //     //     if (signMessageTimeout) {
    //     //         clearTimeout(signMessageTimeout);
    //     //     }
    //     // };
    //     // if (window) {
    //     //     web3modal = new Web3Modal({ providerOptions });
    //     //     // Register the web3modal so the connector has access to it.
    //     //     UAuthWeb3Modal.registerWeb3Modal(web3modal);
    //     // }
    //     if (active) {
    //         console.log(account);
    //     }
    // }, [account]);

    // useEffect(async () => {
    //     if (session) {
    //         let providerInstance;
    //         if (window?.ethereum) {
    //             SubscribeProvider(window.ethereum);
    //         } else {
    //             // let provider = new WalletConnectProvider({
    //             //     infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    //             //     qrcodeModalOptions: {
    //             //         mobileLinks: ["trust"],
    //             //         desktopLinks: ["encrypted ink"],
    //             //     },
    //             // });
    //             // await provider.enable();
    //             // SubscribeProvider(providerInstance);
    //         }
    //     }
    // }, [session]);

    const SubscribeProvider = async (provider) => {
        try {
            provider.on("error", (e) => console.error("WS Error", e));
            provider.on("end", (e) => console.error("WS End", e));

            provider.on("accountsChanged", async (accounts) => {
                console.log("On account changed, would need to login again");

                SignOut();
            });

            provider.on("chainChanged", async (chainId) => {
                SignOut();
            });

            provider.on("connect", (info) => {});

            provider.on("disconnect", async (error) => {
                SignOut();
            });
        } catch (error) {}
    };

    const login = async () => {
        // console.log(connectors);
        // activate(injected);
        // if (!web3modal) {
        //     web3modal = new Web3Modal({ providerOptions });
        //     // Register the web3modal so the connector has access to it.
        //     UAuthWeb3Modal.registerWeb3Modal(web3modal);
        // }
        // const instance = await web3modal.connect();
        // instance.on("chainChanged", (chainId) => {
        //     console.log(`chain changed to ${chainId}! updating providers`);
        //     setInjectedProvider(new ethers.providers.Web3Provider(instance));
        // });
        // instance.on("accountsChanged", () => {
        //     console.log(`account changed!`);
        //     setInjectedProvider(new ethers.providers.Web3Provider(instance));
        // });
        // // Subscribe to session disconnection
        // instance.on("disconnect", (code, reason) => {
        //     console.log(code, reason);
        //     logoutOfWeb3Modal();
        // });
        // console.log(321);
        // let provider = new ethers.providers.Web3Provider(instance);
        // setInjectedProvider(provider);
        // // const test = instance.accounts;
        // console.log(instance.accounts);
        // console.log(provider.accounts);
    };

    const logout = async () => {
        // if (web3modal?.cachedProvider === "custom-uauth") {
        //     await uauth.logout();
        // }
        // web3modal?.clearCachedProvider();
    };

    // const SignOut = async () => {
    //     RemoveLocalStorageWalletConnect();
    //     signOut();
    // };

    return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}

const removeLocalStorageMetamask = () => {
    const injectedCache = localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER");
    if (injectedCache) {
        localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
    }
};

const removeLocalStorageWalletConnect = () => {
    const walletConnectCache = localStorage.getItem("walletconnect");
    if (walletConnectCache) {
        localStorage.removeItem("walletconnect");
    }
    const walletMobileCache = localStorage.getItem("WALLETCONNECT_DEEPLINK_CHOICE");
    if (walletMobileCache) {
        localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");
    }
};

const removeLocalStorageUath = () => {
    const openidCache = localStorage.getItem("openidConfiguration:");
    if (openidCache) {
        localStorage.removeItem("openidConfiguration:");
    }
    const uathRequestCache = localStorage.getItem("request");
    if (uathRequestCache) {
        localStorage.removeItem("request");
    }
    const uathUserCache = localStorage.getItem("username");
    if (uathUserCache) {
        localStorage.removeItem("username");
    }
};
