import "./globals.css";
import type { Metadata } from "next";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import { getBusinessJsonLd, serializeJsonLd } from "@/lib/seo";
import {
  absoluteUrl,
  BUSINESS_NAME,
  HOME_TITLE,
  SITE_DESCRIPTION,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: `%s | ${BUSINESS_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: [
      {
        url: "/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/favicon-16x16.png",
        type: "image/png",
        sizes: "16x16",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
  openGraph: {
    title: HOME_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: BUSINESS_NAME,
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: absoluteUrl("/images/hero/hero-room-vancouver.png"),
        width: 1200,
        height: 630,
        alt: "Used pool table showroom in Vancouver",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: SITE_DESCRIPTION,
    images: [absoluteUrl("/images/hero/hero-room-vancouver.png")],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(getBusinessJsonLd()),
          }}
        />
        <NavbarWrapper />
        {children}
      </body>
    </html>
  );
}
