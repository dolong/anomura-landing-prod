
const Prisma = require("@qhuynhvhslab/anomura-prisma-package");

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
let FormData = require("form-data");

let cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

const UPLOADPRESET = "anomura_equipment"

const { backgrounds, bodies, claws, legs, shells, headpieces } = require("./crabData");

async function main() {

    console.log("This script manually upload part of the anomura to cloudinary for equipment reference later");

    const { prisma, equipmentType } = await Prisma.createContext();

    let backgroundImageUploadTask = backgrounds.map(async bg => {
        let backgroundImage = await AnomuraPartImageUpload({
            imageName: bg, type: "Background"
        });

        await prisma.AnomuraPartImage.upsert({
            where: {
                name: bg,
            },
            create: {
                name: bg,
                url: backgroundImage,
            },
            update: {
                url: backgroundImage,
            },
        });
        console.log(` ${bg} uploaded to ${backgroundImage}`);
    })
    await Promise.all(backgroundImageUploadTask)

    let bodyImageUploadTask = bodies.map(async part => {
        let image = await AnomuraPartImageUpload({
            imageName: part, type: "Body"
        });

        await prisma.AnomuraPartImage.upsert({
            where: {
                name: part,
            },
            create: {
                name: part,
                url: image,
            },
            update: {
                url: image,
            },
        });
        console.log(` ${part} uploaded to ${image}`);
    })
    await Promise.all(bodyImageUploadTask)

    // claw image
    let clawImageUploadTask = claws.map(async part => {
        let image = await AnomuraPartImageUpload({
            imageName: part, type: "Claws"
        });

        await prisma.AnomuraPartImage.upsert({
            where: {
                name: part,
            },
            create: {
                name: part,
                url: image,
            },
            update: {
                url: image,
            },
        });
        console.log(` ${part} uploaded to ${image}`);
    })
    await Promise.all(clawImageUploadTask)

    // leg image
    let legImageUploadTask = legs.map(async part => {
        let image = await AnomuraPartImageUpload({
            imageName: part, type: "Legs"
        });

        await prisma.AnomuraPartImage.upsert({
            where: {
                name: part,
            },
            create: {
                name: part,
                url: image,
            },
            update: {
                url: image,
            },
        });
        console.log(` ${part} uploaded to ${image}`);
    })
    await Promise.all(legImageUploadTask)

    // shell image
    let shellImageUploadTask = shells.map(async part => {
        let image = await AnomuraPartImageUpload({
            imageName: part, type: "Shell"
        });

        await prisma.AnomuraPartImage.upsert({
            where: {
                name: part,
            },
            create: {
                name: part,
                url: image,
            },
            update: {
                url: image,
            },
        });
        console.log(` ${part} uploaded to ${image}`);
    })
    await Promise.all(shellImageUploadTask)

    // headpiece image
    let headpiecesImageUploadTask = headpieces.map(async part => {
        let image = await AnomuraPartImageUpload({
            imageName: part, type: "HeadPieces"
        });

        await prisma.AnomuraPartImage.upsert({
            where: {
                name: part,
            },
            create: {
                name: part,
                url: image,
            },
            update: {
                url: image,
            },
        });
        console.log(` ${part} uploaded to ${image}`);
    })
    await Promise.all(headpiecesImageUploadTask)

    await prisma.$disconnect();
}


const AnomuraPartImageUpload = async ({ imageName, type }) => {
    const dirRelativeToPublicFolder = "img/imageviewer";
    const imageDir = path.resolve("./public", dirRelativeToPublicFolder);
    let file

    if (type === "Background") {
        let backgroundPath =
            path.resolve(`${imageDir}/Background/${imageName}_1.png`);

        file = fs.readFileSync(backgroundPath)
    }
    if (type === "Claws") {
        let clawPath =
            path.resolve(`${imageDir}/Claws/${imageName}_1.png`);

        file = fs.readFileSync(clawPath)
    }
    if (type === "Body") {
        let bodyPath =
            path.resolve(`${imageDir}/Body/${imageName}_1.png`);

        file = fs.readFileSync(bodyPath)
    }
    if (type === "Shell") {
        let shellPath =
            path.resolve(`${imageDir}/Shell/${imageName}_1.png`);

        file = fs.readFileSync(shellPath)
    }
    if (type === "Legs") {
        let legPath =
            path.resolve(`${imageDir}/Legs/${imageName}_1.png`);

        file = fs.readFileSync(legPath)
    }
    if (type === "HeadPieces") {
        let headpiecesPath =
            path.resolve(`${imageDir}/HeadPieces/${imageName}_1.png`);

        file = fs.readFileSync(headpiecesPath)
    }


    let base64png = `data:image/png;base64,` + Buffer.from(file).toString("base64");
    let res = await cloudinary.uploader.upload(base64png, { public_id: imageName, upload_preset: UPLOADPRESET });

    return res.secure_url

}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // await prisma.$disconnect();
    });

