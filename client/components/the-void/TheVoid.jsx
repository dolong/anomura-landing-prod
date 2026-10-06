import React, { useEffect, useState } from "react";
import s from "/sass/the-void/index.module.css";
import useTheVoidSound from "lib/useTheVoidSound";
import useDeviceDetect from "lib/useDeviceDetect";
import { sequences } from "@resources/the-void/sequences-deepsea";
// import "nes.css/css/nes.min.css";

/* 
PHASE 1: playing black screen for 16 seconds, 
draw sequence 1, seq: 199 OK, 00:00 => 00:16

PHASE 2: playing  until eye closes,
draw sequence 2: seq 200 - 498, video 00:17 - 00:39

PHASE 3: playing the camera moving up () sq 498 - 565, this is when we fade in buttons
Draw sequence 3: seq 498 - 565, video 00:40 - 00:47

PHASE 4: fade in rainbow, fade in buttons, blinking 1st button

PHASE 5: playing the pillar moving up, then blinking button 2
Draw sequence 4: seq 566 - 641 => video 00:47 =>  00:49 

PHASE 6: playing the pillar with light on right side, then blinking button 3 
Draw sequence 5: seq 642 - 747 ~ video 00:53 => 01:01

PHASE 7: playing the pillar with beam repeatedly  
draw sequence 6: seq 748 - 811 ~ video 01:01 => 01:07

PHASE 8: playing the pillar with bowl with anomura appear 
Draw sequence 7: seq 812 - 943 ~ video 01:08 until the end

PHASE 9: 
*/
const INITIAL = 0;
const PHASE_1 = 1;
const PHASE_2 = 2;
const PHASE_3 = 3;
const PHASE_4 = 4;
const PHASE_5 = 5;
const PHASE_6 = 6;
const PHASE_7 = 7;
const PHASE_8 = 8;
const SKIP_CLICK = 9;
const ENTER_THE_VOID = 11;

const PreloadImagesBetweenIndex = (start, end) => {
    let imageLoaded = 0,
        numberOfImages = end - start + 1;

    const imageDict = {};
    var postaction = function () {};

    function onFinished() {
        if (imageLoaded == numberOfImages) {
            postaction(imageDict);
        }
    }

    for (let index = start; index <= end; index++) {
        imageDict[index] = new Image();
        imageDict[index].onload = function () {
            if (++imageLoaded >= numberOfImages) {
                onFinished(imageDict);
            }
        };
        imageDict[index].onerror = function () {
            console.log("error loading image " + imageDict[index].src);
        };

        let numberOfChars = index.toString().length;

        let prefix;
        if (numberOfChars === 1) {
            prefix = `mint000` + index;
        }
        if (numberOfChars === 2) {
            prefix = `mint00` + index;
        }
        if (numberOfChars === 3) {
            prefix = `mint0` + index;
        }
        if (numberOfChars === 4) {
            prefix = `mint` + index;
        }

        // let imageIndex = sequences.findIndex((sq) => sq.indexOf(`${index.toString()}.png`) != -1);
        let imageIndex = sequences.findIndex((sq) => sq.indexOf(`${prefix}.png`) != -1);
        imageDict[index].src = sequences[imageIndex];
        // console.log(imageDict[index].src);
    }

    return {
        done: function (f) {
            postaction = f || postaction;
        },
    };
};

export default function TheVoid() {
    return (
        <div className="flex flex-row flex-wrap">
            <SequenceCanvas />
        </div>
    );
}

