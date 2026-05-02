export type ProjectDetail = {
  slug: string;
  label: string;
  title: string;
  subtitle: string;
  heroImage: string;
  solutionImage: string;
  painPoints: string[];
  solutions: string[];
  scopeOfWork: string[];
  process: string[];
  deliverables: string[];
  kpis: string[];
  recommendedPackage: {
    title: string;
    description: string;
  };
};

export const projects: ProjectDetail[] = [
  {
    slug: "sme-online-seller",
    label: "SME / Online Seller",
    title: "ตรวจนับคลังสินค้าออนไลน์",
    subtitle: "เหมาะกับร้านออนไลน์, Shopee/Lazada, คลังเล็ก",
    heroImage: "/images/projects/sme.svg",
    solutionImage: "/images/projects/sme-solution.svg",
    painPoints: [
      "ยอดใน Excel ไม่ตรงกับของจริง",
      "สินค้าหาย / หาไม่เจอ",
      "ไม่มีระบบตรวจนับที่ใช้งานง่าย",
    ],
    solutions: [
      "ใช้ Excel เดิมเป็นฐานข้อมูล",
      "ใช้มือถือหรือ barcode scanner ตรวจนับ",
      "ออกรายงาน stock diff ทันที",
    ],
    scopeOfWork: [
      "เตรียมไฟล์สินค้าและ layout พื้นที่จัดเก็บ",
      "ตรวจนับสินค้าแยกตาม location หรือชั้นวาง",
      "สรุปรายการขาด เกิน และไม่พบนับ",
    ],
    process: [
      "รับไฟล์ Excel ตั้งต้น",
      "กำหนดพื้นที่ตรวจนับ",
      "สแกนบาร์โค้ดและบันทึกจำนวน",
      "ตรวจซ้ำรายการที่ต่างมาก",
      "ส่งรายงานสรุปพร้อมไฟล์ Excel",
    ],
    deliverables: [
      "Stocktake Report",
      "Diff Report",
      "No Count Report",
      "Summary Dashboard",
    ],
    kpis: [
      "ลดเวลารวมยอดหลังตรวจนับ",
      "เห็นรายการที่หายหรือหาไม่เจอทันที",
      "ใช้ข้อมูลเพื่อปรับยอดคลังและสั่งซื้อรอบถัดไป",
    ],
    recommendedPackage: {
      title: "Software Only หรือ Pro Mobile Kit",
      description:
        "เริ่มจากแอปตรวจนับบนมือถือ และเพิ่ม Bluetooth barcode scanner เมื่อต้องการความเร็วสูงขึ้น",
    },
  },
  {
    slug: "restaurant-cafe",
    label: "Restaurant / Cafe",
    title: "ตรวจวัตถุดิบและของเสีย",
    subtitle: "เหมาะกับร้านอาหาร คาเฟ่ วัตถุดิบ ของหมดอายุ",
    heroImage: "/images/projects/restaurant.svg",
    solutionImage: "/images/projects/restaurant-solution.svg",
    painPoints: [
      "วัตถุดิบสูญหาย",
      "ของหมดอายุ",
      "ต้นทุนอาหารคุมยาก",
    ],
    solutions: [
      "ตรวจนับรอบสั้น รายสัปดาห์/รายเดือน",
      "แยกของเสีย ของหมดอายุ ของขาดเกิน",
      "รายงานต้นทุนจม",
    ],
    scopeOfWork: [
      "ตรวจนับวัตถุดิบ สินค้าสิ้นเปลือง และของพร้อมขาย",
      "แยก location เช่น ครัว ห้องเย็น หน้าร้าน และสาขา",
      "สรุปของเสีย ของหมดอายุ และยอดที่ต้องตรวจซ้ำ",
    ],
    process: [
      "จัดกลุ่มวัตถุดิบตามประเภท",
      "กำหนดรอบตรวจนับรายสัปดาห์หรือรายเดือน",
      "บันทึกยอดจริงและสถานะสินค้า",
      "แยก waste / expiry / variance",
      "ส่ง monthly summary ให้เจ้าของกิจการ",
    ],
    deliverables: [
      "Ingredient Count Report",
      "Waste Report",
      "Expiry Report",
      "Monthly Variance Summary",
    ],
    kpis: [
      "ลดของเสียและของหมดอายุ",
      "เห็นต้นทุนจมเป็นตัวเลข",
      "ควบคุมการเบิกใช้วัตถุดิบรายสาขาได้ดีขึ้น",
    ],
    recommendedPackage: {
      title: "Software Only + Monthly Check",
      description:
        "เหมาะกับการตรวจรอบสั้น ใช้มือถือสแกนหรือกรอกจำนวน แล้วสรุปผลเป็นรายเดือน",
    },
  },
  {
    slug: "factory-warehouse",
    label: "Factory / Warehouse",
    title: "ตรวจนับเพื่อปิดงบและควบคุมการผลิต",
    subtitle: "เหมาะกับคลังใหญ่ โรงงาน ปิดงบ ตรวจ audit",
    heroImage: "/images/projects/warehouse.svg",
    solutionImage: "/images/projects/warehouse-solution.svg",
    painPoints: [
      "ปิดงบล่าช้า",
      "Stock card ไม่ตรง",
      "Lot / Batch / Serial คุมยาก",
    ],
    solutions: [
      "ตรวจนับด้วย barcode",
      "รองรับ Location, Lot, Batch, Expiry, Serial",
      "มี report สำหรับ audit และ finance",
    ],
    scopeOfWork: [
      "ตรวจนับวัตถุดิบ สินค้าระหว่างผลิต และสินค้าสำเร็จรูป",
      "แยกพื้นที่ตาม warehouse, zone, rack และ bin",
      "รองรับข้อมูลเพิ่มเติมสำหรับ QR customize เมื่อจำเป็น",
    ],
    process: [
      "วางแผน cut-off และพื้นที่ตรวจนับ",
      "เตรียม master file และ mapping column",
      "สแกนตรวจนับตาม location",
      "reconcile กับ stock card หรือ ERP export",
      "ออก audit sign-off report",
    ],
    deliverables: [
      "Location Report",
      "Lot / Batch Report",
      "Variance Report",
      "Audit Sign-off Report",
    ],
    kpis: [
      "ลดความเสี่ยงตัวเลขปิดงบผิด",
      "ตรวจสอบย้อนหลังตาม location และ lot ได้",
      "ช่วย finance และ auditor ใช้ข้อมูลต่อได้ง่าย",
    ],
    recommendedPackage: {
      title: "Managed Audit",
      description:
        "เหมาะกับงานใหญ่ที่ต้องมี supervisor, hardware kit, workflow ตรวจซ้ำ และรายงานเพื่อปิดงบ",
    },
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

