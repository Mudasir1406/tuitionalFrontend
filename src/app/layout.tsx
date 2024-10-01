import "./globals.css";
import { DrawerProvider } from "@/context/drawer-context";
import ResponsiveDrawer from "@/components/drawer";

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <DrawerProvider>
        <body style={{ margin: 0 }}>
          <ResponsiveDrawer />

          {children}
        </body>
      </DrawerProvider>
    </html>
  );
}