const SequenceCanvas = () => {
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0, clientHeight: 0 });
    const [imagesSrc, setImageSrc] = React.useState({});
    const [isImageLoaded, setIsImageLoaded] = React.useState(false);
    const [currentState, setCurrentState] = React.useState(INITIAL);
    const [intervalID, setIntervalID] = useState();
    const [mobileMargin, setMobileMargin] = useState(0);
    const [showSocial, setShowSocial] = useState(false);
    const [showCaption, setShowCaption] = useState(true);
    const canvasRef = React.createRef(null);

    let canvas = null;
    let context = null;
    const [audioControl, isAudioLoaded] = useTheVoidSound();
    const { isMobile } = useDeviceDetect();

    const [canvasContext, setCanvasContext] = React.useState(null);
    useEffect(() => {
        try {
            if (typeof window !== "undefined" && isMobile != null) {
                if (isMobile) {
                    setCanvasSize((prevState) => ({
                        ...prevState,
                        width: (window?.innerHeight * 2560) / 1440,
                        height: window?.innerHeight,
                        clientHeight: window?.clientHeight,
                    }));

                    let calculateMargin =
                        (window?.innerHeight * (2560 / 1440) - window?.innerWidth) / 2;
                    // window?.innerWidth / 2;
                    setMobileMargin(calculateMargin);
                } else {
                    setCanvasSize((prevState) => ({
                        ...prevState,
                        // width: window?.innerWidth, // this keep image looks good
                        // height: window?.innerWidth * (1440 / 2560),
                        width: window?.innerWidth, // this keep image width same as view port
                        height: window?.innerHeight,
                        clientHeight: window?.clientHeight,
                    }));
                }
            }
        } catch (error) {
            console.log(error);
        }
    }, [isMobile]);

    useEffect(() => {
        try {
            canvas = canvasRef?.current;
            context = canvas?.getContext("2d");
            setCanvasContext(context);

            if (currentState === ENTER_THE_VOID) {
                PreloadImages();
            }
            if (currentState === PHASE_1) {
                if (isMobile) {
                    let timeOutStart = setTimeout(() => {
                        audioControl.bgm1.play(0.5);
                        audioControl.voice1.play(0.5);
                        audioControl.bgm3.stop();
                        clearTimeout(timeOutStart);
                    }, 1000);
                } else {
                    audioControl.bgm1.play(0.5);
                    audioControl.voice1.play(0.5);
                    audioControl.bgm3.stop();
                }

                DrawSequence1(context);
            }
            if (currentState === PHASE_2) {
                DrawSequence2(context);
            }
            if (currentState === PHASE_3) {
                DrawSequence3(context);
            }
            if (currentState === PHASE_5) {
                DrawSequence4(context);
            }
            if (currentState === PHASE_6) {
                clearInterval(intervalID);
                let sequenceInterval = DrawSequence5(context);
                setIntervalID(sequenceInterval);
            }
            if (currentState === PHASE_7) {
                audioControl.runesLightUp.stop();
                clearInterval(intervalID);
                let sequenceInterval = DrawSequence6(context);
                setIntervalID(sequenceInterval);
            }
            if (currentState === PHASE_8) {
                audioControl.lightBeam.stop();
                clearInterval(intervalID);
                DrawSequence7(context, setShowSocial);
            }
            if (currentState === SKIP_CLICK) {
                clearInterval(intervalID);
                DrawSequenceLast(context);
                setShowSocial(true);
            }
        } catch (error) {
            console.log(error);
        }
    }, [currentState]);

    useEffect(() => {
        if (isImageLoaded) {
            setCurrentState(PHASE_1);
        }
    }, [isImageLoaded]);

    const DrawSequence1 = (context) => {
        let start = 0;
        let end = 190;

        let interval = setInterval(() => {
            if (start === end) {
                setCurrentState(PHASE_2);
                clearInterval(interval);
                return;
            }
            context.drawImage(imagesSrc[start], 0, 0, canvasSize.width, canvasSize.height);
            start++;
        }, 83);
        setIntervalID(interval);
    };
    const DrawSequence2 = (context) => {
        let start = 191;
        let end = 485;

        let interval = setInterval(() => {
            if (start === end) {
                setCurrentState(PHASE_3);
                clearInterval(interval);
                return;
            }
            context.drawImage(imagesSrc[start], 0, 0, canvasSize.width, canvasSize.height);
            start++;
        }, 77);

        setIntervalID(interval);
    };
    const DrawSequence3 = (context) => {
        let start = 1500;
        let end = 1584;

        // big eye close, plays until before pillar appear
        let interval = setInterval(() => {
            if (start === end) {
                clearInterval(interval);
                return;
            }
            context.drawImage(imagesSrc[start], 0, 0, canvasSize.width, canvasSize.height);
            start++;
        }, 42);

        setIntervalID(interval);
    };
    const DrawSequence4 = (context) => {
        let start = 567;
        let end = 634;
        // plays pillar moving up
        audioControl.pillarUp.play(0.05);

        let interval = setInterval(() => {
            // 591 -> 640 is same, so we allow to click from 591 is fine
            // if (start === 591) {
            if (start === end) {
                clearInterval(interval);
                return;
            }

            context.drawImage(imagesSrc[start], 0, 0, canvasSize.width, canvasSize.height);

            start++;
        }, 83);
        setIntervalID(interval);
    };
    const DrawSequence5 = (context) => {
        let start = 635;
        let end = 746;

        // plays pillar light runes
        audioControl.runesLightUp.play(0.05);
        return setInterval(() => {
            if (start === end) {
                start = 641;
            }
            context.drawImage(imagesSrc[start], 0, 0, canvasSize.width, canvasSize.height);
            start++;
        }, 83);
    };
    const DrawSequence6 = (context) => {
        let start = 747;
        let end = 810;

        // plays pillar beam
        audioControl.lightBeam.play(0.05);

        return setInterval(() => {
            if (start === end) {
                start = 748;
            }
            context.drawImage(imagesSrc[start], 0, 0, canvasSize.width, canvasSize.height);
            start++;
        }, 83);
    };
    const DrawSequence7 = (context) => {
        let start = 811;
        let end = 1199;

        // plays anomura appears until the end
        audioControl.anomuraAppears.play(0.15);

        let interval = setInterval(() => {
            if (start === end) {
                clearInterval(interval);
                return;
            }
            if (start === 1023) {
                setShowSocial(true);
            }
            context.drawImage(imagesSrc[start], 0, 0, canvasSize.width, canvasSize.height);
            start++;
        }, 83);
    };
    const DrawSequenceLast = (context) => {
        let start = 1182;
        let end = 1183;

        let interval = setInterval(() => {
            if (start === end) {
                start = 1182;
                // clearInterval(interval);
                // return;
            }
            context.drawImage(imagesSrc[start], 0, 0, canvasSize.width, canvasSize.height);
            start++;
        }, 83);
    };
    const PreloadImages = () => {
        const start = Date.now();
        console.log("trying to load image");
        PreloadImagesBetweenIndex(0, 485).done((imageDict1) => {
            PreloadImagesBetweenIndex(1500, 1584).done((images) => {
                // let allImages = Object.assign(appendImageDict, images);
                let allImages = Object.assign(imageDict1, images);
                setImageSrc({ ...allImages });
                setIsImageLoaded(true);
            });
            PreloadImagesBetweenIndex(531, 1259).done((images) => {
                // let allImages = Object.assign(appendImageDict, images);
                let allImages = Object.assign(imageDict1, images);
                setImageSrc({ ...allImages });

                const end = Date.now();
                console.log(`Execution time: ${end - start} ms`);
            });
        });
    };

    const handleOnSkip = () => {
        audioControl.bgm1.stop();
        audioControl.bgm2.stop();
        audioControl.bgm3.stop();
        audioControl.button1A.stop();
        audioControl.voice1.stop();
        audioControl.voice2.stop();
        audioControl.voice3.stop();
        audioControl.voice4.stop();

        audioControl.runesLightUp.stop();
        audioControl.lightBeam.stop();
        audioControl.anomuraAppears.stop();
        setShowCaption(false);
        setCurrentState(SKIP_CLICK);
    };

    return (
        <div className={s.sequence_container}>
            <figure className={s.sequence_wrapper}>
                <canvas
                    ref={canvasRef}
                    width={canvasSize.width || 0}
                    // width={"1830px"}
                    height={canvasSize.height || 0}
                    style={{ marginLeft: -mobileMargin, minHeight: "100%" }}
                />

                {showCaption && <Caption currentState={currentState} canvasSize={canvasSize} />}

                {currentState !== INITIAL && (
                    <CallToActions
                        currentState={currentState}
                        canvasSize={canvasSize}
                        audioControl={audioControl}
                        setCurrentState={setCurrentState}
                    />
                )}
            </figure>
            {isImageLoaded === false && currentState === ENTER_THE_VOID && (
                <div className="absolute grid h-screen place-items-center w-screen">
                    <label
                        className="inline-block px-6 py-2.5 text-white text-5xl font-bold"
                        style={{ fontFamily: "PFRondaSeven" }}
                    >
                        Loading...
                    </label>
                </div>
            )}
            {showSocial && (
                <div className="absolute grid h-screen place-items-center w-screen">
                    <div className={`${s.sequence_social} ${s.fadeInSocial}`}>
                        <button
                            className={s.button_green}
                            onClick={() => {
                                window.open(`https://opensea.io/collection/mystery-bowl`, "_blank");
                            }}
                        >
                            <img src={`/img/the-void/board/Button_L_Green.png`} alt="OPENSEA" />
                            <div>
                                <span>OPENSEA</span>
                            </div>
                        </button>
                        <button
                            className={s.button_purple}
                            onClick={() => {
                                window.open(`https://discord.com/invite/anomuragame`, "_blank");
                            }}
                        >
                            <img src={`/img/the-void/board/Button_L_Purple.png`} alt="DISCORD" />
                            <div>
                                <span>DISCORD</span>
                            </div>
                        </button>
                        <button
                            className={s.button_blue}
                            onClick={() => {
                                window.open(`https://twitter.com/AnomuraGame`, "_blank");
                            }}
                        >
                            <img src={`/img/the-void/board/Button_L_Blue.png`} alt="TWITTER" />
                            <div>
                                <span>TWITTER</span>
                            </div>
                        </button>
                    </div>
                </div>
            )}
            {currentState === INITIAL && isAudioLoaded && (
                <StartScreen
                    start={() => {
                        if (currentState === INITIAL) {
                            // setCurrentState(PHASE_1);
                            setCurrentState(ENTER_THE_VOID);
                            // setCurrentState(PHASE_8);
                        }
                    }}
                    skip={() => {
                        window.open(`https://anomuragame.com`, "_blank");
                    }}
                />
            )}
            {currentState !== INITIAL && currentState !== SKIP_CLICK && (
                <div className="absolute grid h-screen place-items-center w-screen">
                    <button className={`${s.initial_skip} `} onClick={handleOnSkip}>
                        Skip
                    </button>
                </div>
            )}
        </div>
    );
};

