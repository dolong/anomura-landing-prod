import { getBody, getClaws, getShell, getLegs, getBackground, getHeadPieces } from "scripts/crabData";
import React, { useEffect, useState } from "react";

import {
    bodyPartsData,
    habitatPartsData,
    clawsPartsData,
    shellPartsData,
    servicePartsData,
    headpiecesPartsData,
    legsPartsData,
} from "resources/cloudinary";

const buildArrayImages = (name, source) => {
    let images = [];

    for (let i = 0; i <= 23; i++) {
        let imagePart = source[name][i];
        images.push(imagePart);
    }
    return images;
};

export default function AnomuraCanvas({ anomuraData }) {
    let sources = {
        background: {},
        shell: {},
        legs: {},
        body: {},
        claws: {},
        headPieces: {},
        shadow: {},
    };

    const [imagesSrc, setImageSrc] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [isDrawHeadpieces, setIsDrawHeadpieces] = React.useState(false);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0, clientHeight: 0 });
    const [canvasContext, setCanvasContext] = React.useState(null);
    const [intervalId, setIntervalId] = React.useState(null);
    const [scale, setScale] = useState(1)

    const [isListenedToResize, setIsListenedToResize] = React.useState(false);
    const canvasRef = React.useRef(null);
    const containerRef = React.useRef(null);
    let canvas = null;
    let context = null;

    useEffect(() => {

        if (containerRef && containerRef.current) {

            setCanvasSize((prevState) => ({
                ...prevState,
                width: containerRef.current.offsetWidth > 16 ? containerRef.current.offsetWidth - containerRef.current.offsetWidth / 14 : containerRef.current.offsetHeight - 6,
                height: containerRef.current.offsetWidth > 16 ? containerRef.current.offsetWidth - containerRef.current.offsetWidth / 14 : containerRef.current.offsetHeight - 6,
            }));

        }

    }, [containerRef.current]);

    useEffect(() => {
        return () => {
            // window.removeEventListener("resize", handleResize);
            // canvasRef.current.removeEventListener("resize", handleResize);
        }
    }, [])

    const calculateCanvasWidth = () => (!containerRef.current ? 0 : containerRef.current.offsetWidth);

    // React.useEffect(() => handleResize(), []);

    const handleResize = () => {

        setScale(1)

        setCanvasSize((prevState) => ({
            ...prevState,
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetWidth,

        }));

        if (isLoaded) {

            console.log(imagesSrc)
        }
        // DrawImagesOnCanvas(imagesSrc, 1.5);

        let a = calculateCanvasWidth()
    }

    useEffect(() => {
        if (canvasRef && canvasRef.current && canvasContext && !isListenedToResize && imagesSrc) {
            // window.addEventListener("resize", handleResize);
            // containerRef.current.addEventListener("resize", handleResize);
            setIsListenedToResize(true)
        }

    }, [canvasContext, imagesSrc])

    useEffect(() => {
        // const currentCanvas = canvasRef.current;
        // currentCanvas.addEventListener("resize", handleResize);
        // return () => currentCanvas.removeEventListener("resize", handleResize);
    });

    useEffect(() => {
        if (anomuraData) {
            canvas = canvasRef.current;
            context = canvas.getContext("2d");
            setCanvasContext(context)
            // context.clearRect(0, 0, canvas.width, canvas.height);
            // if (intervalId) { clearInterval(intervalId) }

            try {
                const { background, body, claws, legs, shell, headPieces } =
                    anomuraData;

                let shouldDrawHeadpiece = false;
                if (headPieces && headPieces.toString().trim() !== "" && headPieces != "None")
                    shouldDrawHeadpiece = true;

                if (shouldDrawHeadpiece) {
                    sources.headPieces = buildArrayImages(
                        getHeadPieces(headPieces),
                        headpiecesPartsData
                    );
                }

                sources.claws = buildArrayImages(getClaws(claws), clawsPartsData);
                sources.body = buildArrayImages(getBody(body), bodyPartsData);
                sources.shell = buildArrayImages(getShell(shell), shellPartsData);
                sources.legs = buildArrayImages(getLegs(legs), legsPartsData);
                sources.shadow = buildArrayImages("shadow", servicePartsData);
                sources.background = buildArrayImages(getBackground(background), habitatPartsData);
                setIsDrawHeadpieces(shouldDrawHeadpiece)

                LoadImages(sources, shouldDrawHeadpiece).done((images) => {
                    setIsLoaded(true);
                    setImageSrc(images);
                });
            } catch (error) {
                console.log(error);
            }
        }
        return () => {
            // if (intervalId) { clearInterval(intervalId) }
            // context?.clearRect(0, 0, canvas.width, canvas.height);
        }
    }, [anomuraData]);

    useEffect(() => {
        if (isLoaded) {
            DrawImagesOnCanvas(imagesSrc, 1);
        }
    }, [imagesSrc]);

    const DrawImagesOnCanvas = (images, scale) => {

        let width = canvasSize.width * scale;
        let height = canvasSize.height * scale;
        let counter = 0;
        // canvas = canvasRef.current;
        // context = canvas.getContext("2d");
        let curContext = canvasContext


        let canvasInterval = setInterval(() => {
            if (counter == 24) {
                counter = 0;
            }

            canvasContext.drawImage(images.background[counter], 0, 0, width, height);
            canvasContext.drawImage(images.shadow[counter], 0, 0, width, height);
            canvasContext.drawImage(images.shell[counter], 0, 0, width, height);

            isDrawHeadpieces && canvasContext.drawImage(images.headPieces[counter], 0, 0, width, height);
            canvasContext.drawImage(images.legs[counter], 0, 0, width, height);
            canvasContext.drawImage(images.body[counter], 0, 0, width, height);
            canvasContext.drawImage(images.claws[counter], 0, 0, width, height);
            counter++;
        }, 150);

        setIntervalId(canvasInterval)

    };

    const LoadImages = (sources, shouldDrawHeadpiece, onFinished) => {
        let imageLoaded = 0,
            i = 0,
            numImages = 0;

        const images = {
            background: [],
            shell: [],
            legs: [],
            body: [],
            claws: [],
            headPieces: [],
            shadow: [],
        };
        var postaction = function () { };

        // 24 frames per part, we have 7 parts ~ 24 * 7 = 168
        function onFinished() {
            if (imageLoaded == 144 && shouldDrawHeadpiece === false) {
                postaction(images);
            }
            if (imageLoaded == 168) {
                postaction(images);
            }
        }
        for (var src in sources) {
            numImages++;
        }
        for (var src in sources) {
            if (src == "headPieces" && shouldDrawHeadpiece === false) {
                continue;
            }
            for (let index = 0; index <= 23; index++) {
                images[src][index] = new Image();
                images[src][index].onload = function () {
                    if (++imageLoaded >= numImages) {
                        onFinished(images);
                    }
                };
                images[src][index].src = sources[src][index];
            }
        }

        return {
            done: function (f) {
                postaction = f || postaction;
            },
        };
    };

    return (
        <div
            ref={containerRef}

        >
            <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height} />
        </div>
    );
}
