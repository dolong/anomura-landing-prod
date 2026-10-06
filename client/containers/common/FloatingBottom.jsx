import React, { useState, useEffect, useContext } from "react";
import s from "/sass/home/floating-bottom/index.module.css";
import { AudioContext } from "context/AudioContext";

export default function FloatingBottom({ isMobile }) {
    const { audioControl, isAudioLoaded, turnSound } = useContext(AudioContext);

    const TurnOffSound = () => {
        if (audioControl.isSoundOn) {
            turnSound(false);
        } else {
            turnSound(true);
        }
    };

    return (
        <div className={`${s.bottom_zone}`}>
            {isMobile && (
                <div className={s.bottom_mobile}>
                    <a href="https://discord.gg/anomuragame" target="_blank">
                        <img src="/img/home/follow_us/mobile discord.png" />
                    </a>
                    <a href="https://twitter.com/anomuragame" target="_blank">
                        <img src="/img/home/follow_us/mobile twitter.png" />
                    </a>
                    <a href="https://medium.com/@anomura" target="_blank">
                        <img src="/img/home/follow_us/mobile medium.png" />
                    </a>
                </div>
            )}
            {!isMobile && (
                <div className={s.bottom_desktop}>
                    <div className={s.bottom_desktop_wrapper}>
                        <div
                            className={s.bottom_desktop_wrapper_icon}
                            onClick={() => window.open(`https://twitter.com/anomuragame`, "_blank")}
                        >
                            <img src={`/img/home/socials/Social_Twitter.png`} />
                            <img src={`/img/home/socials/Social_Hexagon Outline.png `} />
                        </div>
                        <div
                            className={s.bottom_desktop_wrapper_icon}
                            onClick={() => window.open(`https://discord.gg/anomuragame`, "_blank")}
                        >
                            <img src={`/img/home/socials/Social_Discord.png`} />
                            <img src={`/img/home/socials/Social_Hexagon Outline.png`} />
                        </div>
                        <div
                            className={s.bottom_desktop_wrapper_icon}
                            onClick={() => window.open(`https://medium.com/@anomura`, "_blank")}
                        >
                            <img src={`/img/home/socials/Social_Medium.png `} />
                            <img src={`/img/home/socials/Social_Hexagon Outline.png`} />
                        </div>
                        <div
                            className={s.bottom_desktop_wrapper_icon}
                            onClick={() =>
                                window.open(`https://opensea.io/collection/mystery-bowl`, "_blank")
                            }
                        >
                            <img src={`/img/home/socials/Social_Opensea.png `} />
                            <img src={`/img/home/socials/Social_Hexagon Outline.png`} />
                        </div>
                        <div
                            className={s.bottom_desktop_wrapper_icon}
                            onClick={() => TurnOffSound()}
                        >
                            <img
                                src={`${
                                    audioControl?.isSoundOn
                                        ? "/img/home/socials/Sound_On.png"
                                        : "/img/home/socials/Sound_Off.png"
                                }`}
                            />
                            <img src={`/img/home/socials/Social_Hexagon Outline.png`} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
