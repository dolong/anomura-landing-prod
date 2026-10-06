import InventoryContainer from "@components/inventory/InventoryContainer";
import Head from "next/head";
import React from "react";
import Moralis from "moralis";
import { unstable_getServerSession } from "next-auth/next"

import { authOptions } from 'pages/api/auth/[...nextauth]'
// import { getSession } from 'next-auth/react';
function InventoryPage(props) {
    // console.log(props)
    React.useEffect(() => {

    }, [props])
    return (
        <>
            <Head>
                <title>Anomura | The Inventory</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="og:title" content="Anomura | The Inventory" />
                <meta
                    property="og:description"
                    content="See what you have got?"
                />
                {/* <meta property="og:image"
                    content="/mint/Website Preview_V2.png"
                /> */}
                <meta
                    property="og:site_name"
                    content="Anomura | The Inventory"
                />
                <meta property="keywords" content="Anomura, NFT, Game, Anomura Mint" />

                <meta name="twitter:card" content="summary_large_image" />
                {/* <meta
                    property="twitter:image"
                    content="/mint/Website Preview_V2.png"
                /> */}
                {/* <link rel="icon" href="/mint/faviconShell.png" /> */}
            </Head>
            {process.env.NEXT_PUBLIC_IS_INVENTORY_ENABLED == "true" ?
                (
                    // <InventoryContainer {...props} />
                    <div>Nothing here</div>
                ) : <div>Nothing here</div>
            }

        </>
    );
}
InventoryPage.needWeb3Provider = true;
export default InventoryPage;

export const getServerSideProps = async (context) => {

    const session = await unstable_getServerSession(
        context.req,
        context.res,
        authOptions
    ); // server side 

    // const session = await getSession(context);


    if (!session?.user.address) {
        return {
            props: {
                error: "Connect your wallet first",
                sessionUser: null,
                balances: []
            }
        };
    }
    await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
    const query = await Moralis.EvmApi.nft.getWalletNFTs({
        address: session?.user.address,
        chain: process.env.APP_CHAIN_ID,
    });

    const onlyAnomuras = query.result.filter(e => {
        return e.symbol === "ANOMURA"
    })

    const onlyBowls = query.result.filter(e => {
        return e.symbol == "Bowl"
    })

    let result = {}

    result.anomuras = onlyAnomuras
    result.bowls = onlyBowls

    return {
        props: {
            user: session.user,
            balances: JSON.parse(JSON.stringify(result)),
        },
    };
};

