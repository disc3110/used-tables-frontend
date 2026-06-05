import "./globals.css";
import type { Metadata } from "next";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import { getBusinessJsonLd, serializeJsonLd } from "@/lib/seo";
import {
  absoluteUrl,
  BUSINESS_NAME,
  SITE_DESCRIPTION,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Used Pool Tables Vancouver | Delivery & Installation",
    template: `%s | ${BUSINESS_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
  openGraph: {
    title: "Used Pool Tables Vancouver | Delivery & Installation",
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
    title: "Used Pool Tables Vancouver | Delivery & Installation",
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
