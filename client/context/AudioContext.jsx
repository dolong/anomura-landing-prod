import useSound from "lib/useSound";
import React, { useState } from "react";

export const AudioContext = React.createContext();

export function AudioProvider({ children }) {
    const [audioControl, isAudioLoaded, turnSound] = useSound();

    return (
        <AudioContext.Provider value={{ audioControl, isAudioLoaded, turnSound }}>
            {children}
        </AudioContext.Provider>
    );
}
