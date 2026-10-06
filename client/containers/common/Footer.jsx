import React, { useState, useEffect, useContext } from "react";
import { useScrollValue } from "/lib/useScrollValue";
import s from "/sass/home/home.module.css";
import Link from "next/link";
import { AudioContext } from "context/AudioContext";
import Image from "next/image";

const InitialOffset = 6000,
    ThirtyEightHundredOffset = 2850,
    TwentyEightHundredOffset = 1700,
    TwentyFiveHundredOffset = 1650,
    NineteenHundredOffset = -250,
    SixteenHundredOffset = -350,
    TwelveHundredOffSet = 200,
    OneThousandOffSet = 920,
    EightHundredOffSet = -40,
    SixHundredOffSet = 230,
    FourHundredOffSet = -100;

export default function Footer({ ScrollPercent }) {
    const [scrollSpeed, setScrollSpeed] = React.useState(-48);
    const { audioControl, isAudioLoaded } = useContext(AudioContext);
    const bubbleRef = React.createRef();
    let timeout, interval;

    let calculatedOffsetY = useScrollValue(
        ScrollPercent,
        scrollSpeed,
        InitialOffset,
        ThirtyEightHundredOffset,
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

    React.useLayoutEffect(() => {
        if (window.innerWidth <= 1750 && window.innerWidth >= 1600) setScrollSpeed(-55);
        if (window.innerWidth <= 1200) setScrollSpeed(-27);
        if (window.innerWidth <= 600) setScrollSpeed(-14);
        if (window.innerWidth <= 375) setScrollSpeed(-14);

        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", changeAudioVolume);
        return () => {
            window.removeEventListener("scroll", changeAudioVolume);
        };
    }, [bubbleRef]);

    const changeAudioVolume = () => {
        if (bubbleRef.current && isAudioLoaded) {
            let rect = bubbleRef.current.getBoundingClientRect();
            let reference = Math.abs(rect.top);

            let fishVolume = 1 - reference / 800;
            if (fishVolume < 0.1 || !audioControl?.isSoundOn) {
                audioControl.fishPass.setVolume(0);
            } else {
                audioControl.fishPass.setVolume(fishVolume);
            }
        }
    };

    return (
        <div className={s.footer_zone} style={{ top: `calc(${calculatedOffsetY}px)` }}>
            <div className={s.footer_container}>
                <div className={s.footer_follow}>
                    <img src="/img/home/footer/Follow Us.png" alt="Follow Us" />
                    <img className={s.footer_bubble1} src="/img/home/footer/bubbles.gif" />
                </div>

                <div className={s.footer_followContainer} ref={bubbleRef}>
                    <p>
                        Join our community and follow us for the latest updates and upcoming events.
                    </p>
                </div>
                <div className={s.footer_buttons}>
                    <a
                        href="https://discord.gg/anomuragame"
                        target="_blank"
                        className={s.footer_discord}
                    >
                        <div>
                            <span>Discord</span>
                        </div>
                        <img src="/img/home/footer/Discord Button.png" alt="discord link" />
                    </a>
                    <a
                        href="https://medium.com/@anomura"
                        target="_blank"
                        className={s.footer_medium}
                    >
                        <img src="/img/home/footer/Medium Button.png" alt="medium link" />
                        <div>
                            <span>Medium</span>
                        </div>
                    </a>
                    <a
                        href="https://twitter.com/anomuragame"
                        target="_blank"
                        className={s.footer_twitter}
                    >
                        <img src="/img/home/footer/Twitter Button.png" alt="twitter link" />
                        <div>
                            <span>Twitter</span>
                        </div>
                    </a>
                </div>
                <div className={s.footer_anomura}>
                    <img src="/img/home/footer/logo-pink.png" alt="AnomuraLogo" />
                </div>

                <div className={s.footer_presented}>
                    <p>Backed by</p>
                </div>

                <div className={s.footer_logo}>
                    <img src="/img/home/footer/vhs logo trim.png" alt="" />
                </div>

                <div className={s.footer_mission}>
                    <p>
                        Virtually Human’s mission is to uncover what the future of entertainment can
                        do for humanity. Their flagship game ZED RUN is one of the first of its kind
                        created on the blockchain.
                    </p>
                    <img className={s.footer_bubble2} src="/img/home/footer/bubbles.gif" />
                </div>
                <div className={s.footer_chestAndFish}>
                    <ChestAndFish />
                </div>
                <div className={s.footer_policy}>
                    <span className={s.footer_policy_line}></span>
                    <div>
                        <Link href="/PrivacyPolicy.html">Privacy Policy</Link>
                        <Link href="/CCPANotice.html">CCPA Notice</Link>
                        <Link href="/TERMSANDCONDITIONS.html">Terms & Conditions</Link>
                    </div>
                </div>
                <div className={s.footer_chestImage}>
                    <Chest />
                </div>
                <div className={s.footer_fish}>
                    <Fish />
                </div>
            </div>
        </div>
    );
}

const Chest = () => {
    const renderChest = () => {
        return (
            <div
                className={`${s.footer_chestImage_chest}`}
                style={{ width: "100%", height: "100%", position: "relative" }}
            >
                <Image
                    alt="Chest Under Footer"
                    src={
                        "https://res.cloudinary.com/deepsea/image/upload/f_auto/v1666471400/Anomura-Web-Assets/chest_only_ntfhsd.gif"
                    }
                    layout="fill"
                />
            </div>
        );
    };
    const renderChestFloor = () => {
        return (
            <img
                className={`${s.footer_chestImage_floor}`}
                src="/img/home/chests/chestfloor_modified.webp"
                alt=""
            />
        );
    };
    const renderChestLight = () => {
        return (
            <img
                className={`${s.footer_chestImage_light}`}
                src="/img/home/chests/chest_open_lights_modified.webp"
                alt=""
            />
        );
    };
    return (
        <div className={s.footer_chestImage_wrapper}>
            {/* {renderCard()} */}
            {renderChestFloor()}
            {renderChest()}
            {renderChestLight()}
        </div>
    );
};

const Fish = () => {
    const renderFish = () => {
        return (
            <div
                className={`${s.footer_fish_fishImage}`}
                style={{ width: "100%", height: "100%", position: "relative" }}
            >
                <Image
                    src="https://res.cloudinary.com/deepsea/image/upload/f_auto/v1666471414/Anomura-Web-Assets/fish_only_uuqqcn.gif"
                    alt="Fish Under Footer"
                    layout={"fill"}
                />
            </div>
        );
    };

    return <div className={s.footer_fish_wrapper}>{renderFish()}</div>;
};

const ChestAndFish = () => {
    return (
        <>
            <div className={s.footer_chestAndFish_wrapper}>
                <div
                    className={`${s.footer_chestAndFish_chest}`}
                    style={{ width: "100%", height: "100%", position: "relative" }}
                >
                    <Image
                        alt="Chest Under Footer"
                        src={
                            "https://res.cloudinary.com/deepsea/image/upload/f_auto/v1666471400/Anomura-Web-Assets/chest_only_ntfhsd.gif"
                        }
                        layout={"fill"}
                    />
                    <img
                        className={`${s.footer_chestImage_floor}`}
                        src="/img/home/chests/chestfloor_modified.webp"
                        alt="Chest Floor"
                    />
                    <img
                        className={`${s.footer_chestImage_light}`}
                        src="/img/home/chests/chest_open_lights_modified.webp"
                        alt="Chest Light When Open"
                    />
                </div>

                <div
                    className={`${s.footer_chestAndFish_fishImage}`}
                    style={{ width: "100%", height: "100%", position: "relative" }}
                >
                    <Image
                        src="https://res.cloudinary.com/deepsea/image/upload/f_auto/v1666471414/Anomura-Web-Assets/fish_only_uuqqcn.gif"
                        alt="Fish Under Footer"
                        layout={"fill"}
                    />
                </div>
            </div>
        </>
    );
};
