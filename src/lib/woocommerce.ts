export const runtime = "nodejs";

const BASE_URL = `${process.env.WC_STORE_URL}/wp-json/wc/v3`;

const auth = Buffer.from(
  `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
).toString("base64");

async function wcFetch(endpoint: string) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("WooCommerce API error:", text);
    return null;
  }

  return res.json();
}

// 🔹 Fetch all products
export async function getProducts() {
  return wcFetch("/products?status=publish&per_page=20");
}

// 🔹 Fetch single product by slug
export async function getProductBySlug(slug: string) {
  const products = await wcFetch(
    `/products?slug=${encodeURIComponent(slug)}&status=publish&per_page=1`
  );

  if (!Array.isArray(products) || products.length === 0) {
    return null;
  }

  return products[0];
}

// 🔹 Fetch products by category
export async function getProductsByCategory(categoryId: number) {
  return wcFetch(
    `/products?category=${categoryId}&status=publish&per_page=20`
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