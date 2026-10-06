/**
 * @param {The percentage of the screen already scrolled.} ScrollPercent
 * @param {Speed multiplier for scroll speed. This has to be a negative value.} ScrollSpeed
 * @param {Offset that sets the initial position before any scrolling is done. } InitialOffset
 * @param {This is value added when reaching the sixteen hundred width.} SixteenHundredOffset
 * @param {This is value added when reaching the twelve hundred width.} TwelveHundredOffSet
 * @param {This is value added when reaching the one thousand width.} OneThousandOffSet
 * @param {This is value added when reaching the eight hundred width.} EightHundredOffSet
 * @param {This is value added when reaching the six hundred width.} SixHundredOffSet
 * * @param {This is value added when reaching the six hundred width.} NineteenHundredOffset
 * * @param {This is value added when reaching the six hundred width.} TwentyFiveHundredOffset
 * * @param {This is value added when reaching the six hundred width.} TwentyEightHundredOffset
 * @returns {Returns a number that is adding to the top css value of a transform}
 */
export function useScrollValue(
    ScrollPercent,
    ScrollSpeed,
    InitialOffset,
    ThirtyEightHundredOffset = 0,
    TwentyEightHundredOffset = 0,
    TwentyFiveHundredOffset = 0,
    NineteenHundredOffset = 0,
    SixteenHundredOffset = 0,
    TwelveHundredOffSet = 0,
    OneThousandOffSet = 0,
    EightHundredOffSet = -100,
    SixHundredOffSet = 0,
    FourHundredOffSet = -120
) {
    let calculatedOffsetY = 0;
    //Four seems to be the magic number for not stretching the scroll bar
    let scrollMultiplier = 4;

    if (window?.innerWidth <= 400) {
        scrollMultiplier = 2;
        calculatedOffsetY = Math.floor(
            InitialOffset + FourHundredOffSet + (ScrollPercent * ScrollSpeed) / scrollMultiplier
        );
        return calculatedOffsetY;
    } else if (window?.innerWidth <= 600) {
        scrollMultiplier = 2;
        calculatedOffsetY = Math.floor(
            InitialOffset + SixHundredOffSet + (ScrollPercent * ScrollSpeed) / scrollMultiplier
        );
        return calculatedOffsetY;
    } else if (window?.innerWidth <= 800) {
        scrollMultiplier = 3;
        calculatedOffsetY = Math.floor(
            InitialOffset + EightHundredOffSet + (ScrollPercent * ScrollSpeed) / scrollMultiplier
        );
        return calculatedOffsetY;
    } else if (window?.innerWidth <= 1000) {
        scrollMultiplier = 3;
        calculatedOffsetY = Math.floor(
            InitialOffset + OneThousandOffSet + (ScrollPercent * ScrollSpeed) / scrollMultiplier
        );
        return calculatedOffsetY;
    } else if (window?.innerWidth <= 1200) {
        scrollMultiplier = 5;
        calculatedOffsetY = Math.floor(
            InitialOffset + TwelveHundredOffSet + (ScrollPercent * ScrollSpeed) / scrollMultiplier
        );
        return calculatedOffsetY;
    } else if (window?.innerWidth <= 1600) {
        scrollMultiplier = 5;
        calculatedOffsetY = Math.floor(
            InitialOffset + SixteenHundredOffset + (ScrollPercent * ScrollSpeed) / scrollMultiplier
        );
        return calculatedOffsetY;
    }
    else if (window?.innerWidth <= 1980) {
        scrollMultiplier = 5;
        calculatedOffsetY = Math.floor(
            InitialOffset + NineteenHundredOffset + (ScrollPercent * ScrollSpeed) / scrollMultiplier
        );
        return calculatedOffsetY;
    }
    else if (window?.innerWidth <= 2560) {
        scrollMultiplier = 5;
        calculatedOffsetY = Math.floor(
            InitialOffset + TwentyFiveHundredOffset + (ScrollPercent * ScrollSpeed) / scrollMultiplier
        );
        return calculatedOffsetY;
    }
    else if (window?.innerWidth <= 2880) {
        scrollMultiplier = 5;
        calculatedOffsetY = Math.floor(
            InitialOffset + TwentyEightHundredOffset + (ScrollPercent * ScrollSpeed) / scrollMultiplier
        );
        return calculatedOffsetY;
    }
    else if (window?.innerWidth <= 3840) {
        scrollMultiplier = 5;
        calculatedOffsetY = Math.floor(
            InitialOffset + ThirtyEightHundredOffset + (ScrollPercent * ScrollSpeed) / scrollMultiplier
        );
        return calculatedOffsetY;
    }

    calculatedOffsetY = Math.floor(
        InitialOffset + (ScrollPercent * ScrollSpeed) / scrollMultiplier
    );
    return calculatedOffsetY;
}
