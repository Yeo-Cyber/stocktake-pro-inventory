import Link from "next/link";
import { isSupabaseAdminConfigured } from "@/lib/cms";

const cards = [
  { title: "Homepage", href: "/admin/homepage" },
  { title: "เกี่ยวกับเรา", href: "/admin/about" },
  { title: "Services", href: "/admin/services" },
  { title: "Solution", href: "/admin/solution" },
  { title: "Solution Details", href: "/admin/project-details" },
  { title: "Software", href: "/admin/software" },
  { title: "Hardware", href: "/admin/hardware" },
  { title: "Pricing", href: "/admin/pricing" },
  { title: "ผลงานที่ผ่านมา", href: "/admin/reference" },
  { title: "Customer Logos", href: "/admin/customer-logos" },
  { title: "Contact", href: "/admin/contact" },
  { title: "Media Library", href: "/admin/media" },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-black">Dashboard</h1>
      <p className="mt-3 text-sm text-neutral-600">
        Supabase admin env: {isSupabaseAdminConfigured() ? "configured" : "not configured"}
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-lg border border-neutral-200 bg-gradient-to-br from-white via-yellow-50/45 to-blue-50/50 p-6 shadow-sm shadow-neutral-200/60 hover:border-yellow-400"
          >
            <p className="text-xl font-black">{card.title}</p>
            <p className="mt-2 text-sm text-neutral-600">Create, edit, update, and delete content.</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
