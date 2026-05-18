"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/products", label: "Products" },
  { href: "/sales", label: "Sales" },
  { href: "/inquiries", label: "Inquiries" },
  { href: "/users", label: "Users" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/login");
    router.refresh();
  };

  return (
    <aside className="admin-sidebar">
      <p className="admin-eyebrow">Admin Panel</p>
      <h1 className="admin-brand">Used Billiard Store</h1>

      <nav className="admin-nav">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-link ${isActive ? "is-active" : ""}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        className="admin-nav-link"
        style={{ marginTop: 24, width: "100%", textAlign: "left" }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </aside>
  );
}
