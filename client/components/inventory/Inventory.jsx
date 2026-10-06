import React, { useState, useCallback, useEffect, memo } from "react";
import s from "/sass/inventory/index.module.css";
import useTable from "@hooks/useTable";
import axios from "axios";
import AnomuraCanvas from "./shared/AnomuraCanvas";

const ANOMURA = 1;
const BOWL = 2;

let anomuraArray = [
    {
        tokenId: 1,
        background: "Reborn Natural Sea",
        body: "Tempestuous Rave Body",
        claws: "Majestic Sky Claw of Doom",
        shell: "Wit of Lu Dongbin Holy Temple of the Unworldly",
        legs: "Argent Leg",
        headPieces: "Kunzite",
    },
    {
        tokenId: 2,
        background: "Reborn Natural Sea",
        body: "Tempestuous Rave Body",
        claws: "Majestic Sky Claw of Doom",
        shell: "Wit of Lu Dongbin Holy Temple of the Unworldly",
        legs: "Argent Leg",
        headPieces: "Kunzite",
    },
    {
        tokenId: 3,
        background: "Reborn Natural Sea",
        body: "Tempestuous Rave Body",
        claws: "Majestic Sky Claw of Doom",
        shell: "Wit of Lu Dongbin Holy Temple of the Unworldly",
        legs: "Argent Leg",
        headPieces: "Kunzite",
    },
    {
        tokenId: 4,
        background: "Reborn Natural Sea",
        body: "Tempestuous Rave Body",
        claws: "Majestic Sky Claw of Doom",
        shell: "Wit of Lu Dongbin Holy Temple of the Unworldly",
        legs: "Argent Leg",
        headPieces: "Kunzite",
    },
    {
        tokenId: 5,
        background: "Reborn Natural Sea",
        body: "Tempestuous Rave Body",
        claws: "Majestic Sky Claw of Doom",
        shell: "Wit of Lu Dongbin Holy Temple of the Unworldly",
        legs: "Argent Leg",
        headPieces: "Kunzite",
    },
    {
        tokenId: 6,
        background: "Reborn Natural Sea",
        body: "Tempestuous Rave Body",
        claws: "Majestic Sky Claw of Doom",
        shell: "Wit of Lu Dongbin Holy Temple of the Unworldly",
        legs: "Argent Leg",
        headPieces: "Kunzite",
    },
    {
        tokenId: 7,
        background: "Reborn Natural Sea",
        body: "Tempestuous Rave Body",
        claws: "Majestic Sky Claw of Doom",
        shell: "Wit of Lu Dongbin Holy Temple of the Unworldly",
        legs: "Argent Leg",
        headPieces: "Kunzite",
    },
    {
        tokenId: 8,
        background: "Reborn Natural Sea",
        body: "Tempestuous Rave Body",
        claws: "Majestic Sky Claw of Doom",
        shell: "Wit of Lu Dongbin Holy Temple of the Unworldly",
        legs: "Argent Leg",
        headPieces: "Kunzite",
    },
    {
        tokenId: 9,
        background: "Reborn Natural Sea",
        body: "Tempestuous Rave Body",
        claws: "Majestic Sky Claw of Doom",
        shell: "Wit of Lu Dongbin Holy Temple of the Unworldly",
        legs: "Argent Leg",
        headPieces: "Kunzite",
    },
    {
        tokenId: 10,
        background: "Reborn Natural Sea",
        body: "Tempestuous Rave Body",
        claws: "Majestic Sky Claw of Doom",
        shell: "Wit of Lu Dongbin Holy Temple of the Unworldly",
        legs: "Argent Leg",
        headPieces: "Kunzite",
    },
];

