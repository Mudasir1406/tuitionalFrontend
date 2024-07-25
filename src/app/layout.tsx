import type { Metadata } from "next";
import "./globals.css";
import { DrawerProvider } from "@/context/drawer-context";

export const metadata: Metadata = {
  title: "Tuitional",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <DrawerProvider>
        <body style={{ margin: 0 }}>{children}</body>
      </DrawerProvider>
    </html>
  );
}
