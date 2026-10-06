import { useEffect, useState } from "react";
import { BufferLoader } from "utils/buffer-loader";

export default function useTheVoidSound() {
  let bufferLoader, audioContext;

  const [audioControl, setAudioControl] = useState({
    isSoundOn: true,
    audioContext: null,
    bufferList: null
  });
  const [isAudioLoaded, setAudioLoaded] = useState(false);


  useEffect(() => {
    if (!isAudioLoaded) {

      LoadAudios();
    }
    else {
      document.addEventListener("click", handlePlayTest)
      audioControl?.bgm3.play(0.000001)
    }

    return (() => {

    })

  }, [isAudioLoaded]);

  const LoadAudios = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContext();
    bufferLoader = new BufferLoader(
      audioContext,
      [
        "/audio/the-void/button01a_compress.mp3",
        "/audio/the-void/button01b_compress.mp3",
        "/audio/the-void/light-beam_compress.mp3",
        "/audio/the-void/pillar-up_compress.mp3",
        "/audio/the-void/runes-light-up_compress.mp3",
        "/audio/the-void/anomura-appears_compress.mp3",
        "/audio/the-void/voice-1.mp3",
        "/audio/the-void/voice-2.mp3",
        "/audio/the-void/voice-3.mp3",
        "/audio/the-void/voice-4.mp3",
        "/audio/the-void/voice-5.mp3",
        "/audio/the-void/bgm-1.mp3",
        "/audio/the-void/bgm-2.mp3",
        // "/audio/the-void/bgm-3.mp3",
        "/audio/the-void/bgm-3-new.mp3",
      ],
      onFinishedLoadingAudioSource
    );

    bufferLoader.load();
  };
  const handlePlayTest = () => {
    document.removeEventListener("click", handlePlayTest);
    audioControl?.bgm3?.play(0.000001)
  }

  const onFinishedLoadingAudioSource = (bufferList) => {

    setAudioControl((prevState) => ({
      ...prevState,
      setSound: function (val) {
        if (val === false) {
          this.bgm1.setVolume(0);
        } else {
          // this.background.play(0.5);
        }
      },

      bufferList,
      voice1: {
        source: null,
        gainNode: null,
        play: function (volumeVal = 1) {
          this.source = audioContext.createBufferSource();
          this.source.buffer = bufferList[6];
          this.gainNode = audioContext.createGain();

          if (!audioControl.isSoundOn) {
            this.gainNode.gain.value = 0;
          } else {
            this.gainNode.gain.value = volumeVal;
          }

          this.source.connect(this.gainNode).connect(audioContext.destination);
          this.source.start(0);
        },
        stop: function () {
          if (this.source) {
            this.source.stop();
          }
        },
      },
      voice2: {
        source: null,
        gainNode: null,
        play: function (volumeVal = 1) {
          this.source = audioContext.createBufferSource();
          this.source.buffer = bufferList[7];
          this.gainNode = audioContext.createGain();

          if (!audioControl.isSoundOn) {
            this.gainNode.gain.value = 0;
          } else {
            this.gainNode.gain.value = volumeVal;
          }

          this.source.connect(this.gainNode).connect(audioContext.destination);
          this.source.start(0);
        },
        stop: function () {
          if (this.source) {
            this.source.stop();
          }
        },
      },
      voice3: {
        source: null,
        gainNode: null,
        play: function (volumeVal = 1) {
          this.source = audioContext.createBufferSource();
          this.source.buffer = bufferList[8];
          this.gainNode = audioContext.createGain();

          if (!audioControl.isSoundOn) {
            this.gainNode.gain.value = 0;
          } else {
            this.gainNode.gain.value = volumeVal;
          }

          this.source.connect(this.gainNode).connect(audioContext.destination);
          this.source.start(0);
        },
        stop: function () {
          if (this.source) {
            this.source.stop();
          }
        },
      },
      voice4: {
        source: null,
        gainNode: null,
        play: function (volumeVal = 1) {
          this.source = audioContext.createBufferSource();
          this.source.buffer = bufferList[9];
          this.gainNode = audioContext.createGain();

          if (!audioControl.isSoundOn) {
            this.gainNode.gain.value = 0;
          } else {
            this.gainNode.gain.value = volumeVal;
          }

          this.source.connect(this.gainNode).connect(audioContext.destination);
          this.source.start(0);
        },
        stop: function () {
          if (this.source) {
            this.source.stop();
          }
        },
      },
      voice5: {
        source: null,
        gainNode: null,
        play: function (volumeVal = 1) {
          this.source = audioContext.createBufferSource();
          this.source.buffer = bufferList[10];
          this.gainNode = audioContext.createGain();

          if (!audioControl.isSoundOn) {
            this.gainNode.gain.value = 0;
          } else {
            this.gainNode.gain.value = volumeVal;
          }

          this.source.connect(this.gainNode).connect(audioContext.destination);
          this.source.start(0);
        },
      },
      bgm1: {
        source: null,
        gainNode: null,
        play: function (volumeVal = 1) {

          this.source = audioContext.createBufferSource();
          this.source.buffer = bufferList[11];
          this.gainNode = audioContext.createGain();

          if (!audioControl.isSoundOn) {
            this.gainNode.gain.value = 0;
          } else {
            this.gainNode.gain.value = volumeVal;
          }

          this.source.connect(this.gainNode).connect(audioContext.destination);
          this.source.start(0);
        },
        setVolume: function (val) {
          if (this.gainNode) {
            if (this.source && this.gainNode) {
              this.gainNode.gain.value = val;
            }
          }
        },
        stop: function () {
          if (this.source) {
            this.source.stop();
          }
        },
      },
      bgm2: {
        source: null,
        gainNode: null,
        playRepeat: function (volumeVal = 1) {
          this.source = audioContext.createBufferSource();
          this.source.buffer = bufferList[12];
          this.gainNode = audioContext.createGain();

          if (!audioControl.isSoundOn) {
            this.gainNode.gain.value = 0;
          } else {
            this.gainNode.gain.value = volumeVal;
          }

          this.source.connect(this.gainNode).connect(audioContext.destination);
          this.source.start(0);
          this.source.loop = true;
        },
        stop: function () {
          if (this.source) {
            this.source.stop();
          }
        },
        setVolume: function (val) {
          if (this.gainNode) {
            if (this.source && this.gainNode) {
              this.gainNode.gain.value = val;
            }
          }
        },
      },
      bgm3: {
        source: null,
        gainNode: null,
        play: function (volumeVal = 1) {
          this.source = audioContext.createBufferSource();
          this.source.buffer = bufferList[13];
          this.gainNode = audioContext.createGain();

          if (!audioControl.isSoundOn) {
            this.gainNode.gain.value = 0;
          } else {
            this.gainNode.gain.value = volumeVal;
          }

          this.source.connect(this.gainNode).connect(audioContext.destination);
          this.source.start(0);
          // this.source.loop = true;
        },
        stop: function () {
          if (this.source) {
            this.source.stop();
          }
        },
        setVolume: function (val) {
          if (this.gainNode) {
            if (this.source && this.gainNode) {
              this.gainNode.gain.value = val;
            }
          }
        },
      },
      button1A: {
        source: null,
        gainNode: null,
        play: function (volumeVal = 1) {

          this.source = audioContext.createBufferSource();
          this.source.buffer = bufferList[0];
          this.gainNode = audioContext.createGain();
          this.gainNode.gain.value = volumeVal;
          this.source.connect(this.gainNode).connect(audioContext.destination);
          this.source.start(0);
        },
        stop: function () {
          if (this.source) {
            this.source.stop();
          }
        },
      },
      button1B: {
        source: null,
        gainNode: null,
        play: function (volumeVal = 1) {

          this.source = audioContext.createBufferSource();
          this.source.buffer = bufferList[1];
          this.gainNode = audioContext.createGain();
          this.gainNode.gain.value = volumeVal;
          this.source.connect(this.gainNode).connect(audioContext.destination);
          this.source.start(0);
        },
        stop: function () {
          if (this.source) {
            this.source.stop();
          }
        },
      },
      lightBeam: {
        source: null,
        gainNode: null,
        play: function (volumeVal = 1) {

          this.source = audioContext.createBufferSource();
          this.source.buffer = bufferList[2];
          this.gainNode = audioContext.createGain();
          this.gainNode.gain.value = volumeVal;

          this.source.connect(this.gainNode).connect(audioContext.destination);
          this.source.start(0);
        },
        stop: function () {
          if (this.source) {
            this.source.stop();
          }
        },
      },
      pillarUp: {
        source: null,
        gainNode: null,
        play: function (volumeVal = 1) {

          this.source = audioContext.createBufferSource();
          this.source.buffer = bufferList[3];
          this.gainNode = audioContext.createGain();
          this.gainNode.gain.value = volumeVal;

          this.source.connect(this.gainNode).connect(audioContext.destination);
          this.source.start(0);
        },
        stop: function () {
          if (this.source) {
            this.source.stop();
          }
        },
      },
      runesLightUp: {
        source: null,
        gainNode: null,
        play: function (volumeVal = 1) {

          this.source = audioContext.createBufferSource();
          this.source.buffer = bufferList[4];
          this.gainNode = audioContext.createGain();
          this.gainNode.gain.value = volumeVal;
          this.source.connect(this.gainNode).connect(audioContext.destination);
          this.source.start(0);
        },
        stop: function () {
          if (this.source) {
            this.source.stop();
          }
        },
      },
      anomuraAppears: {
        source: null,
        gainNode: null,
        play: function (volumeVal = 1) {

          this.source = audioContext.createBufferSource();
          this.source.buffer = bufferList[5];
          this.gainNode = audioContext.createGain();
          this.gainNode.gain.value = volumeVal;
          this.source.connect(this.gainNode).connect(audioContext.destination);
          this.source.start(0);
        },
        stop: function () {
          if (this.source) {
            this.source.stop();
          }
        },
      },
    }));

    console.log("Audio loaded");
    setAudioLoaded(true);
    // audioControl?.bgm1?.play(0.5);
  };

  return [audioControl, isAudioLoaded];
}