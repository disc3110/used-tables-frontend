export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="min-h-screen px-6 pt-18 pb-16">{children}</main>;
}
