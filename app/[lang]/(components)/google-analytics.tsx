"use client"

import Script from "next/script"

export default function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        strategy="afterInteractive"
        data-category="analytics"
        type="text/plain"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        data-category="analytics"
        type="text/plain"
      >
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied'
            });
        `}
      </Script>
      {/* <Script id="google-analytics-storage-enabled" type="text/plain" data-category="analytics">
        {`
        gtag('consent', 'update', {
            'analytics_storage': 'granted'
        });
        `}
      </Script>

      <Script id="google-analytics-storage-disabled" type="text/plain" data-category="!analytics">
        {`
        gtag('consent', 'update', {
            'analytics_storage': 'denied'
        });
        `}
      </Script>

      <Script id="google-analytics-ads-enabled" type="text/plain" data-category="ads">
        {`
        gtag('consent', 'update', {
            'ad_storage': 'granted'
        });
        `}
      </Script>

      <Script id="google-analytics-ads-disabled" type="text/plain" data-category="!ads">
        {`
        gtag('consent', 'update', {
            'ad_storage': 'denied'
        });
        `}
      </Script> */}
    </>
  )
}
