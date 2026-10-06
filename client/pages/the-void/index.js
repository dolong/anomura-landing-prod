import TheVoid from "@components/the-void/TheVoid";
import Head from "next/head";
import React from "react";

function TheVoidPage() {
  return (
    <>
      <Head>
        <title>Anomura | The Void</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Anomura | The Void" />
        <meta
          property="og:description"
          content="Are you ready to enter the Void?"
        />
        <meta property="og:image"
          content="/Website Preview_V2.png"
        />
        <meta
          property="og:site_name"
          content="Anomura | The Void"
        />
        <meta property="keywords" content="Anomura, NFT, Game, Anomura Mint" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:image"
          content="/Website Preview_V2.png"
        />
        <link rel="icon" href="/faviconShell.png" />
      </Head>
      <TheVoid />
    </>
  );
}

export default TheVoidPage;
