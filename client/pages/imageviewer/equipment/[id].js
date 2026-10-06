import React, { useEffect, useState, useCallback } from "react";
import s from "/sass/imageviewer/imageviewer.module.css";
import { useRouter } from "next/router";
import {
    getBody,
    getClaws,
    getShell,
    getLegs,
    getBackground,
    getHeadPieces,
} from "scripts/crabData";

import Enums from "enums";
import { ethers } from "ethers"
import {
    bodyPartsData,
    habitatPartsData,
    clawsPartsData,
    shellPartsData,
    servicePartsData,
    headpiecesPartsData,
    legsPartsData,
    equipmentBackgroundData
} from "resources/cloudinary";


import { PrismaClient, EquipmentRarity, EquipmentType } from '@prisma/client'
const collectionAddress = process.env.NEXT_PUBLIC_EQUIPMENT_ADDRESS
    ? ethers.utils.getAddress(process.env.NEXT_PUBLIC_EQUIPMENT_ADDRESS)
    : null

/** static props and paths should not call to api link since it is not available on build time */
export const getStaticPaths = async () => {
    // Pages are generated on first request so the build does not need a database.
    return {
        paths: [],
        fallback: "blocking",
    };
};

export const getStaticProps = async (context) => {
    const equipmentId = parseInt(context.params.id);

    const prisma = new PrismaClient()
    const data = await prisma.equipment.findUnique({
        where: {
            collectionAddress_equipmentId: { collectionAddress, equipmentId },
        }
    })
    await prisma.$disconnect();
    return {
        props: { equipment: JSON.parse(JSON.stringify(data)), key: equipmentId },
        revalidate: 60,
    };
};

const buildArrayImages = (name, source) => {
    let images = [];

    for (let i = 0; i <= 23; i++) {
        let imagePart = source[name][i];
        images.push(imagePart);
    }
    return images;
};


/* order of layers to work: background, shadow, shells, headpieces, legs, body, claws */
function EquipmentViewerDetails({ equipment }) {
    const router = useRouter();

    let sources = {
        equipment: [],
        equipmentBackground: [],
    };

    if (router.isFallback || !equipment) {
        return <div>Loading Equipment...</div>;
    } else {
        try {
            if (!equipment) {
                return <div className={s.loading}>Loading Equipment...</div>;
            }
            const { equipmentName, equipmentType, equipmentRarity, isReveal } = equipment;
            if (!isReveal) {
                return (
                    // <div style={{
                    //     position: "fixed",
                    //     top: "0",
                    //     left: "0",
                    //     zIndex: "-1",
                    //     width: "100vw",
                    //     height: "100vh",
                    //     padding: "0",
                    //     margin: "0"
                    // }}>
                    //     <div className={s.container} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    //         <div style={{ width: canvasSize.width, height: canvasSize.height, position: "relative" }}>
                    //             <img
                    //                 src="https://res.cloudinary.com/deepsea/image/upload/v1670088118/Anomura-Web-Assets/Rune-Stone_cfnm3u.gif"
                    //                 // layout={"fill"}
                    //                 alt="Equipment Unreveal"
                    //             // fallbackSrc={`/img/book/Rune-Stone.gif`}
                    //             // priority={"true"}
                    //             />
                    //         </div>
                    //     </div>
                    // </div>
                    <img
                        src="https://res.cloudinary.com/deepsea/image/upload/v1670088118/Anomura-Web-Assets/Rune-Stone_cfnm3u.gif"
                        // layout={"fill"}
                        alt="Equipment Unreveal"
                    // fallbackSrc={`/img/book/Rune-Stone.gif`}
                    // priority={"true"}
                    />
                );
            }
            else {

                sources.equipmentBackground = buildArrayImages(
                    getSourceOnEquipmentRarity(equipmentRarity),
                    equipmentBackgroundData
                );

                switch (equipmentType) {
                    case EquipmentType.BODY:
                        sources.equipment = buildArrayImages(getBody(equipmentName), bodyPartsData);
                        break;

                    case EquipmentType.CLAWS:
                        sources.equipment = buildArrayImages(
                            getClaws(equipmentName),
                            clawsPartsData
                        );
                        break;

                    case EquipmentType.LEGS:
                        sources.equipment = buildArrayImages(getLegs(equipmentName), legsPartsData);
                        break;

                    case EquipmentType.SHELL:
                        sources.equipment = buildArrayImages(
                            getShell(equipmentName),
                            shellPartsData
                        );
                        break;

                    case EquipmentType.HEADPIECES:
                        sources.equipment = buildArrayImages(
                            getHeadPieces(equipmentName),
                            headpiecesPartsData
                        );
                        break;

                    case EquipmentType.HABITAT:
                        sources.equipment = buildArrayImages(
                            getBackground(equipmentName),
                            habitatPartsData
                        );
                        break;
                    default:
                        throw new Error(`Invalid equipment type`);
                }

                return <EquipmentCanvas sources={sources} equipment={equipment} />;
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export default EquipmentViewerDetails;

const EquipmentCanvas = ({ sources, equipment }) => {
    const [imagesSrc, setImageSrc] = React.useState({});
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0, clientHeight: 0 });

    const canvasRef = React.createRef(null);
    let canvas = null;
    let context = null;

    useEffect(() => {
        try {
            if (typeof window !== "undefined") {
                if (
                    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
                        navigator.userAgent
                    ) ||
                    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                        navigator.userAgent.substr(0, 4)
                    )
                ) {
                    // setIsMobile(true);
                    setCanvasSize((prevState) => ({
                        ...prevState,
                        width: window?.innerWidth,
                        height: window?.innerWidth,
                    }));
                } else {
                    // setIsMobile(false);
                    setCanvasSize((prevState) => ({
                        ...prevState,
                        width: 508,
                        height: 500,
                    }));
                }
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        if (canvasRef && isLoaded == false) {

            loadEquipmentCanvasImages(sources).done((images) => {

                // setIsLoading(false);
                setIsLoaded(true);
                setImageSrc(images);
            });
        }

        if (isLoaded == true) {
            canvas = canvasRef?.current;
            context = canvas?.getContext("2d");
            drawImagesOnCanvas(imagesSrc, context);
        }
    }, [imagesSrc]);

    const drawImagesOnCanvas = useCallback(async (images, context) => {
        let width = canvasSize.width;
        let height = canvasSize.height;
        let counter = 0;

        let [x, y] = getItemOffsetOnCanvas(equipment.equipmentType, canvasSize.width);

        do {
            if (counter == 24) counter = 0;

            context.drawImage(images.equipmentBackground[counter], 0, 0, width, height);
            context.drawImage(images.equipment[counter], x, y, width, height);
            await sleep();
            counter++;
        } while (true);
    });

    return (
        <div style={{
            position: "fixed",
            top: "0",
            left: "0",
            zIndex: "-1",
            width: "100vw",
            height: "100vh",
            padding: "0",
            margin: "0"
        }}>
            <div className={s.container} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: canvasSize.width, height: canvasSize.height, position: "relative" }}>
                    <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height} />
                </div>
            </div>
        </div>
    );
};

