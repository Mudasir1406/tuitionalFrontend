import "./globals.css";
import { DrawerProvider } from "@/context/drawer-context";
import { Metadata } from "next";
import Metrics from "./metrics";
import dynamic from "next/dynamic";
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
  verification: {
    google: "d87T061Ai7m3rs3u-Ejd22h51-skUWdCj5CFg2cuYVs",
  },
};
import { Toaster } from "react-hot-toast";
import theme from "./assets/css/theme";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <Script
        id="organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      /> */}
      <head>
        {/* ✅ Google Tag Manager (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-16865900759"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-16865900759');
            `,
          }}
        />

        {/* ✅ Event Snippet for Book Appointment Conversion */}
        <Script
          id="google-conversion-event"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              gtag('event', 'conversion', {'send_to': 'AW-16865900759/k1VvCPHjjJwaENfxpOo-'});
            `,
          }}
        />
      </head>
      <ThemeProvider theme={theme}>
        <DrawerProvider>
          <body style={{ margin: 0 }}>
            <DynamicModel />
            {children}
            <Metrics />
            <Toaster />
          </body>
        </DrawerProvider>
      </ThemeProvider>
    </html>
  );
}
