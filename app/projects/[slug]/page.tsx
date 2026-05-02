import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeader } from "@/components/SectionHeader";
import { getProjectDetails } from "@/lib/cms";
import { projects } from "@/lib/projects";

export const dynamic = "force-dynamic";

type Params = {
  slug: string;
};

function BulletCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-lg border border-neutral-200 bg-gradient-to-br from-white via-yellow-50/45 to-blue-50/50 p-6 shadow-sm shadow-neutral-200/60">
      <h2 className="text-2xl font-black tracking-tight text-neutral-950">{title}</h2>
      <ul className="mt-5 grid gap-3 text-sm leading-6 text-neutral-700">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 size-2 shrink-0 rounded-full bg-yellow-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const projectDetails = await getProjectDetails();
  const project = projectDetails.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "ไม่พบโซลูชัน",
    };
  }

  return {
    title: project.title,
    description: project.subtitle,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const projectDetails = await getProjectDetails();
  const project = projectDetails.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <Link href="/projects" className="text-sm font-black text-blue-700 hover:text-neutral-950">
            ← กลับไปหน้าโซลูชัน
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">
                {project.label}
              </p>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-neutral-950 lg:text-5xl">
                {project.title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-neutral-700">{project.subtitle}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex rounded-md bg-yellow-400 px-5 py-3 text-sm font-black text-neutral-950 hover:bg-yellow-300"
                >
                  ขอใบเสนอราคา
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex rounded-md border border-neutral-300 px-5 py-3 text-sm font-black text-neutral-950 hover:border-yellow-400"
                >
                  ดูแพ็กเกจ
                </Link>
              </div>
            </div>

            {project.heroImage ? (
              <div className="overflow-hidden rounded-lg border border-neutral-200 bg-gradient-to-br from-white via-yellow-50/45 to-blue-50/50 shadow-xl shadow-neutral-200/70">
                <Image
                  src={project.heroImage}
                  alt={project.title}
                  width={900}
                  height={640}
                  priority
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="rounded-lg border border-neutral-200 bg-gradient-to-br from-white via-yellow-50/45 to-blue-50/50 p-6 shadow-xl shadow-neutral-200/70">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-700">
                  Recommended Package
                </p>
                <h2 className="mt-4 text-3xl font-black tracking-tight text-neutral-950">
                  {project.recommendedPackage.title}
                </h2>
                <p className="mt-5 text-sm leading-7 text-neutral-700">
                  {project.recommendedPackage.description}
                </p>
                <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs font-bold">
                  <span className="rounded-md bg-white px-2 py-2 text-neutral-700 shadow-sm">Excel</span>
                  <span className="rounded-md bg-white px-2 py-2 text-neutral-700 shadow-sm">Barcode</span>
                  <span className="rounded-md bg-white px-2 py-2 text-neutral-700 shadow-sm">Report</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 py-16 lg:grid-cols-2 lg:px-8">
          <BulletCard title="Pain Point" items={project.painPoints} />
          <BulletCard title="Scope of Work" items={project.scopeOfWork} />
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">
              Solution
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-neutral-950 sm:text-4xl">
              แนวทางที่เหมาะกับ {project.label}
            </h2>
            <ul className="mt-6 grid gap-3 text-sm leading-6 text-neutral-700">
              {project.solutions.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-yellow-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          {project.solutionImage ? (
            <div className="order-first overflow-hidden rounded-lg border border-neutral-200 bg-gradient-to-br from-white via-yellow-50/45 to-blue-50/50 shadow-xl shadow-neutral-200/70 lg:order-none">
              <Image
                src={project.solutionImage}
                alt={`${project.title} solution`}
                width={960}
                height={640}
                className="h-full w-full object-cover"
              />
            </div>
          ) : null}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeader
            eyebrow="Process"
            title="ขั้นตอนการทำงาน"
            description="เริ่มจากข้อมูลที่มีอยู่แล้ว วางรอบตรวจนับให้เหมาะกับพื้นที่จริง แล้วส่งรายงานที่ใช้ต่อได้ทันที"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-5">
            {project.process.map((step, index) => (
              <div
                key={step}
                className="rounded-lg border border-neutral-200 bg-gradient-to-br from-white via-yellow-50/45 to-blue-50/50 p-5 shadow-sm shadow-neutral-200/60"
              >
                <span className="grid size-9 place-items-center rounded-md bg-yellow-400 text-sm font-black text-neutral-950">
                  {index + 1}
                </span>
                <p className="mt-4 text-sm font-bold leading-6 text-neutral-800">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 py-16 lg:grid-cols-3 lg:px-8">
          <BulletCard title="Deliverables" items={project.deliverables} />
          <BulletCard title="KPI / Business Benefit" items={project.kpis} />
          <article className="rounded-lg border border-neutral-200 bg-gradient-to-br from-white via-yellow-50/45 to-blue-50/50 p-6 shadow-sm shadow-neutral-200/60">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-700">
              Recommended Package
            </p>
            <h2 className="mt-4 text-2xl font-black tracking-tight text-neutral-950">
              {project.recommendedPackage.title}
            </h2>
            <p className="mt-5 text-sm leading-7 text-neutral-700">
              {project.recommendedPackage.description}
            </p>
          </article>
        </div>
      </section>

      <section className="bg-yellow-400">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-14 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-neutral-950">
              ต้องการใบเสนอราคาสำหรับ {project.label}?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-800">
              ส่งตัวอย่างไฟล์ Excel หรือจำนวน SKU โดยประมาณมาให้เราประเมิน scope, ทีมงาน, อุปกรณ์ และรูปแบบรายงานที่เหมาะสม
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex justify-center rounded-md bg-neutral-950 px-5 py-3 text-sm font-bold text-white hover:bg-neutral-800"
          >
            ขอใบเสนอราคา
          </Link>
        </div>
      </section>
    </main>
  );
}
