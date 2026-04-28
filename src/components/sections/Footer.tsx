import Link from "next/link";

const menuLinks = [
  { label: "Shop", href: "/products" },
  { label: "Pool Tables", href: "/products/pool-tables" },
  { label: "Ping Pong Tables", href: "/products/ping-pong" },
  { label: "Foosball Tables", href: "/products/foosball" },
  { label: "Sell Your Table", href: "/contact" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const serviceAreas = [
  "Vancouver",
  "West Vancouver",
  "North Vancouver",
  "Richmond",
  "Burnaby",
  "Coquitlam",
  "Surrey",
  "Langley & more",
];

const contactLinks = [
  { label: "604-779-4196", href: "tel:6047794196" },
  { label: "info@usedpooltables.ca", href: "mailto:info@usedpooltables.ca" },
  { label: "@usedpooltables", href: "https://instagram.com/usedpooltables" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/8 bg-[#081a2a] text-[#f6efe4]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-4">
          <div className="max-w-sm">
            <h2 className="text-3xl leading-[1] [font-family:Georgia,Times,'Times_New_Roman',serif]">
              Used Billiard Store
            </h2>
            <p className="mt-5 text-base leading-8 text-white/72">
              Quality used pool tables, ping pong tables, and game room pieces
              delivered across Metro Vancouver.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium uppercase tracking-[0.26em] text-[#d5a85c]">
              Menu
            </h3>
            <ul className="mt-5 space-y-3">
              {menuLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-base text-white/78 transition hover:text-[#f1c269]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium uppercase tracking-[0.26em] text-[#d5a85c]">
              Service Area
            </h3>
            <ul className="mt-5 space-y-3 text-base text-white/78">
              {serviceAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium uppercase tracking-[0.26em] text-[#d5a85c]">
              Contact
            </h3>
            <ul className="mt-5 space-y-3">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-base text-white/78 transition hover:text-[#f1c269]"
                    target={link.href.startsWith("https://") ? "_blank" : undefined}
                    rel={link.href.startsWith("https://") ? "noreferrer" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/52 md:flex-row md:items-center md:justify-between">
          <p>&copy; {currentYear} Used Billiard Store. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <span>Privacy Policy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
