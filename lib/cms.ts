import {
  defaultAbout,
  defaultContact,
  defaultCustomerLogos,
  defaultHardware,
  defaultHomepage,
  defaultMetrics,
  defaultNavigation,
  defaultPricing,
  defaultReferences,
  defaultServices,
  defaultSiteConfig,
  defaultSolutions,
  defaultSoftware,
} from "@/lib/defaults";
import { projects as defaultProjectDetails, type ProjectDetail } from "@/lib/projects";

type JsonObject = Record<string, unknown>;

export type CmsItem = {
  id?: string;
  section?: string;
  label?: string;
  title: string;
  description: string;
  price?: string;
  href?: string;
  image_url?: string;
  customer_logo_url?: string;
  gallery_urls?: string | string[];
  location?: string;
  period?: string;
  results?: string;
  details?: string;
  sort_order?: number;
};

type CmsProjectDetailData = Partial<ProjectDetail> & {
  recommended_package_title?: string;
  recommended_package_description?: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const siteConfig = defaultSiteConfig;

export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && anonKey);
}

export function isSupabaseAdminConfigured() {
  return Boolean(supabaseUrl && serviceKey);
}

export async function supabaseRequest<T>(
  path: string,
  init: RequestInit = {},
  admin = false,
): Promise<T | null> {
  const key = admin ? serviceKey : anonKey;

  if (!supabaseUrl || !key) {
    return null;
  }

  const response = await fetch(`${supabaseUrl}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });

  if (!response.ok) {
    return null;
  }

  if (response.status === 204) {
    return null;
  }

  return (await response.json()) as T;
}

async function getContentBlock<T extends JsonObject>(key: string, fallback: T): Promise<T> {
  const rows = await supabaseRequest<Array<{ data: T }>>(
    `/rest/v1/content_blocks?key=eq.${encodeURIComponent(key)}&select=data&limit=1`,
  );

  return rows?.[0]?.data ? { ...fallback, ...rows[0].data } : fallback;
}

async function getCollection(section: string, fallback: CmsItem[]): Promise<CmsItem[]> {
  const rows = await supabaseRequest<Array<{ id: string; data: CmsItem; sort_order: number }>>(
    `/rest/v1/collection_items?section=eq.${encodeURIComponent(section)}&select=id,data,sort_order&order=sort_order.asc,created_at.asc`,
  );

  if (!rows?.length) {
    return fallback;
  }

  return rows.map((row) => ({
    ...row.data,
    id: row.id,
    section,
    sort_order: row.sort_order,
  }));
}

function listFromCms(value: unknown) {
  if (Array.isArray(value)) {
    return value.map(String).map((item) => item.trim()).filter(Boolean);
  }

  return String(value ?? "")
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeProjectDetail(data: CmsProjectDetailData, fallback: ProjectDetail): ProjectDetail {
  return {
    ...fallback,
    ...data,
    slug: String(data.slug || fallback.slug),
    label: String(data.label || fallback.label),
    title: String(data.title || fallback.title),
    subtitle: String(data.subtitle || fallback.subtitle),
    heroImage: String(data.heroImage || fallback.heroImage || ""),
    solutionImage: String(data.solutionImage || fallback.solutionImage || ""),
    painPoints: listFromCms(data.painPoints ?? fallback.painPoints),
    solutions: listFromCms(data.solutions ?? fallback.solutions),
    scopeOfWork: listFromCms(data.scopeOfWork ?? fallback.scopeOfWork),
    process: listFromCms(data.process ?? fallback.process),
    deliverables: listFromCms(data.deliverables ?? fallback.deliverables),
    kpis: listFromCms(data.kpis ?? fallback.kpis),
    recommendedPackage: {
      title: String(
        data.recommended_package_title ||
          data.recommendedPackage?.title ||
          fallback.recommendedPackage.title,
      ),
      description: String(
        data.recommended_package_description ||
          data.recommendedPackage?.description ||
          fallback.recommendedPackage.description,
      ),
    },
  };
}

export async function getHomepage() {
  return getContentBlock("homepage", defaultHomepage);
}

export async function getAboutInfo() {
  return getContentBlock("about", defaultAbout);
}

export async function getContactInfo() {
  return getContentBlock("contact", defaultContact);
}

export async function getNavigation() {
  const rows = await supabaseRequest<
    Array<{ id: string; data: { label: string; href: string }; sort_order: number }>
  >("/rest/v1/navigation_items?select=id,data,sort_order&order=sort_order.asc");

  if (!rows?.length) {
    return defaultNavigation;
  }

  return rows.map((row) => ({
    ...row.data,
    id: row.id,
    sort_order: row.sort_order,
  }));
}

export async function getServices() {
  return getCollection("services", defaultServices);
}

export async function getSolutions() {
  return getCollection("solution", defaultSolutions);
}

export async function getSoftwareProducts() {
  return getCollection("software", defaultSoftware);
}

export async function getHardwareProducts() {
  return getCollection("hardware", defaultHardware);
}

export async function getPricingPackages() {
  return getCollection("pricing", defaultPricing);
}

export async function getReferenceCases() {
  return getCollection("reference", defaultReferences);
}

export async function getCustomerLogos() {
  return getCollection("customer_logos", defaultCustomerLogos);
}

export async function getProjectDetails() {
  const rows = await supabaseRequest<
    Array<{ id: string; data: CmsProjectDetailData; sort_order: number }>
  >(
    "/rest/v1/collection_items?section=eq.project_details&select=id,data,sort_order&order=sort_order.asc,created_at.asc",
  );

  if (!rows?.length) {
    return defaultProjectDetails;
  }

  return rows.map((row, index) => ({
    ...normalizeProjectDetail(row.data, defaultProjectDetails[index] ?? defaultProjectDetails[0]),
    id: row.id,
    sort_order: row.sort_order,
  }));
}

export { defaultMetrics };
