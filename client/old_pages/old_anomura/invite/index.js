import React, { useEffect, useState } from 'react'
import s from "/sass/anomura/invite/invite.module.css";
import { prisma } from "repositories/PrismaContext";

//Need to create a hook for connecting your wallet.


export default function Invite({ whiteList }) {
    const [currentAccount, setCurrentAccount] = useState("");


    let ethereum;
    let formData = {
        wallet: "",
        discordID: "",
    }

    async function HandleClick(e) {
        setCurrentAccount(MetaMaskConnection.ConnectWallet(ethereum, currentAccount));
    }

    useEffect(() => {
        ethereum = window.ethereum;
    });

    return (
        <div className={s.app}>

            {!currentAccount
                ?
                <div className={s.board}>
                    <img className={s.board_title} src="/img/anomura/invite/anomura_big.png" alt="sign" />
                    <img className={s.board_welcome} src="/img/anomura/invite/welcome.png" alt="welcome" />
                    <button onClick={HandleClick} className={s.board_button}>Connect your wallet</button>
                </div>

                :
                <p>Hello</p>
            }
            <div className={s.foreground} />

            <style>{`
            body {
            font-size: clamp(18px,2vw,28px);
            font-family: Atlantis;
            color: #fff;
            line-height: 1.5;
            }
      `}</style>
        </div>
    );
}

async function saveWhiteList(whiteList) {
    const response = await fetch("/api/dataCRUD",
        {
            method: "POST",
            body: JSON.stringify(whiteList)
        });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
}


export async function getServerSideProps() {
    //We might need to change this down the line where prisma just find the current metamask if the user is already logged in to metamask
    //The first entry in the database is a dummy entry just so we can pass data to use server side props.
    const whiteList = await prisma.whiteList.findFirst();

    return {
        props: {
            whiteList
        }
    }
}