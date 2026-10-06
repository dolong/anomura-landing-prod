const fs = require("fs");
const path = require("path");
const tools = require("simple-svg-tools");
const sharp = require("sharp");
let FormData = require("form-data");
let cloudinary = require("cloudinary").v2;

const { getBody, getClaws, getShell, getLegs, getBackground, getHeadPieces } = require("../scripts/crabData")

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

const SVG_PREFIXTAG = `<?xml version="1.0" encoding="UTF-8" ?>
<svg version="1.1" width="384" height="384" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">`;

exports.CustomAnomuraImage = async (crab) => {
    const { crabId, background, body, legs, claws, shell, headpieces } = crab;
    const dirRelativeToPublicFolder = "img/imageviewer";
    const imageDir = path.resolve("./public", dirRelativeToPublicFolder);

    let shellName = getShell(shell);
    let legsName = getLegs(legs);
    let bodyName = getBody(body);
    let clawsName = getClaws(claws);

    let shellLayer = await loadImage(path.resolve(`${imageDir}/Shell/${shellName}_1.svg`));
    let legsLayer = await loadImage(path.resolve(`${imageDir}/Legs/${legsName}_1.svg`));
    let bodyLayer = await loadImage(path.resolve(`${imageDir}/Body/${bodyName}_1.svg`));
    let clawsLayer = await loadImage(path.resolve(`${imageDir}/Claws/${clawsName}_8.svg`));

    let combineLayer =
        SVG_PREFIXTAG +
        // backgroundLayer +
        // shadowLayer +
        shellLayer +
        // headpiecesLayer +
        legsLayer +
        bodyLayer +
        clawsLayer +
        "</svg>";

    const pngBuffer = await sharp(Buffer.from(combineLayer)).png().toBuffer();
    let base64png = `data:image/png;base64,` + Buffer.from(pngBuffer).toString("base64");
    const fileName = `Anomura_${crabId}`;

    let res = await cloudinary.uploader.upload(base64png, { public_id: fileName, upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET });
    console.log(res.secure_url)
    return res.secure_url;
};

const loadImage = async (pathToSvg) => {
    let crabImg = await tools.ImportSVG(pathToSvg);
    return crabImg.getBody();
};

const fileExists = async (path) => !!(await fs.promises.stat(path).catch((e) => false));
