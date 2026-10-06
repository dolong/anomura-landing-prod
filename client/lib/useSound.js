import { useEffect, useState } from "react";
import { BufferLoader } from "utils/buffer-loader";

export default function useSound() {
    let bufferLoader, audioContext;

    const [audioControl, setAudioControl] = useState({
        isSoundOn: false,
        audioContext: null,
        bufferList: null,
        audioMaps: {},
        bgMusic: {
            isPlaying: false,
        },
        chestOpen: {},
        fishPass: {},
    });
    const [isAudioLoaded, setAudioLoaded] = useState(false);
    const [timeOutFishSound, setTimeOutFishSound] = useState(null)
    const [intervalFishSound, setIntervalFishSound] = useState(null)

    let timeout, interval;

    useEffect(() => {
        return (() => {
            clearTimeout(timeOutFishSound)
            clearInterval(intervalFishSound);
        })
    }, [])

    useEffect(() => {
        if (!isAudioLoaded) {
            console.log("Loading audio...")
            LoadAudios();
        }
    }, [isAudioLoaded]);

    function LoadAudios() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();
        bufferLoader = new BufferLoader(
            audioContext,
            [
                "/audio/Underwater DEEP Fixed.mp3",
                "/audio/Chest Open.mp3",
                "/audio/Fish Pass by 1.mp3",
                "/audio/chest chime.mp3",
                "/audio/Constant Bubble Loop.mp3",
            ],
            onFinishedLoadingAudioSource
        );

        bufferLoader.load();
    }

    const turnSound = (flag) => {
        if (flag) {
            setAudioControl((prevState) => ({
                ...prevState,
                isSoundOn: true,
            }));
            audioControl.setSound(true)
        } else {
            setAudioControl((prevState) => ({
                ...prevState,
                isSoundOn: false,
            }));
            audioControl.setSound(false)
        }
    }

    const onFinishedLoadingAudioSource = (bufferList) => {
        setAudioControl((prevState) => ({
            ...prevState,
            setSound: function (val) {
                if (val === false) {
                    this.bgMusic.setVolume(0);
                    this.fishPass.setVolume(0);
                } else {
                    this.bgMusic.playSound(0.5);
                    timeout = setTimeout(() => {
                        this.fishPass.playSound(0);
                        interval = setInterval(() => {
                            this.fishPass.playSound(0);
                        }, 4600);
                    }, 2000);
                    setTimeOutFishSound(timeout)
                    setIntervalFishSound(interval)

                }
            },
            bufferList,
            bgMusic: {
                source: audioContext.createBufferSource(),
                gainNode: audioContext.createGain(),
                playSound: function () {
                    this.source = audioContext.createBufferSource();
                    if (this.gainNode == null) {
                        this.gainNode = audioContext.createGain(); // to not reset the volume next time we play
                    }

                    this.source.buffer = bufferList[0];
                    this.source.connect(this.gainNode).connect(audioContext.destination);
                    this.source.loop = true;
                    this.source.start(0);
                    this.gainNode.gain.value = 0.5;
                    this.isPlaying = true;
                },

                setVolume: function (val) {
                    if (val === 0) {
                        let counter = 0;
                        let interval = setInterval(() => {
                            this.gainNode.gain.value = this.gainNode.gain.value - 0.1;
                            counter++;
                            if (counter == 5) {
                                clearInterval(interval);
                            }
                        }, 100);
                        return;
                    } else if (val === 1) {
                        let counter = 0;
                        let interval = setInterval(() => {
                            this.gainNode.gain.value = this.gainNode.gain.value + 0.1;
                            counter++;
                            if (counter == 5) {
                                clearInterval(interval);
                            }
                        }, 100);
                    }
                },
                stop: function () {
                    if (this.source && this.isPlaying) {
                        this.source.stop();
                    }
                    this.isPlaying = false;
                },
            },
            chestOpen: {
                source: null,
                gainNode: null,
                playSound: function (volumeVal = 0) {
                    this.source = audioContext.createBufferSource();
                    this.source.buffer = bufferList[1];
                    this.gainNode = audioContext.createGain();
                    this.gainNode.gain.value = volumeVal;
                    this.source.connect(this.gainNode).connect(audioContext.destination);
                    this.source.start(0);
                },
            },
            fishPass: {
                sourceF: null,
                gainNodeF: null,
                playSound: function (volumeVal = 0) {
                    this.sourceF = audioContext.createBufferSource();
                    if (this.gainNodeF == null) {
                        this.gainNodeF = audioContext.createGain(); // to not reset the volume next time we play
                        this.gainNodeF.gain.value = volumeVal;
                    }
                    this.sourceF.buffer = bufferList[2];
                    this.sourceF.connect(this.gainNodeF).connect(audioContext.destination);
                    this.sourceF.start(0);
                },
                setVolume: function (val) {
                    if (this.gainNodeF) {
                        if (this.sourceF && this.gainNodeF) {
                            this.gainNodeF.gain.value = val;
                        }
                    }
                },
            },
            chestChime: {
                source: null,
                gainNode: null,
                shouldPlay: true,
                playSound: function () {
                    if (!this.shouldPlay) {
                        return;
                    }
                    this.source = audioContext.createBufferSource();
                    if (this.gainNode == null) {
                        // to not reset the volume next time we play
                        this.gainNode = audioContext.createGain();
                    }
                    this.source.buffer = bufferList[3];
                    this.source.connect(this.gainNode).connect(audioContext.destination);
                    this.source.loop = true;
                    this.gainNode.gain.value = 0; // initially should not play too loud
                    this.source.start(0);
                },
                stop: function () {
                    this.shouldPlay = false;
                    if (this.source) {
                        this.source.stop();
                    }
                },
                setVolume: function (val) {
                    if (this.source && this.gainNode) {
                        this.gainNode.gain.value = val;
                    }
                },
            },
            bubble: {
                sourceB: null,
                gainNodeB: null,
                playSound: function () {
                    this.sourceB = audioContext.createBufferSource();
                    if (this.gainNodeB == null) {
                        this.gainNodeB = audioContext.createGain();
                    }
                    this.sourceB.buffer = bufferList[4];
                    this.sourceB.connect(this.gainNodeB).connect(audioContext.destination);
                    this.sourceB.loop = true;
                    this.gainNodeB.gain.value = 0;
                    this.sourceB.start(0);
                },
                setVolume: function (val) {
                    if (!audioControl.isSoundOn && this.gainNodeB) {
                        this.gainNodeB.gain.value = 0;
                        return;
                    }
                    if (this.sourceB && this.gainNodeB) {
                        this.gainNodeB.gain.value = val;
                    }
                },
            },
        }));

        setAudioLoaded(true);

    };

    return [audioControl, isAudioLoaded, turnSound];
}