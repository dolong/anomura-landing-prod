import React from "react";
import s from "/sass/home/home.module.css";

export default function ShopZone() {
    const comingSoonRef = React.createRef();
    const [showBanner, setShowBanner] = React.useState(false);
    const [windowSize, setWindowSize] = React.useState({ width: undefined });

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            setWindowSize({
                width: window.innerWidth,
            });
        }
    }, []);

    return (
        <div>
            {/******************* Site Banner *****************/}
            {showBanner && (
                <div className={`${s.banner_zone}`}>
                    <a className={`${s.banner_wrapper}`} href="https://anomuragame.com/challenger">
                        <div className={`${s.banner_shell1}`}>
                            <img
                                className={`${s.banner_shell1_img}`}
                                src="/img/home/Logomark_3x.png"
                            />
                        </div>
                        <div className={`${s.banner_shell2}`}>
                            <img
                                className={`${s.banner_shell2_img}`}
                                src="/img/home/Logomark_3x.png"
                            />
                        </div>
                        <span>
                            DIVE INTO OUR DEEPSEA CHALLENGER
                            <div className={`${s.banner_arrow}`}>
                                <img
                                    className={`${s.banner_arrow_img}`}
                                    src="/img/home/Banner Arrow.png"
                                />
                            </div>
                        </span>
                    </a>
                </div>
            )}
            {/******************* Shop Zone *****************/}
            <div className={`${s.shop_zone}`}>
                <div className={s.shop_fish1}>
                    <img src="/img/home/Fish Left.gif" alt="" />
                </div>

                <picture>
                    <source
                        srcSet="/img/home/shop new sign.webp"
                        media="(min-width: 1200px)"
                        type="image/webp"
                    />

                    {/* <source srcSet="/img/home/shop new sign.gif" media="(min-width: 800px)" /> */}
                    {/*        <source srcSet="/img/home/shop new sign.gif" media="(min-width: 800px)" /> */}
                    {/* <img className={s.shop_img} src="/img/home/shop new sign.gif" alt="" /> */}
                    <img
                        className={s.shop_img}
                        src="https://res.cloudinary.com/deepsea/image/upload/f_auto/v1666470309/Anomura-Web-Assets/shop_mycfky.gif"
                        alt=""
                    />
                </picture>

                <div className={s.shop_fish2}>
                    <img src="/img/home/Fish Right.gif" alt="" />
                </div>
            </div>
            {/******************* Sand Zone and Coming Soon *****************/}
            <div className={s.sand_zone}>
                <div className={s.sand_zone_sand} />
                {/* <img
                    ref={comingSoonRef}
                    className={`${s.comingsoon_img} `}
                    onClick={() => ComingSoonScrollAction()}
                    onMouseEnter={(e) => {
                        e.currentTarget.src =
                            windowSize.width > 1200
                                ? "/img/home/follow_us/coming_soon_on.webp"
                                : "/img/home/follow_us/coming_soon_on.gif";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.src =
                            windowSize.width > 1200
                                ? "/img/home/follow_us/coming_soon_off.webp"
                                : "/img/home/follow_us/coming_soon_off.gif";
                    }}
                    src={`${
                        windowSize.width > 1200
                            ? "/img/home/follow_us/coming_soon_off.webp"
                            : "/img/home/follow_us/coming_soon_off.gif"
                    }`}
                    alt=""
                />

                <div className={`${s.comingsoon_imgMobile} `}>
                    <img src="/img/home/follow_us/coming.gif" alt="" />
                    <img src="/img/home/follow_us/soon.gif" alt="" />
                </div> */}
                <div className={`${s.comingsoon_zone}`}>
                    <div className={s.comingsoon_paragraphContainer}>
                        <h1 className={s.comingsoon_hero_header}>The Cove Awaits You...</h1>
                        {/* <p className={s.comingsoon_hero_text}>
                            Anomura is a play-and-earn strategy RPG game utilizing NFTs and
                            blockchain technology.
                        </p>
                        <p className={s.comingsoon_hero_text}>
                            Strategic gameplay, beautiful pixel art, contributions to wildlife
                            preservation—this is a game with a greater purpose.
                        </p> */}
                        <p>
                            Battle for survival of the Universe in Anomura, a fast-paced NFT
                            strategy RPG inspired by old classics.
                        </p>
                    </div>
                </div>
            </div>
            {/******************* Sand Fixed Bottom*****************/}
            {/* <div className={`${s.sandBottom_zone}`}>
                <div className={s.sandBottom_leftSticker}>
                    <div className={`${s.sandBottom_leftSticker_icons}`}>
                        <a
                            href="https://twitter.com/anomuragame"
                            target="_blank"
                            className={`${s.sandBottom_leftSticker_icons_twitter}`}
                        />
                        <a
                            href="https://discord.gg/anomuragame"
                            target="_blank"
                            className={`${s.sandBottom_leftSticker_icons_discord}`}
                        />
                        <a
                            href="https://medium.com/@anomura"
                            target="_blank"
                            className={`${s.sandBottom_leftSticker_icons_medium}`}
                        />
                    </div>
                    <img className={s.sandBottom_icons} src="/img/home/bottomSand/socials.png" />
                </div>
                <div className={s.sandBottom_right}>
                    <div className={`${s.sandBottom_right_container}`}>
                        <a
                            className={`${s.sandBottom_right_container_discord}`}
                            href="https://discord.gg/anomuragame"
                            target="_blank"
                        >
                            Discord
                        </a>
                        <a
                            href=""
                            className={`${s.sandBottom_right_container_soundOff}`}
                            onClick={TurnOffSound}
                        >
                            <div className={s.sandBottom_right_container_soundOff_link}>
                                <img
                                    className={s.sandBottom_right_container_soundOff_icon}
                                    src={`${
                                        audioControl.isSoundOn
                                            ? "/img/home/bottomSand/volumne on.png"
                                            : "/img/home/bottomSand/volumne off.png"
                                    }`}
                                />
                            </div>

                            <span className={s.sandBottom_right_container_soundOff_text}>
                                Music
                            </span>
                        </a>
                        <div></div>
                    </div>
                    <img
                        className={s.sandBottom_image}
                        src="/img/home/bottomSand/Wood sign_blank.png"
                    />
                </div>
                <div className={s.sandBottom_mobileIcons}>
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
            </div> */}
        </div>
    );
}
