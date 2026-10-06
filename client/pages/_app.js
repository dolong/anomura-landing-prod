import React, { StrictMode } from "react";
import { RecoilRoot } from "recoil";
import "/node_modules/nes.css/css/nes.css";
import "../styles/globals.css";

import { Web3ContextProvider } from "@context/Web3Context";
import Script from "next/script";
import * as gtag from "../lib/gtag";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";
import { AudioProvider } from "@context/AudioContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    const router = useRouter();
    React.useEffect(() => {
        const handleRouteChange = (url) => {
            gtag.pageview(url);
        };
        router.events.on("routeChangeComplete", handleRouteChange);
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);

    const handleRouteComponent = (Component) => {
        if (Component.isHomePage == true) {
            return (
                <AudioProvider>
                    <Component {...pageProps} />
                    <Analytics />
                </AudioProvider>
            );
        } else if (Component.needWeb3Provider == true) {
            return (
                <SessionProvider session={session}>
                    <Web3ContextProvider>
                        <Component {...pageProps} />
                    </Web3ContextProvider>
                </SessionProvider>
            );
        } else {
            return (
                <>
                    <Component {...pageProps} />
                    <Analytics />
                </>
            );
        }
    };

    return (
        <StrictMode>
            <RecoilRoot>
                {/* Global Site Tag (gtag.js) - Google Analytics */}
                <>
                    <Script
                        strategy="afterInteractive"
                        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
                    />
                    <Script strategy="afterInteractive">
                        {`
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                                page_path: window.location.pathname,
                                });
                            `}
                    </Script>
                </>

                {handleRouteComponent(Component)}
            </RecoilRoot>
        </StrictMode>
    );
}

export default MyApp;