const StartScreen = ({ start, skip }) => {
    const [fadeOut, setFadeOut] = useState(false);
    const handleOnStart = () => {
        setFadeOut(true);
        let startTimeOut = setTimeout(() => {
            start();
            clearTimeout(startTimeOut);
        }, 2000);
    };

    return (
        <div className="absolute grid h-screen place-items-center w-screen">
            <button
                className={`${s.initial_start} ${fadeOut ? s.initial_start_fadeOut : ""}`}
                onClick={() => handleOnStart()}
            >
                <img src={`/img/the-void/Button_Enter the void_Hover.png`} alt="Enter The Void" />
                <img src={`/img/the-void/Button_Enter the void.png`} alt="Enter The Void" />
            </button>
            <button
                className={`${s.initial_skip} ${fadeOut ? s.initial_skip_fadeOut : ""}`}
                onClick={skip}
            >
                BACK TO HOME
            </button>
        </div>
    );
};
const CallToActions = ({ currentState, canvasSize, audioControl, setCurrentState }) => {
    const button1Ref = React.createRef(null);
    const button2Ref = React.createRef(null);
    const button3Ref = React.createRef(null);
    const button4Ref = React.createRef(null);
    const [showRainbow, setShownRainbow] = React.useState(false);
    const [showButton, setShownButton] = React.useState(false);
    const [isClickable, setIsClickable] = React.useState(true);

    const handleButtonClick = async () => {
        if (!isClickable) {
            return;
        }
        if (currentState === PHASE_4 && isClickable) {
            setIsClickable(false);

            audioControl.button1A.stop();
            audioControl.button1B.play(0.35);
            audioControl.voice1.stop();
            audioControl.voice2.play(0.5);

            button1Ref.current.src = `/img/the-void/button1_03_4x.gif`;

            let btn1Cur = button1Ref.current;
            let btn2Cur = button2Ref.current;

            let button1bTimeout = setTimeout(() => {
                btn1Cur.src = `/img/the-void/button1_04_4x.gif`;
                setCurrentState(PHASE_5);
                clearTimeout(button1bTimeout);
            }, 300);

            let button2aTimeout = setTimeout(() => {
                btn2Cur.src = `/img/the-void/button2_01_4x.gif`;
                clearTimeout(button2aTimeout);
            }, 2000);

            let button2bTimeout = setTimeout(() => {
                audioControl.button1A.play(0.35);
                btn2Cur.src = `/img/the-void/button2_02_4x.gif`;
                clearTimeout(button2bTimeout);
            }, 5500);

            let interactableTimeout = setTimeout(() => {
                setIsClickable(true);
                clearTimeout(interactableTimeout);
            }, 6000);
        }
        // playing button2 puff, then go to button 3
        if (currentState === PHASE_5 && isClickable) {
            setIsClickable(false);

            audioControl.button1A.stop();
            audioControl.button1B.play(0.35);
            audioControl.voice2.stop();
            audioControl.voice3.play(0.5);

            button2Ref.current.src = `/img/the-void/button2_03_4x.gif`;
            let btn2Cur = button2Ref.current;
            let btn3Cur = button3Ref.current;

            let button2bTimeout = setTimeout(() => {
                setCurrentState(PHASE_6);
                btn2Cur.src = `/img/the-void/button2_04_4x.gif`;
                clearTimeout(button2bTimeout);
            }, 300);

            let button3aTimeout = setTimeout(() => {
                btn3Cur.src = `/img/the-void/button3_01_4x.gif`;
                clearTimeout(button3aTimeout);
            }, 2000);

            let button3bTimeout = setTimeout(() => {
                audioControl.button1A.play(0.35);
                btn3Cur.src = `/img/the-void/button3_02_4x.gif`;
                clearTimeout(button3bTimeout);
            }, 7500);

            let interactableTimeout = setTimeout(() => {
                setIsClickable(true);
                clearTimeout(interactableTimeout);
            }, 8000);
        }

        // playing button3 puff, then go to button 4
        if (currentState === PHASE_6 && isClickable) {
            setIsClickable(false);

            // transition from bgm4 to bgm5, voice3 => voice4 OK
            audioControl.button1A.stop();
            audioControl.button1B.play(0.35);
            audioControl.voice3.stop();
            audioControl.voice4.play(0.5);

            button3Ref.current.src = `/img/the-void/button3_03_4x.gif`;
            let btn3Cur = button3Ref.current;
            let btn4Cur = button4Ref.current;

            let button3bTimeout = setTimeout(() => {
                btn3Cur.src = `/img/the-void/button3_04_4x.gif`;
                setCurrentState(PHASE_7);
                clearTimeout(button3bTimeout);
            }, 400);

            let button4aTimeout = setTimeout(() => {
                btn4Cur.src = `/img/the-void/button4_01_4x.gif`;
                clearTimeout(button4aTimeout);
            }, 3000);

            let button4bTimeout = setTimeout(() => {
                audioControl.button1A.play(0.35);
                btn4Cur.src = `/img/the-void/button4_02_4x.gif`;
                clearTimeout(button4bTimeout);
            }, 6000);

            let interactableTimeout = setTimeout(() => {
                setIsClickable(true);
                clearTimeout(interactableTimeout);
            }, 6500);
        }

        if (currentState === PHASE_7 && isClickable) {
            setIsClickable(false);

            // transition from bgm5 to bgm6, voice4 => voice5 OK
            audioControl.button1A.stop();
            audioControl.button1B.play(0.35);
            audioControl.voice4.stop();
            audioControl.bgm2.stop();
            audioControl.bgm3.play(0.35);
            // audioControl.voice5.play(0.5);

            button4Ref.current.src = `/img/the-void/button4_03_4x.gif`;
            let btn4Cur = button4Ref.current;
            let buttonTimeout = setTimeout(() => {
                btn4Cur.src = `/img/the-void/button4_04_4x.gif`;

                setIsClickable(false);
                setCurrentState(PHASE_8); // to not trigger this again
                setShownRainbow(false);
                setShownButton(false);
                clearTimeout(buttonTimeout);
            }, 750);
        }
    };

    useEffect(() => {
        if (currentState === PHASE_3) {
            // transition from bgm1 to bgm2, play OK
            audioControl.bgm2.playRepeat(0.5);
            let btn1Cur = button1Ref.current;

            // timeout to start showing button 1
            let rainbowTimeOut = setTimeout(() => {
                setShownRainbow(true);
                setShownButton(true);

                let button1ATimeout = setTimeout(() => {
                    btn1Cur.src = `/img/the-void/button1_01_4x.gif`;

                    clearTimeout(button1ATimeout);
                }, 4000);

                let button1BTimeout = setTimeout(() => {
                    audioControl.button1A.play(0.35);
                    btn1Cur.src = `/img/the-void/button1_02_4x.gif`;
                    setCurrentState(PHASE_4);
                    clearTimeout(button1BTimeout);
                }, 6000);
                clearTimeout(rainbowTimeOut);
            }, 3500);
        }
    }, [currentState]);

    return (
        <div
            className={s.sequence_cta}
            style={{
                bottom: canvasSize.height / 6.5,
            }}
        >
            <div className={s.sequence_cta_content}>
                <div className={`${s.sequence_cta_content_rainbow_wrapper} `}>
                    {showRainbow && (
                        <img
                            src={`/img/the-void/rainbow_4x.gif`}
                            alt="rainbow"
                            className={` ${s.fadeInRainbow}`}
                        />
                    )}
                </div>

                <div
                    className={`${s.sequence_cta_content_buttons_wrapper} `}
                    onClick={handleButtonClick}
                >
                    <div className={`${showButton ? s.fadeInBtn1 : s.zeroOpacity}`}>
                        <img src={`/img/the-void/button1_01_4x.png`} alt="btn1" ref={button1Ref} />
                    </div>

                    <div className={`${showButton ? s.fadeInBtn2 : s.zeroOpacity}`}>
                        <img src={`/img/the-void/button2_01_4x.png`} alt="btn2" ref={button2Ref} />
                    </div>
                    <div className={`${showButton ? s.fadeInBtn3 : s.zeroOpacity}`}>
                        <img src={`/img/the-void/button3_01_4x.png`} alt="btn3" ref={button3Ref} />
                    </div>
                    <div className={`${showButton ? s.fadeInBtn4 : s.zeroOpacity}`}>
                        <img src={`/img/the-void/button4_01_4x.png`} alt="btn4" ref={button4Ref} />
                    </div>
                </div>
            </div>
        </div>
    );
};
const Caption = ({ currentState, canvasSize }) => {
    const firstCaptions = [
        { text: "The Void", start: 1500, timeout: 2800 },
        { text: "An endless infinity of nothingness", start: 4500, timeout: 2800 },
        { text: "Nothing is and will forever be", start: 7500, timeout: 2800 },
        { text: "Is this home?", start: 13500, timeout: 3500 },
        { text: "From a dreamless sleep a voice is calling out?", start: 20000, timeout: 3800 },
        { text: "May it be", start: 24500, timeout: 5000 },
        { text: "What are you? Why do you call out?", start: 30000, timeout: 4000 }, //
        { text: "Are you many? Or just one?", start: 34500, timeout: 5500 },
    ];

    const lastCaptions = [
        { text: "Nothing is all I’ve ever known", start: 4000, timeout: 3800 },
        { text: "But now, here I am", start: 8000, timeout: 4200 },
        { text: "Anomura! It’s time to explore", start: 18000, timeout: 4200 },
    ];

    let secondCaption = "A slow awakening from the haze of obscurity";
    let thirdCaption = "These sensations, these needs, are they unnecessary?";
    let fourthCaption = "New ideas…new actions, new thoughts… It’s so much all at once!";

    const [currentCaption, setCaption] = React.useState("");
    const [isShowCaption, setShowCaption] = React.useState(false);
    const [timeoutCaption, setTimeOutCaption] = useState();

    useEffect(() => {
        if (currentState === PHASE_1) {
            let second = 0;
            let captionTimeout = setInterval(() => {
                if (second == 47000) {
                    // should stop around button interaction level
                    clearInterval(captionTimeout);
                    return;
                }
                let foundCaption = firstCaptions.find((c) => c.start === second);
                if (foundCaption) {
                    setShowCaption(true);
                    setCaption(foundCaption.text);
                    clearTimeout(timeoutCaption);
                    let timeout = setTimeout(() => {
                        setShowCaption(false);
                    }, foundCaption.timeout);

                    setTimeOutCaption(timeout);
                }
                second = second + 100;
            }, 100);
        }

        if (currentState === PHASE_5) {
            let captionTimeout = setTimeout(() => {
                setShowCaption(true);
                setCaption(secondCaption);
                clearTimeout(captionTimeout);
            }, 1000);

            clearTimeout(timeoutCaption);
            let timeout = setTimeout(() => {
                setShowCaption(false);
            }, 5200);

            setTimeOutCaption(timeout);
        }
        if (currentState === PHASE_6) {
            let captionTimeout = setTimeout(() => {
                setShowCaption(true);
                setCaption(thirdCaption);
                clearTimeout(captionTimeout);
            }, 3000);

            clearTimeout(timeoutCaption);
            let timeout = setTimeout(() => {
                setShowCaption(false);
            }, 7000);

            setTimeOutCaption(timeout);
        }
        if (currentState === PHASE_7) {
            let captionTimeout = setTimeout(() => {
                setShowCaption(true);
                setCaption(fourthCaption);
                clearTimeout(captionTimeout);
            }, 1000);

            clearTimeout(timeoutCaption);
            let timeout = setTimeout(() => {
                setShowCaption(false);
            }, 5200);

            setTimeOutCaption(timeout);
        }
        if (currentState === PHASE_8) {
            let second = 0;
            let captionTimeout = setInterval(() => {
                if (second == 25000) {
                    // should stop around button interaction level
                    clearInterval(captionTimeout);
                    return;
                }
                let foundCaption = lastCaptions.find((c) => c.start === second);
                if (foundCaption) {
                    setShowCaption(true);
                    setCaption(foundCaption.text);
                    clearTimeout(timeoutCaption);
                    let timeout = setTimeout(() => {
                        setShowCaption(false);
                    }, foundCaption.timeout);

                    setTimeOutCaption(timeout);
                }
                second = second + 100;
            }, 100);
        }

        // if (currentState === SKIP_CLICK) {
        //     clearInterval(timeoutCaption);
        // }

        return () => {
            setShowCaption(false);
            clearInterval(timeoutCaption);
        };
    }, [currentState]);
    return (
        <div
            className={s.sequence_caption}
            style={
                {
                    // bottom: canvasSize.height / 20,
                    // bottom: "2rem",
                }
            }
        >
            <div
                className={`${s.sequence_caption_content} ${
                    isShowCaption ? s.sequence_caption_show : s.sequence_caption_hide
                } `}
            >
                {currentCaption}
            </div>
        </div>
    );
};
