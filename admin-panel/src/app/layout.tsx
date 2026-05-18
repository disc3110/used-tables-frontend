import type { Metadata } from "next";
import AdminShell from "@/components/admin/AdminShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Used Billiard Store Admin",
  description: "Admin panel for products, sales, and incoming inquiries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
