export const siteConfig = {
  name: "StockTake Pro",
  url: "https://inventory-audit-website.vercel.app",
  description:
    "StockTake Pro ให้บริการตรวจนับสต๊อกสินค้า จำหน่ายซอฟต์แวร์ตรวจนับผ่าน Excel และอุปกรณ์สแกนบาร์โค้ดสำหรับ SME โรงงาน คลังสินค้า และ Hypermarket",
};

export const navItems = [
  { label: "หน้าแรก", href: "/" },
  { label: "เกี่ยวกับเรา", href: "/about" },
  { label: "บริการ", href: "/services" },
  { label: "โซลูชัน", href: "/projects" },
  { label: "ติดต่อเรา", href: "/contact" },
];

export const metrics = [
  { value: "Excel", label: "ใช้ไฟล์ตั้งต้นของลูกค้า ไม่ต้องมี database กลาง" },
  { value: "Offline", label: "สแกนและตรวจนับได้แม้ไม่มีอินเทอร์เน็ต" },
  { value: "Report", label: "รู้ทันทีว่ามีเท่าไหร่ นับได้เท่าไหร่ ขาดเกินเท่าไหร่" },
];

export const services = [
  {
    label: "Service",
    title: "รับจ้างตรวจนับสต๊อกสินค้า",
    description:
      "ทีมงานเข้าหน้างาน ตรวจนับแบบ Blind Count เทียบยอดกับไฟล์ตั้งต้น และส่งรายงานผลต่างที่ตรวจสอบย้อนหลังได้",
  },
  {
    label: "Software",
    title: "แอปตรวจนับจากไฟล์ Excel",
    description:
      "นำเข้า Excel สแกนบาร์โค้ด ใส่จำนวน ระบุตำแหน่ง และ export รายงานโดยไม่ต้องเก็บข้อมูลบน cloud",
  },
  {
    label: "Hardware",
    title: "Mobile Scanner Kit",
    description:
      "เปลี่ยนมือถือเป็นเครื่องตรวจนับด้วย Bluetooth barcode scanner, ring scanner หรือ handheld ที่เหมาะกับงานหนัก",
  },
  {
    label: "Enterprise",
    title: "Hybrid Audit สำหรับคลังขนาดใหญ่",
    description:
      "รองรับทีมหลายคน การรวมไฟล์ การเช่าอุปกรณ์ และ supervisor คุมงานสำหรับโรงงานหรือ hypermarket",
  },
];

export const projects = [
  {
    industry: "SME / Online Seller",
    title: "ตรวจนับคลังสินค้าออนไลน์",
    description:
      "ช่วยเจ้าของกิจการรู้ยอดจริง สินค้าขาดเกิน และตำแหน่งจัดเก็บ โดยเริ่มจากไฟล์ Excel เดิมที่ใช้อยู่",
  },
  {
    industry: "Restaurant / Cafe",
    title: "ตรวจวัตถุดิบและของเสีย",
    description:
      "ตรวจรอบสั้นทุกเดือน เพื่อหาของหาย ของหมดอายุ และต้นทุนจมจากวัตถุดิบที่ควบคุมยาก",
  },
  {
    industry: "Factory / Warehouse",
    title: "ตรวจนับเพื่อปิดงบและควบคุมการผลิต",
    description:
      "รองรับ barcode เป็นหลัก และเปิดทาง customize QR code สำหรับ lot, expiry date หรือ serial number",
  },
];

export const productKits = [
  {
    name: "Software Only",
    price: "เริ่มต้นประหยัด",
    detail: "ใช้กล้องมือถือสแกน barcode และ export Excel report ได้ทันที",
  },
  {
    name: "Pro Mobile Kit",
    price: "สแกนเร็วขึ้น",
    detail: "แอปพร้อม Bluetooth scanner สำหรับทีมที่ต้องนับหลายพันรายการ",
  },
  {
    name: "Managed Audit",
    price: "มีทีมคุมงาน",
    detail: "ส่ง supervisor พร้อมอุปกรณ์และ workflow สำหรับงานตรวจนับจริง",
  },
];