const loadEquipmentCanvasImages = (sources, onFinished) => {
    let imageLoaded = 0,
        numImages = 48;

    const images = {
        equipment: [],
        equipmentBackground: [],
    };
    var postaction = function () { };

    function onFinished() {
        if (imageLoaded == numImages) {
            postaction(images);
        }
    }
    for (let src in sources) {

        for (let index = 0; index <= 23; index++) {

            images[src][index] = new Image();
            images[src][index].onload = function () {
                if (++imageLoaded >= numImages) {
                    onFinished(images);
                }
            };
            try {
                images[src][index].src = sources[src][index];
            } catch (error) {
                console.log(error);
            }
        }
    }
    return {
        done: function (f) {
            postaction = f || postaction;
        },
    };
};

function sleep(ms = 150) {
    return new Promise((res) => setTimeout(res, ms));
}

const getSourceOnEquipmentRarity = (rarity) => {
    switch (rarity) {
        case EquipmentRarity.NORMAL:
            return "Normal";
        case EquipmentRarity.MAGIC:
            return "Magic";
        case EquipmentRarity.RARE:
            return "Rare";
        case EquipmentRarity.LEGENDARY:
            return "Legendary";
        default:
            throw new Error(`Invalid equipment rarity`);
    }
};

const getItemOffsetOnCanvas = (equipmentType, width) => {
    let x, y;
    switch (equipmentType) {
        case EquipmentType.BODY:
            x = -0.8 * ((width * 10) / 100);
            y = -1.75 * ((width * 10) / 100);
            return [x, y];
        case EquipmentType.CLAWS:
            x = -0.8 * ((width * 10) / 100);
            y = -2.5 * ((width * 10) / 100);
            return [x, y];
        case EquipmentType.LEGS:
            x = 0.1 * ((width * 10) / 100);
            y = -2.5 * ((width * 10) / 100);
            return [x, y];
        case EquipmentType.SHELL:
            return [5, 5];
        case EquipmentType.HEADPIECES:
            x = -1 * ((width * 10) / 100);
            y = 2.25 * ((width * 10) / 100);
            return [x, y];
        case EquipmentType.HABITAT:
            return [0, 0];
        default:
            throw new Error(`Invalid equipment type`);
    }
};