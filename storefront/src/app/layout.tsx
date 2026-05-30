import "./globals.css";
import type { Metadata } from "next";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Used Billiard Store",
  description: "Used pool tables, ping pong tables, and foosball tables.",
  openGraph: {
    title: "Used Billiard Store",
    description: "Used pool tables, ping pong tables, and foosball tables.",
    url: SITE_URL,
    siteName: "Used Billiard Store",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavbarWrapper />
        {children}
      </body>
    </html>
  );
}
