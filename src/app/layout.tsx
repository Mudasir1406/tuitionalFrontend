import "./globals.css";
import { DrawerProvider } from "@/context/drawer-context";
import ResponsiveDrawer from "@/components/drawer";
import { Metadata } from "next";
import Metrics from "./metrics";
import Head from "next/head";
import Script from "next/script";
export const metadata: Metadata = {
  title: "Tuitional",
  description: "",
  applicationName: "Tuitional Website",
  verification: {
    google: "d87T061Ai7m3rs3u-Ejd22h51-skUWdCj5CFg2cuYVs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tuitional",
    url: "https://tuitionaledu.com",
    logo: "https://tuitionaledu.com/wp-content/uploads/2023/09/logo2.png",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      telephone: "+971 56 490 0376",
      email: "hello@tuitionaledu.com",
    },
  };
  return (
    <html lang="en">
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <DrawerProvider>
        <body style={{ margin: 0 }}>
          <ResponsiveDrawer />
          {children}
          <Metrics />
        </body>
      </DrawerProvider>
    </html>
  );
}
