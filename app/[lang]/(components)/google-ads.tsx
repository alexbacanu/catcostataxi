"use client";

import Script from "next/script";

export default function GoogleAds() {
  return (
    <>
      <Script
        id="google-ads"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GADS_CLIENT_ID}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
        data-category="advertising"
        type="text/plain"
      ></Script>
    </>
  );
}
