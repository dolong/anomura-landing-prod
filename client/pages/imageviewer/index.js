import useSWR from "swr";
import React, { useState, useEffect, useLayoutEffect } from "react";
const fetcher = (url) => fetch(url).then((r) => r.json());
import s from "/sass/imageviewer/gallery.module.css";

/* this api is for gallery */
const loadingItems = [1, 2, 3, 4, 5, 6, 7, 8, 9]
export default function GalleryViewerIndex() {
    const [pageIndex, setPageIndex] = useState(0);
    const { data, error } = useSWR(`/api/crabs?page=${pageIndex}`, fetcher);


    if (error) console.log(error);
    return (
        <div className={s.container}>
            {/* <div className={s.wrapper}> */}
            <div className={s.content}>
                <div className={s.content_logo}>
                    <img src="/img/gallery/logo-pink.png" alt="AnomuraLogo" onClick={() => window.open(`https://anomuragame.com`, "_blank")} />
                </div>
                <div className={s.content_title}>The Cove Awaits You...</div>
                <div className={s.content_paragraph}>
                    Strategic gameplay, beautiful pixel art and contributions to wildlife initiatives—Anomura is a game with a greater purpose. Uncover the secrets of the Universe and restore balance to the four Realms.
                </div>
                <div className={s.content_paragraph}>Follow us for the latest updates in the Cove.</div>

            </div>
            <div className={s.socials}>
                <div className={s.socials_wrapper}>
                    <div
                        className={s.socials_wrapper_icon}
                        onClick={() => window.open(`https://twitter.com/anomuragame`, "_blank")}
                    >
                        <img src="/img/gallery/Twitter Icon.png" />
                        <img src={"/img/gallery/hexagon_outline.png"} />
                    </div>
                    <div
                        className={s.socials_wrapper_icon}
                        onClick={() => window.open(`https://discord.gg/anomuragame`, "_blank")}
                    >
                        <img src="/img/gallery/Discord Icon.png" />
                        <img src={"/img/gallery/hexagon_outline.png"} />
                    </div>
                    <div
                        className={s.socials_wrapper_icon}
                        onClick={() => window.open(`https://medium.com/@anomura`, "_blank")}
                    >
                        <img src="/img/gallery/Medium Icon.png" />
                        <img src={"/img/gallery/hexagon_outline.png"} />
                    </div>
                    {/* <img src="/img/gallery/Twitter Icon.png" onClick={() => window.open(`https://twitter.com/anomuragame`, "_blank")} /> */}
                    {/* <img src="/img/gallery/Discord Icon.png" onClick={() => window.open(`https://discord.gg/anomuragame`, "_blank")} /> */}
                    {/* <img src="/img/gallery/Medium Icon.png" onClick={() => window.open(`https://medium.com/@anomura`, "_blank")} /> */}
                </div>
            </div>
            <div className={s.grid}>

                {!data && loadingItems?.map((item, index) => {
                    return (
                        <div key={index} className={s.grid_image_loading}>

                            <img src="/img/gallery/loading-27.gif" alt="" />

                        </div>
                    );
                })}
                {data?.map((anomura, index) => {
                    return (
                        <div key={index}>
                            <a
                                href={`${process.env.NEXT_PUBLIC_WEBSITE_HOST}/imageviewer/${anomura.crabId}`}
                                target="_blank"
                                className="text-red-200"
                            >
                                <img className={s.grid_image} src={anomura.image} alt="" />
                            </a>
                        </div>
                    );
                })}
            </div>
            <div className={s.arrows}>
                <div className={s.arrows_wrapper}>
                    <img onClick={() => {
                        if (pageIndex == 0) return;
                        setPageIndex(pageIndex - 1)
                    }}
                        src={pageIndex === 0 ? `/img/gallery/Arrow Left_Gray.png` : `/img/gallery/Arrow Left_Blue.png`} />
                    <img onClick={() => {
                        if (pageIndex == 4) return;
                        setPageIndex(pageIndex + 1)
                    }}
                        src={pageIndex === 4 ? `/img/gallery/Arrow Right_Gray.png` : `/img/gallery/Arrow Right_Blue.png`} />

                </div>
            </div>
            {/* </div> */}
        </div >
    );
}