import React, { useEffect, useState } from "react";
import s from "/sass/imageviewer/imageviewer.module.css";

import { CrabViewModal } from "/containers/imageviewer/ContainerIndex";
const { backgrounds, bodies, claws, legs, shells, headpieces } = require("scripts/crabData");

// min and max included
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
/* order of layers to work: background, shadow, shells, headpieces, legs, body, claws */
export default function AnimateViewerRandomize() {
    const [crabArr, setArray] = useState([]);

    useEffect(() => {
        let test = [];
        for (var i = 0; i < 50; i++) {
            test.push(i);
        }
        setArray([...test]);
    }, []);
    return (
        <div className="flex flex-row flex-wrap">
            {crabArr?.map((d, index) => {
                return <CrabContainer key={index} />;
            })}
        </div>
    );
}

const CrabContainer = () => {
    const [crabData, setCrabData] = useState(null);
    useEffect(() => {
        if (!crabData) {
            randomize();
        }
    }, [crabData]);

    const randomize = () => {
        let background = backgrounds[randomIntFromInterval(0, backgrounds.length - 1)];
        let body = bodies[randomIntFromInterval(0, bodies.length - 1)];
        let claw = claws[randomIntFromInterval(0, claws.length - 1)];
        let leg = legs[randomIntFromInterval(0, legs.length - 1)];
        let shell = shells[randomIntFromInterval(0, shells.length - 1)];
        let headpiece = headpieces[randomIntFromInterval(0, headpieces.length - 1)];

        sources = {
            background: "/./img/imageviewer/Background/",
            shell: "/./img/imageviewer/Shell/",
            legs: "/./img/imageviewer/Legs/",
            body: "/./img/imageviewer/Body/",
            claws: "/./img/imageviewer/Claws/",
            headpieces: "/./img/imageviewer/HeadPieces/",
            shadow: "/./img/imageviewer/Services/shadow",
        };

        setCrabData({
            background,
            body,
            claw,
            leg,
            shell,
            headpiece,
        });
    };

    let sources = {
        background: "/./img/imageviewer/Background/",
        shell: "/./img/imageviewer/Shell/",
        legs: "/./img/imageviewer/Legs/",
        body: "/./img/imageviewer/Body/",
        claws: "/./img/imageviewer/Claws/",
        headpieces: "/./img/imageviewer/HeadPieces/",
        shadow: "/./img/imageviewer/Services/shadow",
    };

    if (!crabData) {
        return <div>Loading...</div>;
    } else {
        const { background, body, claw, leg, shell, headpiece } = crabData;

        sources.background = sources.background + background;
        sources.shell = sources.shell + shell;
        sources.legs = sources.legs + leg;
        sources.body = sources.body + body;
        sources.claws = sources.claws + claw;
        sources.headpieces = sources.headpieces + headpiece;

        let isDrawHeadpieces = headpieces.toString().trim() !== "";
        return (
            <div className="flex flex-column">
                <CrabCanvas
                    sources={sources}
                    data={crabData}
                    isDrawHeadpieces={isDrawHeadpieces}
                    randomize={randomize}
                />
            </div>
        );
    }
};

const CrabCanvas = ({ sources, data, isDrawHeadpieces, randomize }) => {
    const [imagesSrc, setImageSrc] = React.useState({});
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [intervalID, setInterID] = useState();
    const canvasRef = React.createRef(null);
    let canvas = null;
    let context = null;

    const handleRandomize = () => {
        clearInterval(intervalID);
        randomize();
    };

    useEffect(() => {
        canvas = canvasRef?.current;
        context = canvas?.getContext("2d");
        if (canvasRef && context && isLoaded == false) {
            LoadImages(sources).done((images) => {
                setImageSrc({ ...images });
                setIsLoaded(true);
            });
        }

        if (isLoaded == true) {
            canvas = canvasRef?.current;
            context = canvas?.getContext("2d");

            setIsLoaded(false);
            let canvasInterval = DrawImagesOnCanvas(imagesSrc, canvas, context);
            setInterID(canvasInterval);
        }
    }, [imagesSrc, data]);

    const DrawImagesOnCanvas = (images, canvas, context) => {
        let width = 508;
        let height = 508;
        let counter = 0;

        return setInterval(() => {
            if (counter == 24) counter = 0;
            context.drawImage(images.background[counter], 0, 0, width, height);
            context.drawImage(images.shadow[counter], 0, 0, width, height);
            context.drawImage(images.shell[counter], 0, 0, width, height);

            context.globalAlpha = 0.7;
            isDrawHeadpieces &&
                context.drawImage(images.headpieces[counter], 0, -35, width, height);

            context.globalAlpha = 1;

            context.drawImage(images.legs[counter], 0, 0, width, height);
            context.drawImage(images.body[counter], 0, 0, width, height);
            context.drawImage(images.claws[counter], 0, 0, width, height);

            counter++;
        }, 100);
    };

    const LoadImages = (sources, onFinished) => {
        let imageLoaded = 0,
            i = 0,
            numImages = 0;

        const images = {
            background: [],
            shell: [],
            legs: [],
            body: [],
            claws: [],
            headpieces: [],
            shadow: [],
        };
        var postaction = function () { };

        // 24 frames per part, we have 7 parts ~ 24 * 7 = 168
        function onFinished() {
            if (imageLoaded == 144 && isDrawHeadpieces === false) {
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
            if (src == "headpieces" && isDrawHeadpieces === false) {

                continue;
            }
            for (let index = 0; index <= 23; index++) {
                images[src][index] = new Image();
                images[src][index].onload = function () {
                    if (++imageLoaded >= numImages) {
                        onFinished(images);
                    }
                };
                let counter = index + 1;
                images[src][index].src = sources[src] + "_" + counter + ".png";
            }
        }

        return {
            done: function (f) {
                postaction = f || postaction;
            },
        };
    };

    return (
        <>
            <div className={s.container}>
                <canvas ref={canvasRef} width="508" height="500" />
                {/* <img
				onClick={() => setModalOpen(!modalOpen)}
				className={s.toggleModal}
				src="/img/imageviewer/Others/OpenSea Invetory_icons_05.png"
			/> */}
                {modalOpen && <CrabViewModal data={data} setModalOpen={setModalOpen} />}
                <style>
                    {`
                        body {
                            font-family: Atlantis;
                            font-size:36px;
                            color:white;
                        }`}
                </style>

                {/* <div className="flex space-x-2 justify-center mt-4">
					<button
						className="inline-block px-6 py-2.5 bg-blue-600"
						onClick={() => handleRandomize()}
					>
						Refresh
					</button>
				</div> */}
            </div>
        </>
    );
};
