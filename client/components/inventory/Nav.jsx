import s from "/sass/inventory/nav/index.module.css";
import Enums from "enums";
import React, { useState, useContext } from "react";
// import Modal from "./shared/Modal";
// import { useWeb3React } from "@web3-react/core";

// import LoginModal from "./auth/LoginModal";
import { Web3Context } from "@context/Web3Context";
import { shortenAddress } from "@utils/shortenAddress";

// export default function MintNav({ isMobile }) {
export default function Nav({ user, isMobile }) {
    const [openMenu, setOpenMenu] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState(null);

    const { connect, disconnect } = useContext(Web3Context);

    const handleLogout = () => {
        try {
            disconnect();
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogin = async () => {
        try {
            await connect();
        } catch (error) {
            alert(error);
            setError(error);
        }

        //
    };

    if (isMobile) {
        return (
            <>
                <div className={s.nav_menu}>
                    <div className={s.nav_stage}>
                        <div className={s.nav_stage_logo}>
                            <img src={`/img/inventory/Logomark.png`} />
                        </div>
                        <div className={s.nav_stage_text}>
                            {/* <div>Minting Now</div>
                            <div>Mintlist</div> */}
                        </div>
                        <div className={s.nav_button}>
                            <button
                                onClick={() => setOpenMenu(!openMenu)}
                                className={s.nav_button_pink}
                                style={{ marginLeft: "1rem" }}
                            >
                                <img src={`/img/inventory/Button_M_Pink.png`} alt="Menu" />
                                <div>
                                    {!user && <span>MENU</span>}
                                    {user && (
                                        <span>
                                            {user?.uathUser !== "undefined"
                                                ? user?.uathUser
                                                : shortenAddress(user?.address)}
                                        </span>
                                    )}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                {openMenu && (
                    <div className={s.nav_mobile}>
                        <div className={s.nav_mobile_wrapper}>
                            <button
                                onClick={() => setOpenMenu(false)}
                                className={s.nav_mobile_close}
                            >
                                X
                            </button>
                            <div className={s.nav_mobile_content}>
                                <div className={s.nav_mobile_content_logo}>
                                    <img
                                        src={`/img/inventory/logo-pink.png`}
                                        alt="AnomuraLogo"
                                        onClick={() => {
                                            window.open(`https://anomuragame.com`, "_blank");
                                        }}
                                    />
                                </div>
                                <div>{error?.message}</div>

                                <div className={s.nav_mobile_content_list}>
                                    <a
                                        className={s.nav_mobile_content_list_item}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.open(`https://anomuragame.com`, "_blank");
                                        }}
                                    >
                                        Home
                                    </a>
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
                                </div>
                                <div className={s.nav_mobile_content_footer}>
                                    <div className={s.nav_mobile_content_footer_button}>
                                        <>
                                            {(() => {
                                                if (!user) {
                                                    return (
                                                        <button
                                                            onClick={() => handleLogin()}
                                                            className={
                                                                s.nav_mobile_content_footer_button_pink
                                                            }
                                                        >
                                                            <img
                                                                src={`/img/inventory/Button_L_Pink.png`}
                                                                alt="Menu"
                                                            />
                                                            <div>
                                                                <span>CONNECT WALLET</span>
                                                            </div>
                                                        </button>
                                                    );
                                                }

                                                // if (chain.unsupported) {
                                                //     return (
                                                //         <button
                                                //             className={
                                                //                 s.nav_button_pink
                                                //             }
                                                //             onClick={openChainModal}
                                                //         >
                                                //             <img
                                                //                 src={`${Enums.BASEPATH}/img/mint/board/Button_L_Pink.png`}
                                                //                 alt="Wrong Network"
                                                //             />
                                                //             <div>
                                                //                 <span>
                                                //                     Wrong network
                                                //                 </span>
                                                //             </div>
                                                //         </button>
                                                //     );
                                                // }

                                                return (
                                                    <>
                                                        {/* <div
                                                                        onClick={openChainModal}
                                                                        className={
                                                                            s.nav_mobile_content_footer_button_balance
                                                                        }
                                                                    >
                                                                        {account.displayBalance}
                                                                    </div> */}

                                                        <button
                                                            className={
                                                                s.nav_mobile_content_footer_button_pink
                                                            }
                                                            onClick={() => handleLogout()}
                                                        >
                                                            <img
                                                                src={`/img/inventory/Button_M_Pink.png`}
                                                                alt="name"
                                                            />
                                                            <div>
                                                                <span>
                                                                    {/* {user && (
                                                                        <span>
                                                                            {user?.uathUser !==
                                                                            "undefined"
                                                                                ? user?.uathUser
                                                                                : shortenAddress(
                                                                                      user?.address
                                                                                  )}
                                                                        </span>
                                                                    )} */}
                                                                    Log Out
                                                                </span>
                                                            </div>
                                                        </button>
                                                    </>
                                                );
                                            })()}
                                        </>
                                    </div>
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
                                            <img src={`/img/inventory/Social_Twitter.png `} />
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
                                            <img src={`/img/inventory/Social_Discord.png `} />
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
                                            <img src={`/img/inventory/Social_Opensea.png `} />
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
            <div className={s.nav_menu}>
                <div className={s.nav_stage}>
                    <div className={s.nav_stage_logo}>
                        <img src={`/img/inventory/Logomark.png `} />
                    </div>
                    <div className={s.nav_stage_text}>
                        <div>Anomura Inventory</div>
                        {/* <div>Public</div>  */}
                    </div>
                </div>

                <div className={s.nav_list}>
                    <a
                        className={s.nav_list_item}
                        onClick={(e) => {
                            e.preventDefault();
                            window.open(`https://anomuragame.com`, "_blank");
                        }}
                    >
                        Home
                    </a>
                </div>

                <div className={s.nav_button}>
                    <>
                        {(() => {
                            // if (!isConnected || !address) {
                            if (!user) {
                                return (
                                    <button
                                        className={s.nav_button_pink}
                                        onClick={() => handleLogin()}
                                    >
                                        <img
                                            src={`${Enums.BASEPATH}/img/shared/Button_L_Pink.png`}
                                            alt="Connect"
                                        />
                                        <div>
                                            <span>Connect</span>
                                        </div>
                                    </button>
                                );
                            } else {
                                return (
                                    <>
                                        <div>
                                            {/* <span>{shortenAddress(data.user.address)}</span> */}
                                            {user && (
                                                <span>
                                                    {user.uathUser !== "undefined" &&
                                                    user.uathUser !== "null"
                                                        ? user.uathUser
                                                        : shortenAddress(user.address)}
                                                </span>
                                            )}
                                        </div>
                                        <button
                                            className={s.nav_button_pink}
                                            onClick={() => handleLogout()}
                                            style={{ marginLeft: "2rem" }}
                                        >
                                            <img
                                                src={`${Enums.BASEPATH}/img/shared/Button_L_Pink.png`}
                                                alt="Account"
                                            />
                                            <div>
                                                {/* <span>{shortenAddress(data.user.address)}</span> */}

                                                <span>Log Out</span>
                                            </div>
                                        </button>
                                    </>
                                );
                            }

                            //     </>
                            // );
                        })()}
                    </>
                </div>
                {/* <Modal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                render={(modal) => (
                    <LoginModal isMobile={isMobile} closeModal={() => setModalOpen(false)} />
                )}
                isConfirm={true}
            /> */}
            </div>
        );
    }
}

// if (chain.unsupported) {
//     return (
//         <button
//             className={s.nav_button_pink}
//             // onClick={openChainModal}
//         >
//             <img
//                 src={`${Enums.BASEPATH}/img/shared/Button_L_Pink.png`}
//                 alt="Wrong Network"
//             />
//             <div>
//                 <span>Wrong network</span>
//             </div>
//         </button>
//     );
// }

// return (
//     <>
//         {/* <div onClick={openChainModal} style={{ color: "white" }}>
//             {account.displayBalance}
//         </div> */}