export default function Inventory({ nfts, isMobile }) {
    const [inventoryState, setInventoryState] = useState(ANOMURA);
    const [isLoaded, setIsLoaded] = useState(false);
    const changeInventoryState = useCallback(
        (state) => {
            setInventoryState(state);
        },
        [inventoryState]
    );

    useEffect(async () => {
        if (nfts.hasOwnProperty("anomuras") && !isLoaded) {
            let task = nfts.anomuras.map(async (anomura) => {
                let attributes;
                if (anomura.hasOwnProperty("metadata")) {
                    attributes = anomura.metadata.attributes;
                } else {
                    if (anomura.tokenId) {
                        let metaDataQuery = await axios
                            .get(`https://www.anomuragame.com/api/crabs/${anomura?.tokenId}`)
                            .then((r) => r.data);
                        attributes = metaDataQuery?.attributes;
                    }
                }

                anomura.attributes = await attributes.reduce((obj, item) => {
                    if (item.trait_type == "Background") {
                        obj["background"] = item.value;
                    }
                    if (item.trait_type == "Body") {
                        obj["body"] = item.value;
                    }
                    if (item.trait_type == "Claws") {
                        obj["claws"] = item.value;
                    }
                    if (item.trait_type == "Legs") {
                        obj["legs"] = item.value;
                    }
                    if (item.trait_type == "Shell") {
                        obj["shell"] = item.value;
                    }
                    if (item.trait_type == "HeadPieces") {
                        obj["headPieces"] = item.value;
                    }
                    return obj;
                }, {});
                return anomura;
            });
            await Promise.all(task);
            setIsLoaded(true);
        }
    }, [nfts]);

    return (
        <div className={` ${s.inventory_container}  `}>
            <div className={s.inventory_frame}>
                <div className={`${s.inventory_frame_tab}`}>
                    <div
                        className={`${s.inventory_frame_tab_container} `}
                        onClick={() => changeInventoryState(ANOMURA)}
                    >
                        <div>
                            <span>Anomura</span>
                        </div>
                        <img
                            src={` ${
                                inventoryState === ANOMURA
                                    ? "/img/inventory/Tab_active.png"
                                    : "/img/inventory/Tab_inactive.png"
                            }`}
                            className={` ${
                                inventoryState === ANOMURA
                                    ? s.inventory_frame_tab_active
                                    : s.inventory_frame_tab_inactive
                            }`}
                        />
                    </div>
                </div>
                <div className={`${s.inventory_frame_tab} ${s.inventory_frame_bowl} `}>
                    <div
                        className={`${s.inventory_frame_tab_container}`}
                        onClick={() => changeInventoryState(BOWL)}
                    >
                        <div>
                            <span>{isMobile ? "Bowls" : "Mystery Bowls"}</span>
                        </div>
                        <img
                            src={` ${
                                inventoryState !== ANOMURA
                                    ? "/img/inventory/Tab_active.png"
                                    : "/img/inventory/Tab_inactive.png"
                            }`}
                            className={`${
                                inventoryState !== ANOMURA
                                    ? s.inventory_frame_tab_active
                                    : s.inventory_frame_tab_inactive
                            }`}
                        />
                    </div>
                </div>
                <div
                    className={`${
                        isMobile ? s.inventory_frame_backgroundMobile : s.inventory_frame_background
                    }`}
                >
                    <div
                        className={`${
                            isMobile
                                ? s.inventory_frame_containerMobile
                                : s.inventory_frame_container
                        }`}
                    >
                        {nfts?.error && (
                            <div className={s.inventory_frame_wrapper}>
                                <span>{nfts.error}</span>
                            </div>
                        )}
                        <div className={s.inventory_frame_wrapper}>
                            {/* {inventoryState === ANOMURA && ( 
                                <Frame items={anomuraArray} type={"Anomura"} isMobile={isMobile} />
                            )}*/}
                            {inventoryState === ANOMURA && nfts.anomuras && isLoaded && (
                                <Frame items={nfts.anomuras} type={"Anomura"} />
                            )}
                            {inventoryState === BOWL && nfts.bowls && (
                                <Frame items={nfts.bowls} type={"Bowl"} isMobile={isMobile} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Frame = ({ items, type, isMobile }) => {
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(items, page, isMobile ? 9 : 8);

    const previousPage = useCallback(() => {
        if (page == 1) return;
        setPage(page - 1);
    }, [page]);

    const nextPage = useCallback(() => {
        if (page == range.length) {
            return;
        }

        setPage(page + 1);
    }, [page, range]);

    return (
        <div className={s.inventory_frame_content}>
            <div className={s.inventory_frame_images}>
                <div className={s.inventory_frame_images_wrapper}>
                    {type === "Bowl" &&
                        slice.map((item) => {
                            return <BowlCard key={item?.tokenId} bowl={item} isMobile={isMobile} />;
                        })}

                    {type === "Anomura" &&
                        slice.map((item) => {
                            return (
                                <AnomuraCard
                                    key={item?.tokenId}
                                    anomura={item}
                                    isMobile={isMobile}
                                />
                            );
                        })}
                </div>
            </div>
            <div className={s.inventory_frame_arrows}>
                {slice.length > 0 && (
                    <div className={s.inventory_frame_arrows_wrapper}>
                        <img
                            className={s.inventory_frame_arrows_img}
                            src={`${
                                page === 1
                                    ? "/img/inventory/Arrow Left_Gray.png"
                                    : "/img/inventory/Arrow Left_Blue.png"
                            }`}
                            onClick={() => previousPage()}
                        />
                        <div className={s.inventory_frame_arrows_page}>
                            {page}/{range.length}
                        </div>
                        <img
                            className={s.inventory_frame_arrows_img}
                            src={`${
                                page === range.length
                                    ? "/img/inventory/Arrow Right_Gray.png"
                                    : "/img/inventory/Arrow Right_Blue.png"
                            }`}
                            onClick={() => nextPage()}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
const BowlCard = ({ bowl, isMobile }) => {
    const [showHover, setShowHover] = useState(false);

    return (
        <div
            className={`${
                !isMobile
                    ? s.inventory_frame_images_card_desktop
                    : s.inventory_frame_images_card_mobile
            }`}
        >
            <div
                className={s.inventory_frame_images_card_wrapper}
                onMouseEnter={() => {
                    if (!showHover) {
                        setShowHover(true);
                    }
                }}
                onMouseLeave={() => {
                    if (showHover) {
                        setShowHover(false);
                    }
                }}
            >
                <img
                    className={s.inventory_frame_images_card_border}
                    src="/img/inventory/Frame_Bowl.png"
                />
                <div className={s.inventory_frame_images_card_asset}>
                    <img src="/img/Bowl_starfish_few.gif" />
                </div>
                <div className={s.inventory_frame_images_card_id}>#{bowl.tokenId}</div>
            </div>

            {showHover && (
                <div className={s.inventory_frame_images_card_hover}>
                    <img src={"/img/inventory/Frame_hover.png"} />
                </div>
            )}
        </div>
    );
};

const AnomuraCard = ({ anomura, isMobile }) => {
    const [showHover, setShowHover] = useState(false);
    return (
        <div
            className={`${
                !isMobile
                    ? s.inventory_frame_images_card_desktop
                    : s.inventory_frame_images_card_mobile
            }`}
        >
            <div
                className={s.inventory_frame_images_card_wrapper}
                onMouseEnter={() => {
                    if (!showHover) {
                        setShowHover(true);
                    }
                }}
                onMouseLeave={() => {
                    if (showHover) {
                        setShowHover(false);
                    }
                }}
            >
                <img
                    className={s.inventory_frame_images_card_border}
                    src="/img/inventory/Frame_Anomura.png"
                />
                <div className={s.inventory_frame_images_card_asset}>
                    {anomura.attributes && <AnomuraCanvas anomuraData={anomura.attributes} />}
                </div>
                <div className={s.inventory_frame_images_card_id}>#{anomura.tokenId}</div>
            </div>

            {showHover && (
                <div className={s.inventory_frame_images_card_hover}>
                    <img src={"/img/inventory/Frame_hover.png"} />
                </div>
            )}
        </div>
    );
};
