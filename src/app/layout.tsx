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
  // verification: {
  //   google: "d87T061Ai7m3rs3u-Ejd22h51-skUWdCj5CFg2cuYVs",
  // },
  other: {
    "font-display": "swap",
  },
};
import { League_Spartan } from "next/font/google";
import PageViewTracker from "@/components/page-view-tracker";

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
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>

      <body style={{ margin: 0 }}>
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
            <PageViewTracker />
            {children}
            <Metrics />
            <Toaster />
          </DrawerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
