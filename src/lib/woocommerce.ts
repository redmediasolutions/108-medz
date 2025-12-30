export const runtime = "nodejs";

const STORE_URL =
  process.env.WC_STORE_URL ||
  process.env.NEXT_PUBLIC_WC_STORE_URL;

if (!STORE_URL) {
  console.error("❌ WC_STORE_URL is missing");
}

const BASE_URL = `${STORE_URL}/wp-json/wc/v3`;

const auth = Buffer.from(
  `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
).toString("base64");

export async function wcFetch(endpoint: string) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("WooCommerce API error:", text);
    throw new Error("Woo API failed");
  }

  return res.json();
}

/* PRODUCTS */
export async function getProducts() {
  return wcFetch("/products?status=publish&per_page=20");
}

export async function getProductsByCategory(categoryId: number) {
  return wcFetch(
    `/products?category=${categoryId}&status=publish&per_page=20`
  );
}

export async function getProductBySlug(slug: string) {
  const products = await wcFetch(
    `/products?slug=${encodeURIComponent(slug)}&status=publish&per_page=1`
  );
  return products[0] ?? null;
}

export async function searchProducts(query: string) {
  return wcFetch(
    `/products?search=${encodeURIComponent(query)}&status=publish&per_page=20`
  );
}

export async function getRelatedProductsByCategory(
  categoryId: number,
  excludeId: number
) {
  return wcFetch(
    `/products?category=${categoryId}&exclude=${excludeId}&status=publish&per_page=4`
  );
}