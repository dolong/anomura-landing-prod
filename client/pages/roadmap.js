import s from "/sass/home/roadmap/index.module.css";
import React, { useEffect, useState } from "react";
import { Navbar } from "@components/home/ComponentIndex";
import useDeviceDetect from "lib/useDeviceDetect";
import FloatingBottom from "containers/common/FloatingBottom";
import { Roadmap, ShareFooter } from "containers/home/ContainerIndex";
function RoadMapPage() {
	const { isMobile } = useDeviceDetect();
	useEffect(() => {

	}, [isMobile]);
	return (
		<div className={s.app}>
			<div className={s.parallax_group}>
				<Navbar isMobile={isMobile} />
				<Roadmap />
				<ShareFooter isParalax={false} />
			</div>
			<FloatingBottom isMobile={isMobile} />

		</div>
	);
}

RoadMapPage.isHomePage = true;
export default RoadMapPage;
