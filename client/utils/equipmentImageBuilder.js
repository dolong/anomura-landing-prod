const fs = require("fs");
const path = require("path");
// const tools = require("simple-svg-tools");
const sharp = require("sharp");
let FormData = require("form-data");
let cloudinary = require("cloudinary").v2;

const {
    getBody,
    getClaws,
    getShell,
    getLegs,
    getBackground,
    getHeadPieces,
} = require("../scripts/crabData");

const { EquipmentType, EquipmentRarity } = require("@prisma/client");

const { prisma } = require("../repositories/PrismaContext")

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

const SVG_PREFIXTAG = `<?xml version="1.0" encoding="UTF-8" ?>
<svg version="1.1" width="384" height="384" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">`;

exports.equipmentImageBuilder = async (equipment) => {
    const { equipmentId,
        collectionAddress,
        equipmentName,
        equipmentType,
        equipmentRarity, } = equipment;

    const imageDir = path.resolve("./public", "img/imageviewer");
    try {
        // finding correct name to resolve correct part to look up
        let anomuraSvg = await prisma.anomuraPartSVG.findMany();
        let equipmentBackgroundLayerIndex = anomuraSvg.findIndex(
            (el) => el.part === "EquipmentBackground" && el.attribute === getSourceOnEquipmentRarity(equipmentRarity)
        );

        let backgroundLayer = anomuraSvg[equipmentBackgroundLayerIndex].svg;

        // finding correct rarity to resolve correct background behind
        let partLayerIndex;
        let correctEquipmentName = '';
        switch (equipmentType) {
            case EquipmentType.BODY:
                correctEquipmentName = getBody(equipmentName);
                partLayerIndex = anomuraSvg.findIndex(
                    (el) => el.part === "Body" && el.attribute === correctEquipmentName
                );
                break;
            case EquipmentType.CLAWS:
                correctEquipmentName = getClaws(equipmentName);
                partLayerIndex = anomuraSvg.findIndex(
                    (el) => el.part === "Claws" && el.attribute === correctEquipmentName
                );
                break;
            case EquipmentType.LEGS:
                correctEquipmentName = getLegs(equipmentName);
                partLayerIndex = anomuraSvg.findIndex(
                    (el) => el.part === "Legs" && el.attribute === correctEquipmentName
                );
                break;
            case EquipmentType.SHELL:
                correctEquipmentName = getShell(equipmentName);
                partLayerIndex = anomuraSvg.findIndex(
                    (el) => el.part === "Shell" && el.attribute === correctEquipmentName
                );
                break;
            case EquipmentType.HEADPIECES:
                correctEquipmentName = getHeadPieces(equipmentName);
                partLayerIndex = anomuraSvg.findIndex(
                    (el) => el.part === "HeadPieces" && el.attribute === correctEquipmentName
                );
                break;
            case EquipmentType.HABITAT:
                correctEquipmentName = getBackground(equipmentName);
                partLayerIndex = anomuraSvg.findIndex(
                    (el) => el.part === "Background" && el.attribute === correctEquipmentName
                );
                break;
        }

        let equipmentLayer = anomuraSvg[partLayerIndex].svg;

        let backgroundBuffer = Buffer.from(backgroundLayer)
        let equipmentBuffer = Buffer.from(equipmentLayer)
        let [x, y] = getItemOffsetOnCanvas(equipmentType);

        let pngBuffer = await sharp(backgroundBuffer).composite([
            {
                input: equipmentBuffer,
                left: x,
                top: y,

            }
        ]).png().toBuffer();


        let base64png = `data:image/png;base64,` + Buffer.from(pngBuffer).toString("base64");
        const fileName = `Equipment_${collectionAddress}_${equipmentId}`;

        let res = await cloudinary.uploader.upload(base64png, {
            public_id: fileName,
            upload_preset: process.env.NEXT_PUBLIC_TESTNET_MODE == "false" ? "Equipment" : "Equipment-Staging",
        });
        await prisma.$disconnect();
        console.log(res.secure_url)
        return res.secure_url;
    } catch (error) {
        await prisma.$disconnect();
        console.log(`Catch error adding image for equipment: ${equipmentId}, equipmentName: ${equipmentName}, equipmentType: ${equipmentType}`);
        throw error;
    }

};
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
const getItemOffsetOnCanvas = (equipmentType) => {
    switch (equipmentType) {
        case EquipmentType.BODY:
            return [-25, -60];
        case EquipmentType.CLAWS:
            return [-26, -100];
        case EquipmentType.LEGS:
            return [-2, -80];
        case EquipmentType.SHELL:
            return [15, 15];
        case EquipmentType.HEADPIECES:
            return [-35, 70];
        case EquipmentType.HABITAT:
            return [0, 0];
        default:
            throw new Error(`Invalid equipment type`);
    }
};