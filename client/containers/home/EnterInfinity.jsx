import React, { useState, useEffect, useLayoutEffect } from "react";
import { useScrollValue } from "/lib/useScrollValue";
import s from "/sass/home/infinity/index.module.css";

const InitialOffset = 500,
    ThirtyEightHundredOffset = 255,
    TwentyEightHundredOffset = 255,
    TwentyFiveHundredOffset = 225,
    NineteenHundredOffset = 25,
    SixteenHundredOffset = 125,
    TwelveHundredOffSet = 175,
    OneThousandOffSet = 125,
    EightHundredOffSet = 190,
    SixHundredOffSet = 100,
    FourHundredOffSet = 0;

export default function EnterInfinity({ ScrollPercent }) {
    const [scrollSpeed, setScrollSpeed] = React.useState(-6.5);

    let calculatedOffsetY = useScrollValue(
        ScrollPercent,
        scrollSpeed,
        InitialOffset,
        ThirtyEightHundredOffset,
        TwentyEightHundredOffset,
        TwentyFiveHundredOffset,
        NineteenHundredOffset,
        SixteenHundredOffset,
        TwelveHundredOffSet,
        OneThousandOffSet,
        EightHundredOffSet,
        SixHundredOffSet,
        FourHundredOffSet
    );
    const [carouselItems, setCarouselItems] = useState([
        // "/img/home/infinityCircle/Loop.gif",
        "https://res.cloudinary.com/deepsea/image/upload/f_auto/v1666471426/Anomura-Web-Assets/Loop_llqg3q.gif",
        "/img/home/infinityCircle/battles_01.png",
        "/img/home/infinityCircle/Carousel_1.png",
        "/img/home/infinityCircle/battles_02.png",
        "/img/home/infinityCircle/Carousel_2.png",
        "/img/home/infinityCircle/battles_03.png",
    ]);
    const [currentViewItem, setCurrentViewItem] = useState(0);

    useLayoutEffect(() => {
        if (window.innerWidth <= 1200) setScrollSpeed(-4.5);
        if (window.innerWidth <= 600) setScrollSpeed(-1.68);
        if (window.innerWidth <= 375) setScrollSpeed(-1.68);
    });

    const viewPreviousItem = () => {
        if (currentViewItem === 0) {
            return;
        }
        setCurrentViewItem((prev) => prev - 1);
    };

    const viewNextItem = () => {
        if (currentViewItem === carouselItems?.length - 1) {
            return;
        }
        setCurrentViewItem((prev) => prev + 1);
    };

    const getCarouselImage = () => {
        return <img src={`${carouselItems[currentViewItem]}`} />;
    };

    return (
        <div className={s.enterInifinity} style={{ top: `calc(${calculatedOffsetY}px)` }}>
            <div className={s.enterInifinity_container}>
                <div className={s.enterInifinity_text}>
                    <div className={s.enterInifinity_heading}>ENTER THE INFINITY CIRCLE</div>

                    <div className={s.enterInifinity_divider}>
                        <div className={s.enterInifinity_divider_carousel}>
                            <div className={s.enterInifinity_divider_carousel_canvas}>
                                {getCarouselImage()}
                            </div>
                            <div className={s.enterInifinity_divider_carousel_buttons}>
                                <div className={s.enterInifinity_divider_carousel_buttons_left}>
                                    <div
                                        className={
                                            s.enterInifinity_divider_carousel_buttons_left_wrapper
                                        }
                                    >
                                        <img
                                            src={
                                                currentViewItem === 0
                                                    ? `/img/home/infinityCircle/Arrow Left_Gray.png`
                                                    : `/img/home/infinityCircle/Arrow Left_Blue.png`
                                            }
                                            onClick={() => viewPreviousItem()}
                                            className={
                                                currentViewItem === 0
                                                    ? s.enterInifinity_divider_carousel_buttons_left_disable
                                                    : s.enterInifinity_divider_carousel_buttons_left_enable
                                            }
                                            alt="left arrow"
                                        />
                                    </div>
                                </div>

                                <div className={s.enterInifinity_divider_carousel_buttons_right}>
                                    <div
                                        className={
                                            s.enterInifinity_divider_carousel_buttons_right_wrapper
                                        }
                                    >
                                        <img
                                            src={
                                                currentViewItem === carouselItems.length - 1
                                                    ? `/img/home/infinityCircle/Arrow Right_Gray.png`
                                                    : `/img/home/infinityCircle/Arrow Right_Blue.png`
                                            }
                                            onClick={() => viewNextItem()}
                                            className={
                                                currentViewItem === carouselItems.length - 1
                                                    ? s.enterInifinity_divider_carousel_buttons_right_disable
                                                    : s.enterInifinity_divider_carousel_buttons_right_enable
                                            }
                                            alt="right arrow"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={s.enterInifinity_divider_paragraph}>
                            <div className={s.enterInifinity_divider_paragraph_wrapper}>
                                {/* <p>
                                    An ever-evolving Universe outside the vacuum of space and time.
                                </p> */}
                                <p>
                                    Play as an Anomura and journey to one of the four Realms: Ocean,
                                    Earth, Science, or Sky. Prepare to battle powerful aenemies &
                                    bosses and utilize the Infinity Circle to unlock cards, find
                                    treasure, and gain XP.
                                </p>
                                {/* <p>
                                    Battle aenemies & bosses who threaten your Realm. Utilize the
                                    Infinity Circle by unlocking cards, gearing up, finding
                                    treasure, and gaining XP.
                                </p> */}
                                <p>
                                    Uncover the secrets of the Universe and restore balance to the
                                    four Realms!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
