import React, { useState, useEffect, useLayoutEffect } from "react";
import { useScrollValue } from "/lib/useScrollValue";
import s from "/sass/home/home.module.css";

const InitialOffset = 590,
    TwentyEightHundredOffset = 25,
    TwentyFiveHundredOffset = 25,
    NineteenHundredOffset = 25,
    SixteenHundredOffset = 25,
    TwelveHundredOffSet = 25,
    OneThousandOffSet = 50,
    EightHundredOffSet = 90,
    SixHundredOffSet = 100,
    FourHundredOffSet = 65;

export default function NFT({ ScrollPercent }) {
    const [scrollSpeed, setScrollSpeed] = React.useState(-6.5);

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

    useLayoutEffect(() => {
        if (window.innerWidth <= 1200) setScrollSpeed(-4.5);
        if (window.innerWidth <= 600) setScrollSpeed(-2);
    });

    return (
        <div className={s.nft} style={{ top: `calc(${calculatedOffsetY}px)` }}>
            <div className={s.nft_container}>
                <div className={s.nft_text}>
                    <div className={`${s.nft_star2Container}`}>
                        <img
                            className={`${s.nft_star} ${s.nft_star2}`}
                            src="/img/home/starfish01.gif"
                        />
                    </div>

                    <div>
                        <div className={s.nft_heading}>NFT X VIDEOGAME!</div>
                        <div className={s.nft_paragraphContainer}>
                            <p>
                                The Anomura are sworn protectors of the Universe and all realms in
                                the Infinity Circle.
                            </p>
                            <p>Mint original Anomura, each with unique traits and habitats.</p>
                            <p>
                                Gain exclusive access to the game using your Anomura NFT, reap
                                rewards, participate in events, and more.
                            </p>
                        </div>
                    </div>
                    <div className={`${s.nft_star1Container}`}>
                        <img
                            className={`${s.nft_star} ${s.nft_star1}  `}
                            src="/img/home/starfish01.gif"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
