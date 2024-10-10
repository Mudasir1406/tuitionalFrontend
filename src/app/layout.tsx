import "./globals.css";
import { DrawerProvider } from "@/context/drawer-context";
import { Metadata } from "next";
import Metrics from "./metrics";
import dynamic from "next/dynamic";
const DynamicModel = dynamic(() => import("@/components/drawer"), {
  ssr: false,
});
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
    logo: "https://tuitionaledu.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.e75c8b12.png&w=640&q=75",
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
        id="organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <DrawerProvider>
        <body style={{ margin: 0 }}>
          <DynamicModel />
          {children}
          <Metrics />
        </body>
      </DrawerProvider>
    </html>
  );
}
