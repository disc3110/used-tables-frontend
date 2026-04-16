import "./globals.css";
import Navbar from "@/components/layout/Navbar";

export const metadata = {
  title: "Used Billiard Store",
  description: "Used pool tables, ping pong tables, and foosball tables.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
