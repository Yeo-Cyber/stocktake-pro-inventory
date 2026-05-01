import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { referenceCases } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reference",
  description:
    "ตัวอย่าง Reference งานตรวจนับสต๊อกสินค้า พร้อมรูปภาพหน้างาน ผลลัพธ์ และรูปแบบรายงานที่ StockTake Pro เคยให้บริการ",
};

export default function ReferencePage() {
  return (
    <main>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeader
            eyebrow="Reference"
            title="ตัวอย่างงานตรวจนับสต๊อกที่ผ่านมา"
            description="หน้านี้ใช้แสดงผลงานจริง เช่น ประเภทธุรกิจ พื้นที่ตรวจนับ รูปภาพหน้างาน และผลลัพธ์ที่ลูกค้าได้รับ สามารถเปลี่ยนรูป placeholder เป็นรูปถ่ายจริงได้ทันที"
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {referenceCases.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm"
              >
                <div className="relative aspect-[4/3] bg-neutral-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm font-bold text-blue-700">{item.clientType}</p>
                  <h2 className="mt-3 text-2xl font-black tracking-tight text-neutral-950">
                    {item.title}
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-neutral-700">
                    <span className="rounded-md bg-yellow-100 px-3 py-1">{item.location}</span>
                    <span className="rounded-md bg-neutral-100 px-3 py-1">{item.period}</span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-neutral-600">{item.summary}</p>
                  <ul className="mt-5 grid gap-2 text-sm text-neutral-700">
                    {item.results.map((result) => (
                      <li key={result} className="flex gap-2">
                        <span className="mt-2 size-2 rounded-full bg-yellow-400" />
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-yellow-50">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">
                Image Upload Guide
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-neutral-950">
                วิธีใส่รูป Reference
              </h2>
            </div>
            <div className="rounded-lg border border-neutral-200 bg-white p-6 text-sm leading-7 text-neutral-700">
              <p>
                วางไฟล์รูปไว้ในโฟลเดอร์ <strong>public/references</strong> เช่น
                <strong> warehouse-client-a.jpg</strong> แล้วแก้ค่า <strong>image</strong>
                ใน <strong>lib/site.ts</strong> เป็น <strong>/references/warehouse-client-a.jpg</strong>
              </p>
              <p className="mt-4">
                แนะนำให้ใช้ไฟล์ .jpg หรือ .webp ขนาดประมาณ 1200x900 px และหลีกเลี่ยงรูปที่มีข้อมูลลับของลูกค้า เช่น ราคา ต้นทุน เอกสารบัญชี หรือหน้าจอระบบภายใน
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
