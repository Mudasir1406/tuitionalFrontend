import "./globals.css";
import { DrawerProvider } from "@/context/drawer-context";
import { Metadata } from "next";
import Metrics from "./metrics";
import dynamic from "next/dynamic";
import { leagueSpartan } from "./fonts"; // Import your font config

const DynamicModel = dynamic(() => import("@/components/drawer"), {
  ssr: false,
});
import Script from "next/script";
import Image from "next/image";
import { Box, ThemeProvider } from "@mui/material";
export const metadata: Metadata = {
  title: "Tuitional",
  description: "",
  applicationName: "Tuitional Website",
  // verification: {
  //   google: "d87T061Ai7m3rs3u-Ejd22h51-skUWdCj5CFg2cuYVs",
  // },
};
import { Toaster } from "react-hot-toast";
import theme from "./assets/css/theme";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={leagueSpartan.variable}>
      {/* <Script
        id="organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      /> */}

      <head>
        <link
          rel="preload"
          href={leagueSpartan.variable}
          as="style"
          crossOrigin="anonymous"
        />
      </head>
      <ThemeProvider theme={theme}>
        <DrawerProvider>
          <body style={{ margin: 0 }}>
            <DynamicModel />
            {children}
            {/* <Metrics /> */}
            <Toaster />
          </body>
        </DrawerProvider>
      </ThemeProvider>
    </html>
  );
}
