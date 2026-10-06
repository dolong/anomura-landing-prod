import React, { useState } from "react";
import { useScrollValue } from "/lib/useScrollValue";
import s from "/sass/home/home.module.css";

const InitialOffset = 4200,
    TwentyEightHundredOffset = -500,
    TwentyFiveHundredOffset = -500,
    NineteenHundredOffset = -500,
    SixteenHundredOffset = -500,
    TwelveHundredOffSet = -800,
    OneThousandOffSet = -1100,
    EightHundredOffSet = -950,
    SixHundredOffSet = -650,
    FourHundredOffSet = -720;

export default function WhenIsItOut({ ScrollPercent, audioControl }) {
    const [scrollSpeed, setScrollSpeed] = React.useState(-55);
    let calculatedOffsetY = useScrollValue(
        ScrollPercent,
        scrollSpeed,
        InitialOffset,
        TwentyEightHundredOffset,
        TwentyFiveHundredOffset,
        NineteenHundredOffset,
        SixteenHundredOffset,
        TwelveHundredOffSet,
        OneThousandOffSet,
        EightHundredOffSet,
        SixHundredOffSet,
        FourHundredOffSet
    );

    const [isInView, setIsInView] = useState({
        build: false,
        sustainability: false,
        gameDemo: false,
        shellRedemption: false,
        bowlMint: false,
        anomuraHatching: false,
        webGame: false,
        equipmentNFT: false,
        inventory: false,
        mobileGame: false,
    });

    const buildRef = React.createRef();
    const sustainRef = React.createRef();
    const gameDemoRef = React.createRef();
    const redemptionRef = React.createRef();
    const mintRef = React.createRef();
    const anomuraHatchRef = React.createRef();
    const webGameRef = React.createRef();
    const equipmentRef = React.createRef();
    const inventoryRef = React.createRef();
    const mobileGameRef = React.createRef();

    React.useEffect(() => {
        if (window.innerWidth <= 1200) setScrollSpeed(-20);
        if (window.innerWidth <= 600) setScrollSpeed(-17);
    }, []);

    React.useEffect(() => {
        window.addEventListener("scroll", checkScroll);

        return () => {
            window.removeEventListener("scroll", checkScroll);
        };
    }, [sustainRef]);

    const checkScroll = () => {
        if (sustainRef.current && buildRef.current) {
            let buildRect = buildRef.current.getBoundingClientRect().top;
            let sustainRect = sustainRef.current.getBoundingClientRect().top;
            let gameDemoRect = gameDemoRef.current.getBoundingClientRect().top;
            let redemptionRect = redemptionRef.current.getBoundingClientRect().top;
            let mintRect = mintRef.current.getBoundingClientRect().top;
            let anomuraHatchRect = anomuraHatchRef.current.getBoundingClientRect().top;
            let webGameRect = webGameRef.current.getBoundingClientRect().top;
            let equipmentRect = equipmentRef.current.getBoundingClientRect().top;
            let inventoryRect = inventoryRef.current.getBoundingClientRect().top;
            let mobileGameRect = mobileGameRef.current.getBoundingClientRect().top;

            if (
                buildRect <= window.innerHeight / 2 &&
                buildRect > window.innerHeight / 3 &&
                isInView.build === false
            ) {
                setIsInView((prevState) => ({
                    ...prevState,
                    build: true,
                    sustainability: false,
                    gameDemo: false,
                    shellRedemption: false,
                    bowlMint: false,
                    anomuraHatching: false,
                    webGame: false,
                    equipmentNFT: false,
                    inventory: false,
                    mobileGame: false,
                }));
            }
            if (
                sustainRect <= window.innerHeight / 2 &&
                sustainRect > window.innerHeight / 3 &&
                isInView.sustainability === false
            ) {
                setIsInView((prevState) => ({
                    ...prevState,
                    build: false,
                    sustainability: true,
                    gameDemo: false,
                    shellRedemption: false,
                    bowlMint: false,
                    anomuraHatching: false,
                    webGame: false,
                    equipmentNFT: false,
                    inventory: false,
                    mobileGame: false,
                }));
            }
            if (
                gameDemoRect <= window.innerHeight / 2 &&
                gameDemoRect > window.innerHeight / 3 &&
                isInView.gameDemo === false
            ) {
                setIsInView((prevState) => ({
                    ...prevState,
                    build: false,
                    sustainability: false,
                    gameDemo: true,
                    shellRedemption: false,
                    bowlMint: false,
                    anomuraHatching: false,
                    webGame: false,
                    equipmentNFT: false,
                    inventory: false,
                    mobileGame: false,
                }));
            }
            if (
                redemptionRect <= window.innerHeight / 2 &&
                redemptionRect > window.innerHeight / 3 &&
                isInView.shellRedemption === false
            ) {
                setIsInView((prevState) => ({
                    ...prevState,
                    build: false,
                    sustainability: false,
                    gameDemo: false,
                    shellRedemption: true,
                    bowlMint: false,
                    anomuraHatching: false,
                    webGame: false,
                    equipmentNFT: false,
                    inventory: false,
                    mobileGame: false,
                }));
            }
            if (
                mintRect <= window.innerHeight / 2 &&
                mintRect > window.innerHeight / 3 &&
                isInView.bowlMint === false
            ) {
                setIsInView((prevState) => ({
                    ...prevState,
                    build: false,
                    sustainability: false,
                    gameDemo: false,
                    shellRedemption: false,
                    bowlMint: true,
                    anomuraHatching: false,
                    webGame: false,
                    equipmentNFT: false,
                    inventory: false,
                    mobileGame: false,
                }));
            }
            if (
                anomuraHatchRect <= window.innerHeight / 2 &&
                anomuraHatchRect > window.innerHeight / 3 &&
                isInView.anomuraHatching === false
            ) {
                setIsInView((prevState) => ({
                    ...prevState,
                    build: false,
                    sustainability: false,
                    gameDemo: false,
                    shellRedemption: false,
                    bowlMint: false,
                    anomuraHatching: true,
                    webGame: false,
                    equipmentNFT: false,
                    inventory: false,
                    mobileGame: false,
                }));
            }
            if (
                webGameRect <= window.innerHeight / 2 &&
                webGameRect > window.innerHeight / 3 &&
                isInView.webGame === false
            ) {
                setIsInView((prevState) => ({
                    ...prevState,
                    build: false,
                    sustainability: false,
                    gameDemo: false,
                    shellRedemption: false,
                    bowlMint: false,
                    anomuraHatching: false,
                    webGame: true,
                    equipmentNFT: false,
                    inventory: false,
                    mobileGame: false,
                }));
            }
            if (
                equipmentRect <= window.innerHeight / 2 &&
                equipmentRect > window.innerHeight / 3 &&
                isInView.equipmentNFT === false
            ) {
                setIsInView((prevState) => ({
                    ...prevState,
                    build: false,
                    sustainability: false,
                    gameDemo: false,
                    shellRedemption: false,
                    bowlMint: false,
                    anomuraHatching: false,
                    webGame: false,
                    equipmentNFT: true,
                    inventory: false,
                    mobileGame: false,
                }));
            }
            if (
                inventoryRect <= window.innerHeight / 2 &&
                inventoryRect > window.innerHeight / 3 &&
                isInView.inventory === false
            ) {
                setIsInView((prevState) => ({
                    ...prevState,
                    build: false,
                    sustainability: false,
                    gameDemo: false,
                    shellRedemption: false,
                    bowlMint: false,
                    anomuraHatching: false,
                    webGame: false,
                    equipmentNFT: false,
                    inventory: true,
                    mobileGame: false,
                }));
            }
            if (
                mobileGameRect <= window.innerHeight / 2 &&
                mobileGameRect > window.innerHeight / 3 &&
                isInView.mobileGame === false
            ) {
                setIsInView((prevState) => ({
                    ...prevState,
                    build: false,
                    sustainability: false,
                    gameDemo: false,
                    shellRedemption: false,
                    bowlMint: false,
                    anomuraHatching: false,
                    webGame: false,
                    equipmentNFT: false,
                    inventory: false,
                    mobileGame: true,
                }));
            }
        }
    };

    return (
        <div className={s.when_zone} style={{ top: `calc(${calculatedOffsetY}px)` }}>
            <div className={s.when_container}>
                <div className={s.when_text}>
                    <div className={s.when_heading}>ROADMAP</div>
                </div>
                <div className={s.when_roadmap}>
                    <div className={s.when_roadmap_wrapper}>
                        <div className={s.when_roadmap_container}>
                            <div className={s.when_roadmap_timeline}>
                                {/******************* BUIDL  *****************/}
                                <div className={s.when_roadmap_item}>
                                    <div className={s.when_roadmap_item_img}>
                                        <img src="/img/home/whenSection/BUIDL.gif" alt="" />
                                    </div>
                                    <div className={s.when_roadmap_item_labels}>
                                        <div className={s.when_roadmap_item_labels_progress}>
                                            COMPLETED
                                        </div>
                                        <span
                                            ref={buildRef}
                                            className={`${s.when_roadmap_item_labels_title} ${
                                                isInView.build ? s.when_roadmap_purpleLeft : ""
                                            }`}
                                        >
                                            BUIDL!
                                        </span>
                                        <div className={s.when_roadmap_item_labels_description}>
                                            Release The Cove's DeepSea Challenger
                                        </div>
                                    </div>
                                </div>

                                {/******************* SUSTAINABILITY  *****************/}
                                <div className={s.when_roadmap_item}>
                                    <div className={s.when_roadmap_item_img}>
                                        <img
                                            src="/img/home/whenSection/Sustainability.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className={s.when_roadmap_item_labels}>
                                        <div className={s.when_roadmap_item_labels_progress}>
                                            COMPLETED
                                        </div>
                                        <span
                                            className={`${s.when_roadmap_item_labels_title} ${
                                                isInView.sustainability
                                                    ? s.when_roadmap_purpleRight
                                                    : ""
                                            }`}
                                            ref={sustainRef}
                                        >
                                            Sustainability
                                        </span>
                                        <div className={s.when_roadmap_item_labels_description}>
                                            Partner with Aerial to become world's first Ocean
                                            Positive P&E game
                                        </div>
                                    </div>
                                </div>

                                {/******************* SHELL Redemption  *****************/}
                                <div className={s.when_roadmap_item}>
                                    <div className={s.when_roadmap_item_img}>
                                        <img
                                            src="/img/home/whenSection/Shell Redemption.gif"
                                            alt=""
                                        />
                                    </div>
                                    <div className={s.when_roadmap_item_labels}>
                                        <div className={s.when_roadmap_item_labels_progress}>
                                            IN PROGRESS
                                        </div>
                                        <span
                                            className={`${s.when_roadmap_item_labels_title} ${
                                                isInView.shellRedemption
                                                    ? s.when_roadmap_purpleLeft
                                                    : ""
                                            }`}
                                            ref={redemptionRef}
                                        >
                                            $SHELL Redemption
                                        </span>
                                        <div className={s.when_roadmap_item_labels_target}>
                                            Live: Aug 29-30
                                        </div>
                                        <div className={s.when_roadmap_item_labels_description}>
                                            Spend your hard-earned $SHELL on different types of
                                            rewards
                                        </div>
                                    </div>
                                </div>

                                {/******************* Mystery Bowl Mint *****************/}
                                <div className={s.when_roadmap_item}>
                                    <div className={s.when_roadmap_item_img}>
                                        <img
                                            src="/img/home/whenSection/Mystery Bowl Mint.gif"
                                            alt=""
                                        />
                                    </div>
                                    <div className={s.when_roadmap_item_labels}>
                                        <div className={s.when_roadmap_item_labels_progress}>
                                            IN PROGRESS
                                        </div>
                                        <span
                                            className={`${s.when_roadmap_item_labels_title} ${
                                                isInView.bowlMint ? s.when_roadmap_purpleRight : ""
                                            }`}
                                            ref={mintRef}
                                        >
                                            Mystery Bowl Mint
                                        </span>
                                        <div className={s.when_roadmap_item_labels_target}>
                                            Live: Sept 6
                                        </div>
                                        <div className={s.when_roadmap_item_labels_description}>
                                            Release of limited supply Founder’s Edition Mystery
                                            Bowls
                                        </div>
                                    </div>
                                </div>

                                {/******************* Anomura Hatching *****************/}
                                <div className={s.when_roadmap_item}>
                                    <div className={s.when_roadmap_item_img}>
                                        <img
                                            src="/img/home/whenSection/Anomura-Hatching.gif"
                                            alt=""
                                        />
                                    </div>
                                    <div className={s.when_roadmap_item_labels}>
                                        <span
                                            className={`${s.when_roadmap_item_labels_title} ${
                                                isInView.anomuraHatching
                                                    ? s.when_roadmap_purpleLeft
                                                    : ""
                                            }`}
                                            ref={anomuraHatchRef}
                                        >
                                            Anomura Hatching
                                        </span>

                                        <div className={s.when_roadmap_item_labels_description}>
                                            Generative Anomura will hatch and reveal rarity
                                        </div>
                                    </div>
                                </div>

                                {/******************* GAME DEMO  *****************/}
                                <div className={s.when_roadmap_item}>
                                    <div className={s.when_roadmap_item_img}>
                                        <img
                                            src="/img/home/whenSection/Launch F2P Demo.gif"
                                            alt=""
                                        />
                                    </div>
                                    <div className={s.when_roadmap_item_labels}>
                                        <div className={s.when_roadmap_item_labels_progress}>
                                            IN PROGRESS
                                        </div>
                                        <span
                                            className={`${s.when_roadmap_item_labels_title} ${
                                                isInView.gameDemo ? s.when_roadmap_purpleRight : ""
                                            }`}
                                            ref={gameDemoRef}
                                        >
                                            Launch F2P Game Concept Demo
                                        </span>
                                        {/* <div className={s.when_roadmap_item_labels_target}>
                                            Target date: Q4 2022
                                        </div> */}
                                        <div className={s.when_roadmap_item_labels_description}>
                                            Discover the world of Anomura -- without a wallet!
                                        </div>
                                    </div>
                                </div>

                                {/******************* Web first game experience *****************/}
                                <div className={s.when_roadmap_item}>
                                    <div className={s.when_roadmap_item_img}>
                                        <img
                                            src="/img/home/whenSection/Web First Game.gif"
                                            alt=""
                                        />
                                    </div>
                                    <div className={s.when_roadmap_item_labels}>
                                        <span
                                            className={`${s.when_roadmap_item_labels_title} ${
                                                isInView.webGame ? s.when_roadmap_purpleLeft : ""
                                            }`}
                                            ref={webGameRef}
                                        >
                                            Launch Web-based Game Experience
                                        </span>

                                        <div className={s.when_roadmap_item_labels_description}>
                                            Play Anomura on all compatible web browsers
                                        </div>
                                    </div>
                                </div>

                                {/******************* Earn equipment NFTs *****************/}
                                <div className={s.when_roadmap_item}>
                                    <div className={s.when_roadmap_item_img}>
                                        <img
                                            src="/img/home/whenSection/Earn Equipment NFTs.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className={s.when_roadmap_item_labels}>
                                        <span
                                            className={`${s.when_roadmap_item_labels_title} ${
                                                isInView.equipmentNFT
                                                    ? s.when_roadmap_purpleRight
                                                    : ""
                                            }`}
                                            ref={equipmentRef}
                                        >
                                            Earn Equipment NFTs
                                        </span>

                                        <div className={s.when_roadmap_item_labels_description}>
                                            Collect & level up your Anomura
                                        </div>
                                    </div>
                                </div>

                                {/******************* Launch Inventory System *****************/}
                                <div className={s.when_roadmap_item}>
                                    <div className={s.when_roadmap_item_img}>
                                        <img
                                            src="/img/home/whenSection/Launch Inventory System.gif"
                                            alt=""
                                        />
                                    </div>
                                    <div className={s.when_roadmap_item_labels}>
                                        <span
                                            className={`${s.when_roadmap_item_labels_title} ${
                                                isInView.inventory ? s.when_roadmap_purpleLeft : ""
                                            }`}
                                            ref={inventoryRef}
                                        >
                                            Launch Inventory System
                                        </span>

                                        <div className={s.when_roadmap_item_labels_description}>
                                            Equip and view your Anomura NFT on our dApp
                                        </div>
                                    </div>
                                </div>

                                {/******************* Launch Mobile Game App *****************/}
                                <div className={s.when_roadmap_item}>
                                    <div className={s.when_roadmap_item_img}>
                                        <img src="/img/home/whenSection/Mobile app.gif" alt="" />
                                    </div>
                                    <div className={s.when_roadmap_item_labels}>
                                        <span
                                            className={`${s.when_roadmap_item_labels_title} ${
                                                isInView.mobileGame
                                                    ? s.when_roadmap_purpleRight
                                                    : ""
                                            }`}
                                            ref={mobileGameRef}
                                        >
                                            Launch Mobile Game App
                                        </span>

                                        <div className={s.when_roadmap_item_labels_description}>
                                            Play Anomura wherever you go
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
