import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@mui/material";
import { DrawerProvider } from "@/context/drawer-context";
import { I18nProvider } from "@/context/language-context";
import HtmlWrapper from "@/components/html-wrapper";
import Metrics from "./metrics";
import Script from "next/script";
import UniversalSchema from "@/components/seo/UniversalSchema";
import theme from "./assets/css/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tuitional",
  description: "",
  applicationName: "Tuitional Website",
  verification: {
    google: "d87T061Ai7m3rs3u-Ejd22h51-skUWdCj5CFg2cuYVs",
  },
  openGraph: {
    siteName: "Tuitional",
    type: "website",
    images: [
      {
        url: "https://tuitionaledu.com/assets/images/static/logo.png",
        width: 640,
        height: 160,
        alt: "Tuitional - Online Tutoring Platform",
      },
    ],
  },
  twitter: {
    card: "summary",
    site: "@tuitionaledu",
    images: ["https://tuitionaledu.com/assets/images/static/logo.png"],
  },
  other: {
    "font-display": "swap",
    "color-scheme": "light",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#38b6ff',
};
import { leagueSpartan, inter, notoSansArabic } from "./fonts";
import FbPixelPageView from "./metrics/pixel-tracker";

const DynamicModel = dynamic(() => import("@/components/drawer"), {
  ssr: true,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${leagueSpartan.variable} ${inter.variable} ${notoSansArabic.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <meta
          name="facebook-domain-verification"
          content="nsi12pa24pgn3gdkbjbbw85ktpjzux"
        />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="preconnect" href="https://api.ipify.org" />
        <link rel="dns-prefetch" href="//firebasestorage.googleapis.com" />
        <link rel="dns-prefetch" href="//img.icons8.com" />
        <link rel="dns-prefetch" href="//www.facebook.com" />
        <link
          rel="preload"
          href="/assets/images/static/girl-with-book.webp"
          as="image"
          type="image/webp"
        />
        <link
          rel="preload"
          href="/assets/images/static/logo.png"
          as="image"
          type="image/png"
        />
        <UniversalSchema />
        {/* Mobile performance optimizations */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="dns-prefetch" href="//cdn-icons-png.flaticon.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        {/* CSS is handled automatically by Next.js */}
      </head>

      <body style={{ margin: 0 }}>
        {/* <PixelTracker /> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NG7HWSZT"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <ThemeProvider theme={theme}>
          <I18nProvider>
            <HtmlWrapper className={`${leagueSpartan.variable} ${inter.variable} ${notoSansArabic.variable}`}>
              <DrawerProvider>
                <DynamicModel />
                <FbPixelPageView />
            {children}
                <Metrics />
                <Toaster />
              </DrawerProvider>
            </HtmlWrapper>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
