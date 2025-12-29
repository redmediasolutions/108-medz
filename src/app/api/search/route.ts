import { NextResponse } from "next/server";
import { wcFetch } from "@/src/lib/woocommerce";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q || q.length < 2) {
    return NextResponse.json([]);
  }

  try {
    const products = await wcFetch(
      `/products?search=${encodeURIComponent(q)}&status=publish&per_page=6`
    );

    return NextResponse.json(products);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}