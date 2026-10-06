import React, { useState } from "react";
import { useScrollValue } from "/lib/useScrollValue";
import s from "/sass/home/meetTheTeam/index.module.css";

const InitialOffset = 3700,
    ThirtyEightHundredOffset = 3000,
    TwentyEightHundredOffset = 2250,
    TwentyFiveHundredOffset = 2100,
    NineteenHundredOffset = 700,
    SixteenHundredOffset = 600,
    TwelveHundredOffSet = 700,
    OneThousandOffSet = 700,
    EightHundredOffSet = 650,
    SixHundredOffSet = -60,
    FourHundredOffSet = -285;

export default function MeetTheTeam({ ScrollPercent }) {
    const [scrollSpeed, setScrollSpeed] = React.useState(-55);
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

    React.useEffect(() => {
        if (window?.innerWidth <= 1200) setScrollSpeed(-28);
        if (window?.innerWidth <= 600) setScrollSpeed(-13);
        if (window?.innerWidth <= 375) setScrollSpeed(-13);
    }, []);

    return (
        <div className={s.meetTheTeam_zone} style={{ top: `calc(${calculatedOffsetY}px)` }}>
            <div className={s.meetTheTeam_container}>
                <div className={s.meetTheTeam_text}>
                    <div className={s.meetTheTeam_heading}>MEET THE TEAM</div>
                </div>

                <div className={s.meetTheTeam_paragraphContainer}>
                    <p>
                        Our Coconut Crabs have teamed up to build the best next-gen strategy RPG
                        with a greater purpose. Cunning, Rambunctious, Awesome, and Brilliant
                        (CRAB), meet the cast:
                    </p>
                </div>
                <div className={s.meetTheTeam_members}>
                    <div className={s.meetTheTeam_members_wrapper}>
                        <div className={s.meetTheTeam_members_card}>
                            <img src="/img/home/team/team_background.svg" />
                            <div className={s.meetTheTeam_members_card_container}>
                                <div className={s.meetTheTeam_members_card_top}>
                                    <div className={s.meetTheTeam_members_card_top_avatar}>
                                        <img src="/img/home/team/Long_x5_01.png" />
                                    </div>
                                </div>
                                <div className={s.meetTheTeam_members_card_bottom}>
                                    <div className={s.meetTheTeam_members_card_bottom_name}>
                                        LONG
                                    </div>
                                    <div className={s.meetTheTeam_members_card_bottom_position}>
                                        Founder
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={s.meetTheTeam_members_card}>
                            <img src="/img/home/team/team_background.svg" />
                            <div className={s.meetTheTeam_members_card_container}>
                                <div className={s.meetTheTeam_members_card_top}>
                                    <div className={s.meetTheTeam_members_card_top_avatar}>
                                        <img src="/img/home/team/Daniele_x5_01.png" />
                                    </div>
                                </div>
                                <div className={s.meetTheTeam_members_card_bottom}>
                                    <div className={s.meetTheTeam_members_card_bottom_name}>
                                        DANIELE
                                    </div>
                                    <div className={s.meetTheTeam_members_card_bottom_position}>
                                        Game Artist & Design
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={s.meetTheTeam_members_card}>
                            <img src="/img/home/team/team_background.svg" />
                            <div className={s.meetTheTeam_members_card_container}>
                                <div className={s.meetTheTeam_members_card_top}>
                                    <div className={s.meetTheTeam_members_card_top_avatar}>
                                        <img src="/img/home/team/Bernice_x5_01.png" />
                                    </div>
                                </div>
                                <div className={s.meetTheTeam_members_card_bottom}>
                                    <div className={s.meetTheTeam_members_card_bottom_name}>
                                        BERNICE
                                    </div>
                                    <div className={s.meetTheTeam_members_card_bottom_position}>
                                        Marketing & Community
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={s.meetTheTeam_members_card}>
                            <img src="/img/home/team/team_background.svg" />
                            <div className={s.meetTheTeam_members_card_container}>
                                <div className={s.meetTheTeam_members_card_top}>
                                    <div className={s.meetTheTeam_members_card_top_avatar}>
                                        <img src="/img/home/team/Momo_x5_01.png" />
                                    </div>
                                </div>
                                <div className={s.meetTheTeam_members_card_bottom}>
                                    <div className={s.meetTheTeam_members_card_bottom_name}>
                                        MOMO
                                    </div>
                                    <div className={s.meetTheTeam_members_card_bottom_position}>
                                        Visual Design
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={s.meetTheTeam_members_card}>
                            <img src="/img/home/team/team_background.svg" />
                            <div className={s.meetTheTeam_members_card_container}>
                                <div className={s.meetTheTeam_members_card_top}>
                                    <div className={s.meetTheTeam_members_card_top_avatar}>
                                        <img src="/img/home/team/Quan_x5_01.png" />
                                    </div>
                                </div>
                                <div className={s.meetTheTeam_members_card_bottom}>
                                    <div className={s.meetTheTeam_members_card_bottom_name}>
                                        QUAN
                                    </div>
                                    <div className={s.meetTheTeam_members_card_bottom_position}>
                                        Developer
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={s.meetTheTeam_members_card}>
                            <img src="/img/home/team/team_background.svg" />
                            <div className={s.meetTheTeam_members_card_container}>
                                <div className={s.meetTheTeam_members_card_top}>
                                    <div className={s.meetTheTeam_members_card_top_avatar}>
                                        <img src="/img/home/team/Laura_x5_01.png" />
                                    </div>
                                </div>
                                <div className={s.meetTheTeam_members_card_bottom}>
                                    <div className={s.meetTheTeam_members_card_bottom_name}>
                                        LAURA
                                    </div>
                                    <div className={s.meetTheTeam_members_card_bottom_position}>
                                        Communications
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={s.meetTheTeam_members_card}>
                            <img src="/img/home/team/team_background.svg" />
                            <div className={s.meetTheTeam_members_card_container}>
                                <div className={s.meetTheTeam_members_card_top}>
                                    <div className={s.meetTheTeam_members_card_top_avatar}>
                                        <img src="/img/home/team/Isaac_x5_01.png" />
                                    </div>
                                </div>
                                <div className={s.meetTheTeam_members_card_bottom}>
                                    <div className={s.meetTheTeam_members_card_bottom_name}>
                                        ISAAC
                                    </div>
                                    <div className={s.meetTheTeam_members_card_bottom_position}>
                                        Project Manager
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
