import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Used Pool Tables Vancouver at 604-779-4196 or visit 1644 Marine Drive SE, Vancouver, BC V5P 2R6.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Used Pool Tables Vancouver",
    description:
      "Call 604-779-4196 or visit our Vancouver location to ask about current inventory.",
    url: "/contact",
  },
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
