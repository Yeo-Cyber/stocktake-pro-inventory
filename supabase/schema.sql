create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  password_hash text not null,
  created_at timestamptz not null default now()
);

create or replace function public.verify_admin_login(
  input_username text,
  input_password text
)
returns boolean
language sql
security definer
set search_path = public, extensions
as $$
  select exists (
    select 1
    from public.admin_users
    where username = input_username
      and password_hash = extensions.crypt(input_password, password_hash)
  );
$$;

create table if not exists public.content_blocks (
  key text primary key,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.collection_items (
  id uuid primary key default gen_random_uuid(),
  section text not null,
  data jsonb not null default '{}'::jsonb,
  sort_order integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists collection_items_section_idx
on public.collection_items(section, sort_order);

create table if not exists public.navigation_items (
  id uuid primary key default gen_random_uuid(),
  data jsonb not null default '{}'::jsonb,
  sort_order integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.media_files (
  id uuid primary key default gen_random_uuid(),
  bucket text not null default 'cms-media',
  path text not null,
  url text not null,
  alt_text text,
  mime_type text,
  size_bytes bigint,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
alter table public.content_blocks enable row level security;
alter table public.collection_items enable row level security;
alter table public.navigation_items enable row level security;
alter table public.media_files enable row level security;

drop policy if exists "Public read content blocks" on public.content_blocks;
create policy "Public read content blocks"
on public.content_blocks for select
using (true);

drop policy if exists "Public read collection items" on public.collection_items;
create policy "Public read collection items"
on public.collection_items for select
using (true);

drop policy if exists "Public read navigation items" on public.navigation_items;
create policy "Public read navigation items"
on public.navigation_items for select
using (true);

drop policy if exists "Public read media files" on public.media_files;
create policy "Public read media files"
on public.media_files for select
using (true);

insert into storage.buckets (id, name, public)
values ('cms-media', 'cms-media', true)
on conflict (id) do update set public = true;

drop policy if exists "Public read cms media" on storage.objects;
create policy "Public read cms media"
on storage.objects for select
using (bucket_id = 'cms-media');

-- Change this password after first login.
insert into public.admin_users (username, password_hash)
values ('admin', extensions.crypt('ChangeMe123!', extensions.gen_salt('bf')))
on conflict (username) do nothing;

insert into public.content_blocks (key, data)
values
(
  'homepage',
  '{
    "eyebrow": "Inventory Audit Service + Software + Hardware",
    "hero_title": "ตรวจนับสต๊อกให้รู้ยอดจริง โดยเริ่มจาก Excel ที่คุณมีอยู่แล้ว",
    "hero_subtitle": "บริการตรวจนับสินค้า ซอฟต์แวร์สแกนบาร์โค้ดแบบไม่ต้องมี database และชุดอุปกรณ์ที่เปลี่ยนมือถือให้เป็นเครื่องตรวจนับสต๊อก สำหรับ SME โรงงาน คลังสินค้า และงานระดับ Hypermarket",
    "primary_cta_text": "ขอคำปรึกษาฟรี",
    "primary_cta_href": "/contact",
    "secondary_cta_text": "ดูแพ็กเกจบริการ",
    "secondary_cta_href": "/services",
    "banner_image": "/stocktake-dashboard.svg",
    "logo_url": ""
  }'::jsonb
),
(
  'about',
  '{
    "eyebrow": "About StockTake Pro",
    "title": "เราไม่ได้ขายแค่การนับของ แต่ขายตัวเลขที่เจ้าของธุรกิจเชื่อถือได้",
    "description": "ธุรกิจจำนวนมากมียอดในระบบ แต่ไม่รู้ว่าสินค้าจริงอยู่ตรงไหน ขาดเท่าไหร่ หรือเงินจมอยู่กับสินค้าอะไร StockTake Pro จึงออกแบบบริการและซอฟต์แวร์ให้ตอบคำถามสำคัญที่สุด: มีเท่าไหร่ นับได้เท่าไหร่ ขาดเกินเท่าไหร่ และสินค้าอยู่ที่ไหน",
    "model_label": "Business Model",
    "model_title": "Hybrid: Service + Software + Hardware",
    "model_description": "ลูกค้ารายเล็กใช้แอปและมือถือสแกนเองได้ ลูกค้าที่มีงานหนักซื้อ Pro Mobile Kit เพิ่มได้ และลูกค้าระดับโรงงานหรือ hypermarket ใช้บริการทีมคุมงานพร้อมอุปกรณ์เช่าได้ในโมเดลเดียวกัน",
    "value_1_title": "นับจากของจริง",
    "value_1_description": "ใช้แนวคิด Blind Count ลดการนับให้ตรงตัวเลขเดิม และช่วยให้เจ้าของเห็นความจริงของสต๊อก",
    "value_2_title": "เริ่มจากระบบเดิม",
    "value_2_description": "ไม่บังคับเปลี่ยน ERP หรือสร้าง database ใหม่ ลูกค้าเริ่มได้จาก Excel ที่มีอยู่แล้ว",
    "value_3_title": "ต่อยอดเป็นระบบใหญ่",
    "value_3_description": "เริ่มจากมือถือเครื่องเดียว แล้วขยายเป็น hardware kit, supervisor และ local sync สำหรับงานใหญ่ได้"
  }'::jsonb
),
(
  'contact',
  '{
    "email": "sales@stocktakepro.example",
    "phone": "02-014-0128",
    "service_area": "กรุงเทพฯ ปริมณฑล และงานโครงการทั่วประเทศ",
    "address": "กรุงเทพฯ และให้บริการทั่วประเทศ"
  }'::jsonb
)
on conflict (key) do nothing;

insert into public.navigation_items (data, sort_order)
values
('{ "label": "หน้าแรก", "href": "/" }'::jsonb, 1),
('{ "label": "เกี่ยวกับเรา", "href": "/about" }'::jsonb, 2),
('{ "label": "บริการ", "href": "/services" }'::jsonb, 3),
('{ "label": "โซลูชัน", "href": "/projects" }'::jsonb, 4),
('{ "label": "ผลงานที่ผ่านมา", "href": "/reference" }'::jsonb, 5),
('{ "label": "ติดต่อเรา", "href": "/contact" }'::jsonb, 6);

insert into public.collection_items (section, data, sort_order)
values
('services', '{"label":"Service","title":"รับจ้างตรวจนับสต๊อกสินค้า","description":"ทีมงานเข้าหน้างาน ตรวจนับแบบ Blind Count เทียบยอดกับไฟล์ตั้งต้น และส่งรายงานผลต่างที่ตรวจสอบย้อนหลังได้","image_url":""}'::jsonb, 1),
('services', '{"label":"Software","title":"แอปตรวจนับจากไฟล์ Excel","description":"นำเข้า Excel สแกนบาร์โค้ด ใส่จำนวน ระบุตำแหน่ง และ export รายงานโดยไม่ต้องเก็บข้อมูลบน cloud","image_url":""}'::jsonb, 2),
('services', '{"label":"Hardware","title":"Mobile Scanner Kit","description":"เปลี่ยนมือถือเป็นเครื่องตรวจนับด้วย Bluetooth barcode scanner, ring scanner หรือ handheld ที่เหมาะกับงานหนัก","image_url":""}'::jsonb, 3),
('solution', '{"label":"SME / Online Seller","title":"ตรวจนับคลังสินค้าออนไลน์","description":"ช่วยเจ้าของกิจการรู้ยอดจริง สินค้าขาดเกิน และตำแหน่งจัดเก็บ โดยเริ่มจากไฟล์ Excel เดิมที่ใช้อยู่","image_url":""}'::jsonb, 1),
('solution', '{"label":"Restaurant / Cafe","title":"ตรวจวัตถุดิบและของเสีย","description":"ตรวจรอบสั้นทุกเดือน เพื่อหาของหาย ของหมดอายุ และต้นทุนจมจากวัตถุดิบที่ควบคุมยาก","image_url":""}'::jsonb, 2),
('solution', '{"label":"Factory / Warehouse","title":"ตรวจนับเพื่อปิดงบและควบคุมการผลิต","description":"รองรับ barcode เป็นหลัก และเปิดทาง customize QR code สำหรับ lot, expiry date หรือ serial number","image_url":""}'::jsonb, 3),
('software', '{"label":"Mobile App","title":"Excel Scan Application","description":"แอปสำหรับนำเข้าไฟล์ Excel ตั้งต้น สแกนบาร์โค้ด ใส่ยอดนับจริง ระบุตำแหน่ง และ export รายงานขาด/เกิน","image_url":"/stocktake-dashboard.svg"}'::jsonb, 1),
('hardware', '{"label":"Scanner","title":"Bluetooth Barcode Scanner","description":"อุปกรณ์สแกนบาร์โค้ดเชื่อมต่อมือถือ เหมาะกับทีมที่ต้องนับหลายพันรายการและต้องการความเร็วสูงกว่ากล้องมือถือ","image_url":"/references/sme-warehouse.svg"}'::jsonb, 1),
('pricing', '{"label":"เริ่มต้น","title":"Software Only","price":"เริ่มต้นประหยัด","description":"ใช้กล้องมือถือสแกน barcode และ export Excel report ได้ทันที","image_url":""}'::jsonb, 1),
('pricing', '{"label":"ยอดนิยม","title":"Pro Mobile Kit","price":"สแกนเร็วขึ้น","description":"แอปพร้อม Bluetooth scanner สำหรับทีมที่ต้องนับหลายพันรายการ","image_url":""}'::jsonb, 2),
('pricing', '{"label":"งานโครงการ","title":"Managed Audit","price":"มีทีมคุมงาน","description":"ส่ง supervisor พร้อมอุปกรณ์และ workflow สำหรับงานตรวจนับจริง","image_url":""}'::jsonb, 3),
('reference', '{"label":"คลังสินค้า SME","title":"ตรวจนับคลังสินค้าออนไลน์ 3,200 SKU","description":"นำไฟล์ Excel ตั้งต้นของลูกค้าเข้า workflow ตรวจนับด้วย barcode และสรุปรายการขาด/เกินสำหรับปรับยอดหลังบ้าน","location":"กรุงเทพฯ","period":"Q1/2026","image_url":"/references/sme-warehouse.svg","results":"นับจบใน 1 วัน\nระบุตำแหน่งสินค้าได้ทุกโซน\nส่งรายงาน Excel พร้อม variance"}'::jsonb, 1),
('reference', '{"label":"โรงงานผลิต","title":"ตรวจนับวัตถุดิบเพื่อปิดงบประจำปี","description":"จัดทีมตรวจนับร่วมกับฝ่ายคลังและฝ่ายบัญชี แยกรายงานตาม location, barcode และยอดผลต่างเพื่อใช้ตรวจสอบภายใน","location":"ชลบุรี","period":"Year-end Audit","image_url":"/references/factory-audit.svg","results":"รองรับหลาย location\nมี audit trail รายการนับ\nพร้อมแนบหลักฐานภาพหน้างาน"}'::jsonb, 2),
('reference', '{"label":"ร้านอาหารหลายสาขา","title":"ตรวจนับวัตถุดิบและสินค้าสิ้นเปลือง","description":"ตรวจนับวัตถุดิบรอบสั้นเพื่อหาของหาย ของหมดอายุ และต้นทุนจม พร้อมรายงานสรุปให้เจ้าของกิจการดูง่าย","location":"นนทบุรี","period":"Monthly Check","image_url":"/references/restaurant-stock.svg","results":"เห็นของขาด/เกินรายสาขา\nลดเวลารวมยอดด้วย Excel report\nเหมาะกับการตรวจซ้ำทุกเดือน"}'::jsonb, 3),
('customer_logos', '{"label":"Customer","title":"SME Warehouse","description":"ลูกค้ากลุ่มคลังสินค้า SME","image_url":"","href":""}'::jsonb, 1),
('customer_logos', '{"label":"Customer","title":"Factory Audit","description":"ลูกค้ากลุ่มโรงงานและคลังวัตถุดิบ","image_url":"","href":""}'::jsonb, 2),
('customer_logos', '{"label":"Customer","title":"Restaurant Chain","description":"ลูกค้ากลุ่มร้านอาหารหลายสาขา","image_url":"","href":""}'::jsonb, 3),
('customer_logos', '{"label":"Customer","title":"Online Seller","description":"ลูกค้ากลุ่มร้านค้าออนไลน์","image_url":"","href":""}'::jsonb, 4),
('project_details', '{"slug":"sme-online-seller","label":"SME / Online Seller","title":"ตรวจนับคลังสินค้าออนไลน์","subtitle":"เหมาะกับร้านออนไลน์, Shopee/Lazada, คลังเล็ก","heroImage":"/images/projects/sme.svg","solutionImage":"/images/projects/sme-solution.svg","painPoints":"ยอดใน Excel ไม่ตรงกับของจริง\nสินค้าหาย / หาไม่เจอ\nไม่มีระบบตรวจนับที่ใช้งานง่าย","solutions":"ใช้ Excel เดิมเป็นฐานข้อมูล\nใช้มือถือหรือ barcode scanner ตรวจนับ\nออกรายงาน stock diff ทันที","scopeOfWork":"เตรียมไฟล์สินค้าและ layout พื้นที่จัดเก็บ\nตรวจนับสินค้าแยกตาม location หรือชั้นวาง\nสรุปรายการขาด เกิน และไม่พบนับ","process":"รับไฟล์ Excel ตั้งต้น\nกำหนดพื้นที่ตรวจนับ\nสแกนบาร์โค้ดและบันทึกจำนวน\nตรวจซ้ำรายการที่ต่างมาก\nส่งรายงานสรุปพร้อมไฟล์ Excel","deliverables":"Stocktake Report\nDiff Report\nNo Count Report\nSummary Dashboard","kpis":"ลดเวลารวมยอดหลังตรวจนับ\nเห็นรายการที่หายหรือหาไม่เจอทันที\nใช้ข้อมูลเพื่อปรับยอดคลังและสั่งซื้อรอบถัดไป","recommended_package_title":"Software Only หรือ Pro Mobile Kit","recommended_package_description":"เริ่มจากแอปตรวจนับบนมือถือ และเพิ่ม Bluetooth barcode scanner เมื่อต้องการความเร็วสูงขึ้น"}'::jsonb, 1),
('project_details', '{"slug":"restaurant-cafe","label":"Restaurant / Cafe","title":"ตรวจวัตถุดิบและของเสีย","subtitle":"เหมาะกับร้านอาหาร คาเฟ่ วัตถุดิบ ของหมดอายุ","heroImage":"/images/projects/restaurant.svg","solutionImage":"/images/projects/restaurant-solution.svg","painPoints":"วัตถุดิบสูญหาย\nของหมดอายุ\nต้นทุนอาหารคุมยาก","solutions":"ตรวจนับรอบสั้น รายสัปดาห์/รายเดือน\nแยกของเสีย ของหมดอายุ ของขาดเกิน\nรายงานต้นทุนจม","scopeOfWork":"ตรวจนับวัตถุดิบ สินค้าสิ้นเปลือง และของพร้อมขาย\nแยก location เช่น ครัว ห้องเย็น หน้าร้าน และสาขา\nสรุปของเสีย ของหมดอายุ และยอดที่ต้องตรวจซ้ำ","process":"จัดกลุ่มวัตถุดิบตามประเภท\nกำหนดรอบตรวจนับรายสัปดาห์หรือรายเดือน\nบันทึกยอดจริงและสถานะสินค้า\nแยก waste / expiry / variance\nส่ง monthly summary ให้เจ้าของกิจการ","deliverables":"Ingredient Count Report\nWaste Report\nExpiry Report\nMonthly Variance Summary","kpis":"ลดของเสียและของหมดอายุ\nเห็นต้นทุนจมเป็นตัวเลข\nควบคุมการเบิกใช้วัตถุดิบรายสาขาได้ดีขึ้น","recommended_package_title":"Software Only + Monthly Check","recommended_package_description":"เหมาะกับการตรวจรอบสั้น ใช้มือถือสแกนหรือกรอกจำนวน แล้วสรุปผลเป็นรายเดือน"}'::jsonb, 2),
('project_details', '{"slug":"factory-warehouse","label":"Factory / Warehouse","title":"ตรวจนับเพื่อปิดงบและควบคุมการผลิต","subtitle":"เหมาะกับคลังใหญ่ โรงงาน ปิดงบ ตรวจ audit","heroImage":"/images/projects/warehouse.svg","solutionImage":"/images/projects/warehouse-solution.svg","painPoints":"ปิดงบล่าช้า\nStock card ไม่ตรง\nLot / Batch / Serial คุมยาก","solutions":"ตรวจนับด้วย barcode\nรองรับ Location, Lot, Batch, Expiry, Serial\nมี report สำหรับ audit และ finance","scopeOfWork":"ตรวจนับวัตถุดิบ สินค้าระหว่างผลิต และสินค้าสำเร็จรูป\nแยกพื้นที่ตาม warehouse, zone, rack และ bin\nรองรับข้อมูลเพิ่มเติมสำหรับ QR customize เมื่อจำเป็น","process":"วางแผน cut-off และพื้นที่ตรวจนับ\nเตรียม master file และ mapping column\nสแกนตรวจนับตาม location\nreconcile กับ stock card หรือ ERP export\nออก audit sign-off report","deliverables":"Location Report\nLot / Batch Report\nVariance Report\nAudit Sign-off Report","kpis":"ลดความเสี่ยงตัวเลขปิดงบผิด\nตรวจสอบย้อนหลังตาม location และ lot ได้\nช่วย finance และ auditor ใช้ข้อมูลต่อได้ง่าย","recommended_package_title":"Managed Audit","recommended_package_description":"เหมาะกับงานใหญ่ที่ต้องมี supervisor, hardware kit, workflow ตรวจซ้ำ และรายงานเพื่อปิดงบ"}'::jsonb, 3);
