const fs = require("fs");
const path = require("path");


// let FormData = require("form-data");
// let cloudinary = require("cloudinary").v2;

// cloudinary.config({
//     cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
//     api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
//     api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
// });

//We need to import the module first
// import { Gif } from 'make-a-gif'
// import fs from "fs";
// import path from "path";

const GIFEncoder = require('gif-encoder-2')
const { createCanvas, Image } = require('canvas')
const { createWriteStream, readdir } = require('fs')
const { promisify } = require('util')

// WATCHOUT FOR LOOP, habitat takes 24, other parts take 25//////////
const gifEncoder = async () => {
    const dirRelativeToPublicFolder = "img/imageviewer/HeadPieces";
    const imageDir = path.join("./public", dirRelativeToPublicFolder);
    const readdirAsync = promisify(readdir)
    // const imagesFolder = path.join(__dirname, 'input')
    let partName = "African Savannah"

    let fileArray = []
    try {
        // for (let i = 1; i <= 24; i++) {
        //     let fileName = `${partName}`;

        //     let fileToUpload
        //     if (i === 25) {
        //         fileName = `${fileName}_hex`
        //     } else {
        //         fileName = `${fileName}_${i}`
        //     }

        //     // fileName = `${fileName}_${i}`

        //     fileToUpload = path.resolve(`${imageDir}/${fileName}.png`);
        //     fileArray.push(fileToUpload)

        // }

        const files = await readdirAsync(imagesFolder)
        console.log(path.join(imagesFolder, files[0]))

        // const [width, height] = await new Promise(resolve2 => {
        //     const image = new Image()
        //     image.onload = () => resolve2([image.width, image.height])
        //     image.src = path.join(imagesFolder, files[0])
        // })
        console.log(width)

        // base GIF filepath on which algorithm is being used
        const dstPath = path.join(__dirname, 'output', `${partName}.gif`)
        // create a write stream for GIF data
        const writeStream = createWriteStream(dstPath)
        // when stream closes GIF is created so resolve promise
        writeStream.on('close', () => {
            resolve1()
        })

        const encoder = new GIFEncoder(384, 384, 'neuquant')
        // pipe encoder's read stream to our write stream
        encoder.createReadStream().pipe(writeStream)
        encoder.start()
        encoder.setDelay(150)

        const canvas = createCanvas(width, height)
        const ctx = canvas.getContext('2d')

        // // draw an image for each file and add frame to encoder
        // for (const file of files) {
        //     await new Promise(resolve3 => {
        //         const image = new Image()
        //         image.onload = () => {
        //             ctx.drawImage(image, 0, 0)
        //             encoder.addFrame(ctx)
        //             resolve3()
        //         }
        //         image.src = path.join(imagesFolder, file)
        //     })
        // }

        // let res = await cloudinary.uploader.upload(fileToUpload, {
        //     public_id: fileName,
        //     upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET
        // });
        // console.log(res.secure_url)
    } catch (error) {
        console.log(error)
    }
};
gifEncoder()
