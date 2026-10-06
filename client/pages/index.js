import Head from "next/head";
import dynamic from "next/dynamic";
import { useScrollEvent } from "/hooks/useScrollEvent";
import s from "/sass/home/home.module.css";
import { useRecoilValue } from "recoil";
import { ScrollValue } from "/atoms/Atoms";
import React, { useEffect, useState } from "react";
import { Navbar } from "@components/home/ComponentIndex";
import useDeviceDetect from "lib/useDeviceDetect";
import FloatingBottom from "containers/common/FloatingBottom";


const { EnterInfinity, CrabAnat, MeetTheTeam, Footer, ShopZone } = {
	ShopZone: dynamic(() => import("/containers/home/ContainerIndex").then((module) => module.ShopZone), {
		ssr: true,
	}),
	EnterInfinity: dynamic(() => import("/containers/home/ContainerIndex").then((module) => module.EnterInfinity), {
		ssr: false,
	}),
	CrabAnat: dynamic(
		() => import("/containers/home/ContainerIndex").then((module) => module.CrabAnat),
		{ ssr: false }
	),
	MeetTheTeam: dynamic(
		() => import("/containers/home/ContainerIndex").then((module) => module.MeetTheTeam),
		{ ssr: false }
	),
	Footer: dynamic(
		() => import("/containers/home/ContainerIndex").then((module) => module.Footer),
		{ ssr: false, }
	),
};

function HomePage() {
	const setOffsetY = useScrollEvent();
	const { isMobile } = useDeviceDetect();
	const scrollPercent = useRecoilValue(ScrollValue);

	useEffect(() => {
	}, [isMobile]);


	return (
		<div className={s.App}>
			<Head>
				<title>Anomura: The Cove Awaits You</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta property="og:title" content="Anomura: The Cove Awaits You" />
				<meta
					property="og:description"
					content="Become a guardian of the Universe to restore
					balance, harmony and reap rewards!"
				/>
				<meta
					property="og:image"
					content="https://www.anomuragame.com/Main Website Preview Shell Logo.png"
				/>
				<meta property="og:site_name" content="Anomura: The Cove Awaits You"></meta>
				<meta property="keywords" content="Anomura, NFT, Game" />

				<meta name="twitter:card" content="summary_large_image" />
				<meta
					property="twitter:image"
					content="https://www.anomuragame.com/Main Website Preview Shell Logo.png"
				/>
				<link rel="icon" href="/img/favicons/faviconShell.png" />
			</Head>

			<img className={s.sunlight} src="/img/home/sunlight.png" alt="" />

			<div className={s.parallax_group}>
				<Navbar isMobile={isMobile} />
				<ShopZone />
				<EnterInfinity ScrollPercent={scrollPercent} ></EnterInfinity>
				<CrabAnat ScrollPercent={scrollPercent} />
				<MeetTheTeam ScrollPercent={scrollPercent} />
				<Footer ScrollPercent={scrollPercent} />
			</div>

			<FloatingBottom isMobile={isMobile} />

		</div>
	);
}
HomePage.isHomePage = true;
export default HomePage;