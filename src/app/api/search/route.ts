export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { searchProducts } from "@/src/lib/woocommerce";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q || q.length < 2) {
    return NextResponse.json([]);
  }

  try {
    const products = await searchProducts(q);
    return NextResponse.json(products ?? []);
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json([], { status: 500 });
  }
}