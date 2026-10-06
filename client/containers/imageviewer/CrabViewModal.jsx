import {
    Legendary,
    Rare,
    Magic,
    Normal,
    Nothing,
    BACKGROUND,
    CLAWS,
    BODY,
    HEADPIECES,
    SHELL,
    LEGS,
    getBody,
    getClaws,
    getShell,
    getLegs,
    getHeadPieces,
    getRarity,
    getBackground,
    getBackgroundRarity,
    getLegendName,
} from "@scripts/crabData";

import {
    bodyPartsData,
    habitatPartsData,
    clawsPartsData,
    shellPartsData,
    servicePartsData,
    headpiecesPartsData,
    legsPartsData,
} from "resources/cloudinary";

import React, { useEffect } from "react";
import s from "/sass/imageviewer/imageviewer.module.css";

export default function CrabViewModal({ data, setModalOpen }) {
    const { background, body, claws, legs, shell, headpieces } = data;
    const [hoverInfo, setHoverInfo] = React.useState({ name: "", src: "", type: "" });
    const [rarity, setRarity] = React.useState({
        bodyR: null,
        shellR: null,
        legsR: null,
        clawsR: null,
        headpiecesR: null,
        backgroundR: null,
    });

    React.useLayoutEffect(() => {
        let bodyR = getRarity(body);
        let shellR = getRarity(shell);
        let legsR = getRarity(legs);
        let clawsR = getRarity(claws);
        let headpiecesR = getRarity(headpieces);
        let backgroundR = getBackgroundRarity(background);

        setRarity((prevState) => ({
            ...prevState,
            bodyR,
            shellR,
            legsR,
            clawsR,
            headpiecesR,
            backgroundR,
        }));
    }, []);

    const getCardName = (rarity, originalName, type) => {
        if (rarity === Legendary) {
            return getLegendName(originalName, type);
        }
        return originalName;
    };

    const ShowCard = (e) => {
        let cardRarity = null,
            cardImg = null,
            cardName = "",
            cardType,
            cardLabel;

        switch (e) {
            case "shell":
                cardRarity = getRarity(shell);
                cardName = getCardName(cardRarity, shell, SHELL);
                cardType = SHELL;
                break;
            case "legs":
                cardRarity = getRarity(legs);
                cardName = getCardName(cardRarity, legs, LEGS);
                cardType = LEGS;
                break;
            case "body":
                cardRarity = getRarity(body);
                cardName = getCardName(cardRarity, body, BODY);
                cardType = BODY;
                break;
            case "claws":
                cardRarity = getRarity(claws);
                cardName = getCardName(cardRarity, claws, CLAWS);
                cardType = CLAWS;
                break;
            case "headpieces":
                cardRarity = getRarity(headpieces);
                if (
                    headpieces == " " ||
                    headpieces === null ||
                    headpieces === undefined ||
                    headpieces == "None"
                ) {
                    cardName = "YOU HAVE NO HEADPIECE";
                } else {
                    cardName = getCardName(cardRarity, headpieces, HEADPIECES);
                }
                cardType = HEADPIECES;
                break;
            // background does not have legend rarity
            case "background":
                cardRarity = getBackgroundRarity(background);
                cardName = background;
                cardType = BACKGROUND;
                break;
            default:
                break;
        }
        cardImg = getCardImage(cardRarity);
        cardLabel = getCardLabel(cardRarity);
        let labelColor = getRarityLabelColor(cardRarity);

        setHoverInfo({
            rarity: cardRarity.description.toUpperCase(),
            name: cardName,
            src: cardImg,
            label: cardLabel,
            labelColor,
            type: cardType,
        });
    };

    const hideCard = () => {
        setHoverInfo({
            name: "",
            src: "",
            nameColor: "",
        });
    };
    const getCardImage = (rarity) => {
        switch (rarity) {
            case Legendary:
                return "/./img/imageviewer/Others/Card_Legendary.png";
            case Rare:
                return "/./img/imageviewer/Others/Card_Rare.png";
            case Magic:
                return "/./img/imageviewer/Others/Card_Magic.png";
            case Normal:
                return "/./img/imageviewer/Others/Card_Normal.png";
            case Nothing:
                return "/./img/imageviewer/Others/Card_Empty.png";
            default:
                return "/./img/imageviewer/Others/Card_Empty.png";
        }
    };
    const getRarityTextColor = (rarity) => {
        if (rarity == null || rarity == "") {
            return "";
        }
        switch (rarity) {
            case Legendary:
                return s.component_list_item_description_legend;
            case Rare:
                return s.component_list_item_description_rare;
            case Magic:
                return s.component_list_item_description_magic;
            case Normal:
                return s.component_list_item_description_normal;
            default:
                return s.component_list_item_description_normal;
        }
    };
    const getHeadPiecesIcon = (rarity) => {
        switch (rarity) {
            case Legendary:
                return "/img/imageviewer/Others/Headpiece_legendary.png";
            case Rare:
                return "/img/imageviewer/Others/Headpiece_rare.png";
            case Magic:
                return "/img/imageviewer/Others/Headpiece_magic.png";
            case Normal:
                return "/img/imageviewer/Others/Headpiece_normal.png";
            default:
                return "/img/imageviewer/Others/Headpiece_empty.png";
        }
    };
    const getBodyIcon = (rarity) => {
        if (rarity) {
            switch (rarity) {
                case Legendary:
                    return "/img/imageviewer/Others/Body_Legendary.png";
                case Rare:
                    return "/img/imageviewer/Others/Body_Rare.png";
                case Magic:
                    return "/img/imageviewer/Others/Body_Magic.png";
                case Normal:
                    return "/img/imageviewer/Others/Body_normal.png";
                default:
                    return "/img/imageviewer/Others/Body_normal.png";
            }
        }
        return "/img/imageviewer/Others/Body_normal.png";
    };
    const getClawsIcon = (rarity) => {
        if (rarity) {
            switch (rarity) {
                case Legendary:
                    return "/img/imageviewer/Others/Claw_Legendary.png";
                case Rare:
                    return "/img/imageviewer/Others/Claw_rare.png";
                case Magic:
                    return "/img/imageviewer/Others/Claw_magic.png";
                case Normal:
                    return "/img/imageviewer/Others/Claw_normal.png";
                default:
                    return "/img/imageviewer/Others/Claw_normal.png";
            }
        }
        return "/img/imageviewer/Others/Claw_normal.png";
    };
    const getShellIcon = (rarity) => {
        if (rarity) {
            switch (rarity) {
                case Legendary:
                    return "/img/imageviewer/Others/Shell_legendary.png";
                case Rare:
                    return "/img/imageviewer/Others/Shell_rare.png";
                case Magic:
                    return "/img/imageviewer/Others/Shell_magic.png";
                case Normal:
                    return "/img/imageviewer/Others/Shell_normal.png";
                default:
                    return "/img/imageviewer/Others/Shell_normal.png";
            }
        }
        return "/img/imageviewer/Others/Shell_normal.png";
    };
    const getLegsIcon = (rarity) => {
        if (rarity) {
            switch (rarity) {
                case Legendary:
                    return "/img/imageviewer/Others/Leg_legendary.png";
                case Rare:
                    return "/img/imageviewer/Others/Leg_rare.png";
                case Magic:
                    return "/img/imageviewer/Others/Leg_magic.png";
                case Normal:
                    return "/img/imageviewer/Others/Leg_normal.png";
                default:
                    return "/img/imageviewer/Others/Leg_normal.png";
            }
        }
        return "/img/imageviewer/Others/Leg_normal.png";
    };
    const getBackgroundIcon = (rarity) => {
        if (rarity) {
            switch (rarity) {
                case Legendary:
                    return "/img/imageviewer/Others/Land_legendary.png";
                case Rare:
                    return "/img/imageviewer/Others/Land_rare.png";
                case Magic:
                    return "/img/imageviewer/Others/Land_magic.png";
                case Normal:
                    return "/img/imageviewer/Others/Land_normal.png";
                default:
                    return "/img/imageviewer/Others/Land_normal.png";
            }
        }
        return "/img/imageviewer/Others/Land_normal.png";
    };
    const getCardLabel = (rarity) => {
        switch (rarity) {
            case Legendary:
                return "/./img/imageviewer/Others/Rarity Label_Legendary.png";
            case Rare:
                return "/./img/imageviewer/Others/Rarity Label_Rare.png";
            case Magic:
                return "/./img/imageviewer/Others/Rarity Label_Magic.png";
            case Normal:
                return "/./img/imageviewer/Others/Rarity Label_Normal.png";
            case Nothing:
                return "/./img/imageviewer/Others/Rarity Label_Nothing.png";
            default:
                return "/./img/imageviewer/Others/Rarity Label_Nothing.png";
        }
    };
    const getRarityLabelColor = (rarity) => {
        switch (rarity) {
            case Legendary:
                return s.component_card_label_legend;
            case Rare:
                return s.component_card_label_rare;
            case Magic:
                return s.component_card_label_magic;
            case Normal:
                return s.component_card_label_normal;
            case Nothing:
                return s.component_card_label_nothing;
            default:
                return s.component_card_label_nothing;
        }
    };
    const renderCard = (hoverInfo) => {
        let imageStyle, imageSource;
        switch (hoverInfo.type) {
            case SHELL:
                let shellName = getShell(shell);
                imageSource = shellPartsData[shellName][24];
                imageStyle = s.component_card_hexagon_shell;
                break;
            case BODY:
                let bodyName = getBody(body);
                imageSource = bodyPartsData[bodyName][24];
                imageStyle = s.component_card_hexagon_body;
                break;
            case CLAWS:
                let clawName = getClaws(claws);
                imageSource = clawsPartsData[clawName][24];
                imageStyle = s.component_card_hexagon_claws;
                break;
            case LEGS:
                let legsName = getLegs(legs);
                imageSource = legsPartsData[legsName][24];
                imageStyle = s.component_card_hexagon_legs;
                break;
            case HEADPIECES:
                if (hoverInfo.name === "YOU HAVE NO HEADPIECE") {
                    imageSource = "";
                } else {
                    let headPiecesName = getHeadPieces(headpieces);
                    imageSource = headpiecesPartsData[headPiecesName][24];
                }
                imageStyle = s.component_card_hexagon_headpieces;
                break;
            case BACKGROUND:
                let backgroundName = getBackground(background);
                imageSource = habitatPartsData[backgroundName][23];
                imageStyle = s.component_card_hexagon_background;
                break;
            default:
                imageSource = "/img/imageviewer/Others/Land_normal.png";
                break;
        }
        return (
            <div className={s.component_card}>
                <div className={s.component_card_wrapper}>
                    {/* card image */}
                    <img src={hoverInfo.src} />
                    <div className={s.component_card_description}>
                        <div className={s.component_card_hexagon}>
                            <img
                                className={s.component_card_hexagon_greyLayer}
                                src="/img/imageviewer/Others/Grey background.png"
                            />

                            <img className={imageStyle} src={imageSource} />
                        </div>
                        <div className={s.component_card_name}>{hoverInfo.name}</div>
                        <div className={s.component_card_label}>
                            <img src={hoverInfo.label} />
                            <div
                                className={`${s.component_card_label_text} ${hoverInfo.labelColor}`}
                            >
                                {hoverInfo.rarity}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="absolute left-0 top-0 w-full h-full flex justify-center items-center pointer-events-none">
                <div className={s.modal_container}>
                    <div className={s.component_zone}>
                        <div className={s.component_list}>
                            {/* Headpieces icon */}
                            <div className={s.component_list_item}>
                                <div
                                    className={s.component_list_item_icon}
                                    onMouseEnter={() => ShowCard("headpieces")}
                                    onMouseLeave={hideCard}
                                >
                                    <img src={getHeadPiecesIcon(rarity?.headpiecesR)} />
                                    <img src={"/img/imageviewer/Others/Icon Outline.png"} />
                                </div>
                                <div
                                    className={`${
                                        s.component_list_item_description
                                    } ${getRarityTextColor(rarity.headpiecesR)} `}
                                >
                                    {rarity.headpiecesR === Nothing ? "No Headpiece" : headpieces}
                                </div>
                            </div>
                            {/* Body Icon */}
                            <div className={s.component_list_item}>
                                <div
                                    className={s.component_list_item_icon}
                                    onMouseEnter={() => ShowCard("body")}
                                    onMouseLeave={hideCard}
                                >
                                    <img src={getBodyIcon(rarity?.bodyR)} />
                                    <img src={"/img/imageviewer/Others/Icon Outline.png"} />
                                </div>
                                <div
                                    className={`${
                                        s.component_list_item_description
                                    } ${getRarityTextColor(rarity.bodyR)}`}
                                >
                                    {body}
                                </div>
                            </div>
                            {/* Claws Icon */}
                            <div className={s.component_list_item}>
                                <div
                                    className={s.component_list_item_icon}
                                    onMouseEnter={() => ShowCard("claws")}
                                    onMouseLeave={hideCard}
                                >
                                    <img src={getClawsIcon(rarity?.clawsR)} />
                                    <img src={"/img/imageviewer/Others/Icon Outline.png"} />
                                </div>
                                <div
                                    className={`${
                                        s.component_list_item_description
                                    } ${getRarityTextColor(rarity.clawsR)}`}
                                >
                                    {claws}
                                </div>
                            </div>
                            {/* Shells Icon */}
                            <div className={s.component_list_item}>
                                <div
                                    className={s.component_list_item_icon}
                                    onMouseEnter={() => ShowCard("shell")}
                                    onMouseLeave={hideCard}
                                >
                                    <img src={getShellIcon(rarity?.shellR)} />
                                    <img src={"/img/imageviewer/Others/Icon Outline.png"} />
                                </div>
                                <div
                                    className={`${
                                        s.component_list_item_description
                                    } ${getRarityTextColor(rarity.shellR)}`}
                                >
                                    {shell}
                                </div>
                            </div>
                            {/* Legs Icon */}
                            <div className={s.component_list_item}>
                                <div
                                    className={s.component_list_item_icon}
                                    onMouseEnter={() => ShowCard("legs")}
                                    onMouseLeave={hideCard}
                                >
                                    <img src={getLegsIcon(rarity?.legsR)} />
                                    <img src={"/img/imageviewer/Others/Icon Outline.png"} />
                                </div>
                                <div
                                    className={`${
                                        s.component_list_item_description
                                    } ${getRarityTextColor(rarity.legsR)}`}
                                >
                                    {legs}
                                </div>
                            </div>
                            {/* Background Icon*/}
                            <div className={s.component_list_item}>
                                <div
                                    className={s.component_list_item_icon}
                                    onMouseEnter={() => ShowCard("background")}
                                    onMouseLeave={hideCard}
                                >
                                    <img src={getBackgroundIcon(rarity?.backgroundR)} />
                                    <img src={"/img/imageviewer/Others/Icon Outline.png"} />
                                </div>
                                <div
                                    className={`${s.component_list_item_description}  
                                    ${getRarityTextColor(rarity.backgroundR)}
                                    `}
                                >
                                    {background}
                                </div>
                            </div>
                        </div>
                        {/* Card */}
                        {hoverInfo.src !== "" && <>{renderCard(hoverInfo)}</>}
                    </div>
                </div>
                <div className={s.modal_overlay} onClick={() => setModalOpen(false)} />
            </div>
        </>
    );
}
