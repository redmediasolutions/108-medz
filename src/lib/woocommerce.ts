export const runtime = "nodejs";

import { Buffer } from "buffer";

const STORE_URL = "https://janmanstore.in";
const KEY = "ck_eeab0ea886d3ac1b8da281e6c4f944b7328efe34";
const SECRET = "cs_ff2e1fe49bb29c452b9b19b85d94ce561aa55b19";


console.log("STORE_URL:", STORE_URL);
console.log("KEY:", KEY );
console.log("SECRET:", SECRET );



if (!STORE_URL || !KEY || !SECRET) {

  throw new Error("WooCommerce environment variables missing");

}

const BASE_URL = `${STORE_URL}/wp-json/wc/v3`;

const auth = Buffer.from(`${KEY}:${SECRET}`).toString("base64");

fetch(`${BASE_URL}/products?status=publish&per_page=5`, {
  headers: {
    Authorization: "Basic " + auth
  },
  cache: "no-store"
}).then((response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}).then((data) => {
  console.error("Data received: ", data);
}).catch((error) => {
  console.error("Found the error: ", error);
});

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
      console.error("Woo API error:", text);
      throw new Error("Woo API failed");
    }

    return res.json();
  } catch (error) {
    console.error("wcFetch error:", error);
    throw error;
  }
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