import s from "/sass/home/nav/index.module.css";
import React, { useState } from "react";
import { useRouter } from "next/router";

const MAIN_MOBILE_NAV = 1;
const ABOUT_MOBILE_NAV = 2;
const OPENSEA_MOBILE_NAV = 3;

/**
 * The main navbar for the website.
 * @returns
 */
export default function Navbar({ isMobile }) {
    // let isMobile = true;
    const [openMenu, setOpenMenu] = useState(false);
    const [mobileNavState, setMobileNavState] = useState(MAIN_MOBILE_NAV);
    const [showMobileNav, setShowMobileNav] = useState(false);
    let router = useRouter();

    React.useEffect(() => {
        setMobileNavState(MAIN_MOBILE_NAV);
        if (window && !isMobile) {
            if (window.innerWidth < 1000) {
                setShowMobileNav(true);
            }
        }
    }, []);

    if (isMobile) {
        return (
            <>
                <div className={s.nav_mobile_bar}>
                    <div
                        className={s.nav_mobile_bar_logo}
                        onClick={(e) => {
                            e.preventDefault();
                            router.push("/");
                        }}
                    >
                        <img src="/img/home/footer/logo-pink-no-padding.png" />
                    </div>
                    <div className={s.nav_mobile_bar_hamburger}>
                        <div className={s.nav_mobile_bar_hamburger_icon}>
                            <button
                                onClick={() => {
                                    document.body.style.position = "fixed";
                                    setOpenMenu(!openMenu);
                                }}
                            >
                                <img src={`img/home/Button_Mobile Menu.png`} alt="Menu" />
                            </button>
                        </div>{" "}
                    </div>
                </div>
                {openMenu && (
                    <div className={s.nav_mobile_wrapper}>
                        <div className={s.nav_mobile_container}>
                            <button
                                onClick={() => {
                                    document.body.style.position = "relative";
                                    setOpenMenu(false);
                                    setMobileNavState(MAIN_MOBILE_NAV);
                                }}
                                className={s.nav_mobile_close}
                            >
                                X
                            </button>

                            <div className={s.nav_mobile_content}>
                                <div
                                    className={s.nav_mobile_content_logo}
                                    onClick={(e) => {
                                        document.body.style.position = "relative";
                                        setOpenMenu(false);

                                        router.push("/");
                                    }}
                                >
                                    <img src="/img/home/footer/logo-pink-no-padding.png" />
                                </div>
                                <div className={s.nav_mobile_content_list}>
                                    {mobileNavState === MAIN_MOBILE_NAV && (
                                        <>
                                            <a
                                                className={s.nav_mobile_content_list_item}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    window.open(
                                                        `https://anomuragame.com/mint/the-void`,
                                                        "_blank"
                                                    );
                                                }}
                                            >
                                                The Void
                                            </a>
                                            <a
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    window.open(
                                                        `https://anomuragame.com/challenger`,
                                                        "_blank"
                                                    );
                                                }}
                                                className={s.nav_mobile_content_list_item}
                                            >
                                                Challenger
                                            </a>
                                            <div
                                                onClick={(e) => {
                                                    setMobileNavState(ABOUT_MOBILE_NAV);
                                                }}
                                                className={s.nav_mobile_content_list_item}
                                            >
                                                About
                                            </div>

                                            <a
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    window.open(
                                                        `https://opensea.io/collection/mystery-bowl`,
                                                        "_blank"
                                                    );
                                                }}
                                                className={s.nav_mobile_content_list_item}
                                            >
                                                Opensea
                                            </a>
                                            <a
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    window.open(
                                                        `https://anomuragame.com/mint`,
                                                        "_blank"
                                                    );
                                                }}
                                                className={s.nav_mobile_content_list_item}
                                            >
                                                Inventory
                                            </a>
                                        </>
                                    )}
                                    {mobileNavState === ABOUT_MOBILE_NAV && (
                                        <>
                                            <a
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    document.body.style.position = "relative";
                                                    setOpenMenu(false);
                                                    setMobileNavState(MAIN_MOBILE_NAV);
                                                    router.push("/roadmap");
                                                }}
                                                className={s.nav_mobile_content_list_item}
                                            >
                                                Roadmap
                                            </a>

                                            <a
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    document.body.style.position = "relative";
                                                    setOpenMenu(false);
                                                    setMobileNavState(MAIN_MOBILE_NAV);
                                                    router.push("/about");
                                                }}
                                                className={s.nav_mobile_content_list_item}
                                            >
                                                Our Story
                                            </a>
                                            <div
                                                onClick={(e) => {
                                                    setMobileNavState(MAIN_MOBILE_NAV);
                                                }}
                                                className={`${s.nav_mobile_content_list_item} ${s.nav_mobile_content_list_teal}`}
                                            >
                                                Back
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className={s.nav_mobile_content_footer}>
                                    {/* <div className={s.nav_mobile_content_footer_button}>
                                        <ConnectButton.Custom>
                                            {({
                                                account,
                                                chain,
                                                openAccountModal,
                                                openChainModal,
                                                openConnectModal,
                                                mounted,
                                            }) => {
                                                return (
                                                    <>
                                                        {(() => {
                                                            if (!mounted || !account || !chain) {
                                                                return (
                                                                    <button
                                                                        onClick={openConnectModal}
                                                                        className={
                                                                            s.nav_mobile_content_footer_button_pink
                                                                        }
                                                                    >
                                                                        <img
                                                                            src={`${Enums.BASEPATH}/img/mint/board/Button_L_Pink.png`}
                                                                            alt="Menu"
                                                                        />
                                                                        <div>
                                                                            <span>
                                                                                CONNECT WALLET
                                                                            </span>
                                                                        </div>
                                                                    </button>
                                                                );
                                                            }

                                                            if (chain.unsupported) {
                                                                return (
                                                                    <button
                                                                        className={
                                                                            s.nav_button_pink
                                                                        }
                                                                        onClick={openChainModal}
                                                                    >
                                                                        <img
                                                                            src={`${Enums.BASEPATH}/img/mint/board/Button_L_Pink.png`}
                                                                            alt="Wrong Network"
                                                                        />
                                                                        <div>
                                                                            <span>
                                                                                Wrong network
                                                                            </span>
                                                                        </div>
                                                                    </button>
                                                                );
                                                            }

                                                            return (
                                                                <>
                                                                    <div
                                                                        onClick={openChainModal}
                                                                        className={
                                                                            s.nav_mobile_content_footer_button_balance
                                                                        }
                                                                    >
                                                                        {account.displayBalance}
                                                                    </div>

                                                                    <button
                                                                        className={
                                                                            s.nav_mobile_content_footer_button_pink
                                                                        }
                                                                        onClick={openAccountModal}
                                                                    >
                                                                        <img
                                                                            src={`${Enums.BASEPATH}/img/mint/board/Button_M_Pink.png`}
                                                                            alt="name"
                                                                        />
                                                                        <div>
                                                                            <span>
                                                                                {
                                                                                    account.displayName
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </button>
                                                                </>
                                                            );
                                                        })()}
                                                    </>
                                                );
                                            }}
                                        </ConnectButton.Custom>
                                    </div> */}
                                    <div className={s.nav_mobile_content_footer_socials}>
                                        <div
                                            className={s.nav_mobile_content_footer_socials_icon}
                                            onClick={() =>
                                                window.open(
                                                    `https://twitter.com/anomuragame`,
                                                    "_blank"
                                                )
                                            }
                                        >
                                            <img src={`/img/home/socials/Social_Twitter.png `} />
                                        </div>

                                        <div
                                            className={s.nav_mobile_content_footer_socials_icon}
                                            onClick={() =>
                                                window.open(
                                                    `https://discord.gg/anomuragame`,
                                                    "_blank"
                                                )
                                            }
                                        >
                                            <img src={`/img/home/socials/Social_Discord.png `} />
                                        </div>
                                        <div
                                            className={s.nav_mobile_content_footer_socials_icon}
                                            onClick={() =>
                                                window.open(
                                                    `https://etherscan.io/address/0xe2ddf03ba8cdafd2bb4884e52f7fb46df4fc7dc1`,
                                                    "_blank"
                                                )
                                            }
                                        >
                                            <img src={`/img/home/socials/Social_Etherscan.png `} />
                                        </div>
                                        <div
                                            className={s.nav_mobile_content_footer_socials_icon}
                                            onClick={() =>
                                                window.open(
                                                    `https://opensea.io/collection/mystery-bowl`,
                                                    "_blank"
                                                )
                                            }
                                        >
                                            <img src={`/img/home/socials/Social_Opensea.png `} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    } else {
        return (
            <div className={s.nav_wrapper}>
                <div className={s.nav_menu}>
                    <div className={s.nav_list}>
                        <div className={s.nav_list_first}>
                            <a
                                className={s.nav_list_item}
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.push("/");
                                }}
                            >
                                Home
                            </a>
                            <a
                                className={s.nav_list_item}
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.open(`https://anomuragame.com/the-void`, "_blank");
                                }}
                            >
                                The Void
                            </a>
                            <a
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.open(`https://anomuragame.com/challenger`, "_blank");
                                }}
                                className={s.nav_list_item}
                            >
                                Challenger
                            </a>
                        </div>
                        <div className={s.nav_list_mid}>
                            <div
                                className={s.nav_list_mid_wrapper}
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.push("/");
                                }}
                            >
                                <img src="/img/home/footer/logo-pink-no-padding.png" />
                            </div>
                        </div>
                        <div className={s.nav_list_last}>
                            <ul className={s.nav_list_menu}>
                                <div>
                                    About
                                    <ul className={`${s.nav_list_menu_sub}`}>
                                        <li
                                            onClick={(e) => {
                                                e.preventDefault();
                                                router.push("/roadmap");
                                            }}
                                        >
                                            Roadmap
                                        </li>
                                        <li
                                            onClick={(e) => {
                                                e.preventDefault();
                                                router.push("/about");
                                            }}
                                        >
                                            Our Story
                                        </li>
                                    </ul>
                                </div>
                            </ul>
                            <ul className={s.nav_list_menu}>
                                <div>
                                    OpenSea
                                    <ul className={`${s.nav_list_menu_sub}`}>
                                        <li
                                            onClick={(e) => {
                                                e.preventDefault();
                                                window.open(
                                                    `https://opensea.io/collection/mystery-bowl`,
                                                    "_blank"
                                                );
                                            }}
                                        >
                                            Mystery Bowl
                                        </li>
                                        <li
                                            onClick={(e) => {
                                                e.preventDefault();
                                                window.open(
                                                    `https://opensea.io/collection/anomura`,
                                                    "_blank"
                                                );
                                            }}
                                        >
                                            Anomura
                                        </li>
                                    </ul>
                                </div>
                            </ul>
                            <div className={s.nav_button}>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.open(`https://app.anomuragame.com/claim`, "_blank");
                                    }}
                                    disabled={false}
                                    className={s.nav_button_pink}
                                >
                                    <img src={`/img/home/Button_L_Pink.png`} alt="Menu" />
                                    <div>
                                        <span>Claim</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
