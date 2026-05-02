import Link from "next/link";

const menu = [
  { label: "Dashboard", href: "/admin" },
  { label: "Homepage", href: "/admin/homepage" },
  { label: "เกี่ยวกับเรา", href: "/admin/about" },
  { label: "Services", href: "/admin/services" },
  { label: "Solution", href: "/admin/solution" },
  { label: "Solution Details", href: "/admin/project-details" },
  { label: "Software", href: "/admin/software" },
  { label: "Hardware", href: "/admin/hardware" },
  { label: "Pricing", href: "/admin/pricing" },
  { label: "ผลงานที่ผ่านมา", href: "/admin/reference" },
  { label: "Customer Logos", href: "/admin/customer-logos" },
  { label: "Contact", href: "/admin/contact" },
  { label: "Media Library", href: "/admin/media" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-950">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-neutral-200 bg-neutral-950 p-6 text-white lg:block">
        <p className="text-xl font-black">StockTake CMS</p>
        <nav className="mt-8 grid gap-2">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-bold text-neutral-200 hover:bg-white/10"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <form action="/api/admin/logout" method="post" className="mt-8">
          <button className="rounded-md bg-yellow-400 px-4 py-2 text-sm font-black text-neutral-950">
            Logout
          </button>
        </form>
      </aside>
      <div className="lg:pl-64">
        <header className="border-b border-neutral-200 bg-white px-6 py-4 lg:hidden">
          <p className="text-lg font-black">StockTake CMS</p>
          <nav className="mt-3 flex flex-wrap gap-2">
            {menu.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-bold text-blue-700">
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
