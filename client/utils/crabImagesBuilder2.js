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

const { PrismaClient, EquipmentType } = require("@prisma/client");

// const { prisma } = require("../repositories/PrismaContext")

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

const SVG_PREFIXTAG = `<?xml version="1.0" encoding="UTF-8" ?>
<svg version="1.1" width="384" height="384" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">`;

exports.CrabImagesBuilder = async (crab) => {
    const { crabId, background, body, legs, claws, shell, headpieces } = crab;
    const dirRelativeToPublicFolder = "img/imageviewer";
    const imageDir = path.resolve("./public", dirRelativeToPublicFolder);

    try {
        let backgroundName = getBackground(background);
        let shellName = getShell(shell);
        let legsName = getLegs(legs);
        let bodyName = getBody(body);
        let clawsName = getClaws(claws);
        let headpiecesName = "";
        if (headpieces.trim() !== "") headpiecesName = getHeadPieces(headpieces);

        let prisma = new PrismaClient({});
        // let backgroundLayer = await loadImage(
        //     path.resolve(`${imageDir}/Background/${backgroundName}_1.svg`)
        // );
        // let shellLayer = await loadImage(path.resolve(`${imageDir}/Shell/${shellName}_1.svg`));
        // let legsLayer = await loadImage(path.resolve(`${imageDir}/Legs/${legsName}_1.svg`));
        // let bodyLayer = await loadImage(path.resolve(`${imageDir}/Body/${bodyName}_1.svg`));
        // let clawsLayer = await loadImage(path.resolve(`${imageDir}/Claws/${clawsName}_1.svg`));
        // let shadowLayer = await loadImage(path.resolve(`${imageDir}/Services/shadow_1.svg`));

        let anomuraSvg = await prisma.anomuraPartSVG.findMany();
        let backgroundLayerIndex = anomuraSvg.findIndex(
            (el) => el.part === "Background" && el.attribute === backgroundName
        );
        let backgroundLayer = anomuraSvg[backgroundLayerIndex].svg;

        let shellLayerIndex = anomuraSvg.findIndex(
            (el) => el.part === "Shell" && el.attribute === shellName
        );
        let shellLayer = anomuraSvg[shellLayerIndex].svg;

        let legsLayerIndex = anomuraSvg.findIndex(
            (el) => el.part === "Legs" && el.attribute === legsName
        );
        let legsLayer = anomuraSvg[legsLayerIndex].svg;

        let bodyLayerIndex = anomuraSvg.findIndex(
            (el) => el.part === "Body" && el.attribute === bodyName
        );
        let bodyLayer = anomuraSvg[bodyLayerIndex].svg;

        let clawsLayerIndex = anomuraSvg.findIndex(
            (el) => el.part === "Claws" && el.attribute === clawsName
        );
        let clawsLayer = anomuraSvg[clawsLayerIndex].svg;

        let shadowLayerIndex = anomuraSvg.findIndex(
            (el) => el.part === "Shadow" && el.attribute === "Shadow"
        );
        let shadowLayer = anomuraSvg[shadowLayerIndex].svg;

        let headpiecesLayer = " ";
        if (headpiecesName.trim() !== "" && headpiecesName != "None") {
            let headpiecesLayerIndex = anomuraSvg.findIndex(
                (el) => el.part === "HeadPieces" && el.attribute === headpiecesName
            );
            headpiecesLayer = anomuraSvg[headpiecesLayerIndex].svg;
        }

        let combineLayer =
            SVG_PREFIXTAG +
            backgroundLayer +
            shadowLayer +
            shellLayer +
            headpiecesLayer +
            legsLayer +
            bodyLayer +
            clawsLayer +
            "</svg>";

        const pngBuffer = await sharp(Buffer.from(combineLayer)).png().toBuffer();
        let base64png = `data:image/png;base64,` + Buffer.from(pngBuffer).toString("base64");
        const fileName = `Anomura_${crabId}`;

        let res = await cloudinary.uploader.upload(base64png, {
            public_id: fileName,
            upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET,
        });
        await prisma.$disconnect();

        return res.secure_url;
    } catch (error) {
        await prisma.$disconnect();
        console.log("Catch error adding image for crabId " + crabId);
        console.log(error);
    }

};


const fileExists = async (path) => !!(await fs.promises.stat(path).catch((e) => false));
