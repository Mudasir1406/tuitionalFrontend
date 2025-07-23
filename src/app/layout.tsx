import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@mui/material";
import { DrawerProvider } from "@/context/drawer-context";
import Metrics from "./metrics";
import Script from "next/script";
import theme from "./assets/css/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tuitional",
  description: "",
  applicationName: "Tuitional Website",
  verification: {
    google: "d87T061Ai7m3rs3u-Ejd22h51-skUWdCj5CFg2cuYVs",
  },
  other: {
    "font-display": "swap",
  },
};
import { League_Spartan } from "next/font/google";
import PageViewTracker from "@/components/page-view-tracker";
import PixelTracker from "./metrics/pixel-tracker";
import FbPixelPageView from "./metrics/pixel-tracker";

const DynamicModel = dynamic(() => import("@/components/drawer"), {
  ssr: true,
});

export const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  display: "swap",
  weight: ["600"],
  variable: "--font-league-spartan",
  preload: true, // Add this
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${leagueSpartan.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <meta
          name="facebook-domain-verification"
          content="nsi12pa24pgn3gdkbjbbw85ktpjzux"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?                         
              n.callMethod.apply(n,arguments):n.queue.push   
              (arguments)}; if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!
              0;n.version='2.0';n.queue=[];t=b.createElement(e);
              t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,
              'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1950457082424995');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1950457082424995&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>

      <body style={{ margin: 0 }}>
        <PixelTracker />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NG7HWSZT"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <ThemeProvider theme={theme}>
          <DrawerProvider>
            <DynamicModel />
            <FbPixelPageView />
            {children}
            <Metrics />
            <Toaster />
          </DrawerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
