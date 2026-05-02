import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import { getSolutions } from "@/lib/cms";
import { projectDetails } from "@/lib/project-details";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "โซลูชัน",
  description:
    "โซลูชันตรวจนับสต๊อกสำหรับ SME ร้านอาหาร โรงงาน คลังสินค้า และ Hypermarket ที่ต้องการรายงานขาดเกินพร้อมใช้",
};

export default async function ProjectsPage() {
  const solutions = await getSolutions();

  return (
    <main>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeader
            eyebrow="Solutions"
            title="โซลูชันตามตลาดที่มี pain point ชัดเจน"
            description="ไม่จำเป็นต้องเริ่มจากทั้งองค์กร เราสามารถเริ่มจากคลังเล็ก ร้านหลายสาขา หรือโซนสินค้ามูลค่าสูง แล้วค่อยขยายเมื่อเห็นผลจริง"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {solutions.slice(0, 3).map((solution, index) => {
              const slug = projectDetails[index]?.slug ?? "sme-online-seller";

              return (
                <Link
                  key={solution.id ?? solution.title}
                  href={`/projects/${slug}`}
                  className="group block transition hover:-translate-y-1"
                >
                  <Card
                    title={solution.title}
                    description={solution.description}
                    label={solution.label}
                  />
                  <p className="mt-3 text-sm font-black text-neutral-950">
                    ดูรายละเอียดโซลูชัน
                    <span className="ml-2 inline-block transition group-hover:translate-x-1">→</span>
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
