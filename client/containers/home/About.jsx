import React, { useState } from "react";
import s from "/sass/home/about/index.module.css";

export default function About() {
    return (
        <div className={s.about_wrapper}>
            <div className={s.about_container}>
                <div className={s.about_text}>
                    <div className={s.about_heading}>WHAT WE ARE</div>
                </div>
                <div className={s.about_banner}>
                    <img src="/img/home/about/Deepsea_4x.png" className={s.about_banner_img} />
                    <div className={s.about_banner_text_wrapper}>
                        <div className={s.about_banner_text_container}>
                            <div>
                                With strategic gameplay, beautiful pixel art and contributions to
                                wildlife initiatives—Anomura is a game with a greater purpose.
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.about_divider}>
                    <div className={s.about_divider_wrapper}>
                        <div className={s.about_divider_container}>
                            {/******************* STORY  *****************/}
                            <div className={s.about_divider_item}>
                                <div className={s.about_divider_item_labels}>
                                    <span className={`${s.about_divider_item_labels_title}`}>
                                        Our Story
                                    </span>
                                    <div className={s.about_divider_item_labels_description}>
                                        Anomura was born in the deep, dark depths of King Crab{" "}
                                        <a
                                            style={{ display: "contents" }}
                                            href={`https://twitter.com/Whale_Drop`}
                                            target={`_blank`}
                                        >
                                            Long Do's
                                        </a>{" "}
                                        mind and began from a love of strategic video games and
                                        marine wildlife. Wanting to re-create the fun games from his
                                        childhood, he assembled a team of talented crabs, and they
                                        all descended the web3 rabbit hole together.
                                    </div>
                                </div>
                            </div>
                            {/******************* MISSION  *****************/}
                            <div className={s.about_divider_item}>
                                <div className={s.about_divider_item_img}>
                                    <img src="/img/home/about/shop_600x400.gif" alt="" />
                                </div>
                                <div className={s.about_divider_item_labels}>
                                    <span className={`${s.about_divider_item_labels_title}`}>
                                        Mission & Vision
                                    </span>
                                    <div className={s.about_divider_item_labels_description}>
                                        <p>
                                            Our mission is to build the best fun & strategic game
                                            that merges web2 and web3 technologies.
                                        </p>

                                        <p>
                                            Our vision is ambitious - we want to transform the video
                                            game and web3 industries through in-game social impact
                                            initiatives.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/******************* INNOVATIVE  *****************/}
                            <div className={s.about_divider_item}>
                                <div className={s.about_divider_item_img}>
                                    <img
                                        src="/img/home/about/Anomura playing video game_600x400.gif"
                                        alt=""
                                    />
                                </div>
                                <div className={s.about_divider_item_labels}>
                                    <span className={`${s.about_divider_item_labels_title}`}>
                                        Fun & Innovative
                                    </span>
                                    <div className={s.about_divider_item_labels_description}>
                                        As lifelong gamers and crypto natives, we’re building the
                                        most compelling and innovative strategy game that stands out
                                        from the crowd.
                                    </div>
                                </div>
                            </div>

                            {/******************* Accessible  *****************/}
                            <div className={s.about_divider_item}>
                                <div className={s.about_divider_item_img}>
                                    <img src="/img/home/about/hex_ruins_600x400.gif" alt="" />
                                </div>
                                <div className={s.about_divider_item_labels}>
                                    <span className={`${s.about_divider_item_labels_title} `}>
                                        Accessible
                                    </span>

                                    <div className={s.about_divider_item_labels_description}>
                                        Anomura will tie blockchain concepts to gamification to
                                        explain blockchain concepts to traditional gamers. Players
                                        can carry out challenging blockchain operations like Defi
                                        staking and liquidity pairing in a way that complements a
                                        game's plot.
                                    </div>
                                </div>
                            </div>

                            {/******************* Positive Impact *****************/}
                            <div className={s.about_divider_item}>
                                <div className={s.about_divider_item_img}>
                                    <img src="/img/home/about/animals_600x400.png" alt="" />
                                </div>
                                <div className={s.about_divider_item_labels}>
                                    <span className={`${s.about_divider_item_labels_title}`}>
                                        Positive Impact
                                    </span>

                                    <div className={s.about_divider_item_labels_description}>
                                        We are passionate about Mother Earth and making the world a
                                        better place through our play-to-donate model. Players will
                                        have the choice to allocate in-game rewards towards wildlife
                                        conservation efforts.
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
