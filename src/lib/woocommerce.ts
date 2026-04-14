export const runtime = "nodejs";

import { Buffer } from "buffer";

/* ---------------- HARDCODED CONFIG ---------------- */
const STORE_URL = "https://janmanstore.in"; // ✅ replace if needed
const KEY = "ck_20dddbb2407a8b54a64567c74ad5aaafbb15d8b2"; // 🔐 your consumer key
const SECRET = "cs_4c695f1145f9bdfa5ef22e05b708740bced7821f"; // 🔐 your secret

const BASE_URL = `${STORE_URL}/wp-json/wc/v3`;
const auth = Buffer.from(`${KEY}:${SECRET}`).toString("base64");

/* ---------------- FETCH WRAPPER ---------------- */
export async function wcFetch(endpoint: string) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("❌ Woo API error:", text);

      return []; // ✅ prevent crashes
    }

    return res.json();
  } catch (error) {
    console.error("❌ wcFetch error:", error);

    return []; // ✅ prevent crashes
  }
}

/* ---------------- APIs ---------------- */

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

  return products?.[0] ?? null;
}

export async function searchProducts(query: string) {
  return wcFetch(
    `/products?search=${encodeURIComponent(query)}&status=publish&per_page=20`
  );
}

export async function getCategories() {
  return wcFetch("/products/categories?per_page=50");
}

export async function getRelatedProductsByCategory(
  categoryId: number,
  excludeId: number
) {
  return wcFetch(
    `/products?category=${categoryId}&exclude=${excludeId}&status=publish&per_page=4`
  );
}