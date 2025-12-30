export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { wcFetch } from "@/src/lib/woocommerce";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const categoryParam = searchParams.get("category");

  try {
    let endpoint = "/products?status=publish&per_page=20";

    if (categoryParam) {
      const ids = categoryParam.split(",");

      const categoryQuery = ids
        .map((id) => `category=${id}`)
        .join("&");

      endpoint += `&${categoryQuery}`;
    }

    const products = await wcFetch(endpoint);

    return NextResponse.json(products ?? []);
  } catch (e) {
    console.error("Products API error", e);
    return NextResponse.json([], { status: 500 });
  }
}