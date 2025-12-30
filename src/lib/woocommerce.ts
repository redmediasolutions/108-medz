export const runtime = "nodejs";

import { Buffer } from "buffer";

const STORE_URL = process.env.WC_STORE_URL;
const KEY = process.env.WC_CONSUMER_KEY;
const SECRET = process.env.WC_CONSUMER_SECRET;


console.log("STORE_URL:", STORE_URL);
console.log("KEY:", KEY ? "defined" : "undefined");
console.log("SECRET:", SECRET ? "defined" : "undefined");

if (!STORE_URL || !KEY || !SECRET) {

  throw new Error("WooCommerce environment variables missing");

}

const BASE_URL = `${STORE_URL}/wp-json/wc/v3`;

const auth = Buffer.from(`${KEY}:${SECRET}`).toString("base64");

export async function wcFetch(endpoint: string) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Woo API error:", text);
    throw new Error("Woo API failed");
  }

  return res.json();
}

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

export async function getRelatedProductsByCategory(
  categoryId: number,
  excludeId: number
) {
  return wcFetch(
    `/products?category=${categoryId}&exclude=${excludeId}&status=publish&per_page=4`
  );
}