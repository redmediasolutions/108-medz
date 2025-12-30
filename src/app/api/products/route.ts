export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getProducts } from "@/src/lib/woocommerce";

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products ?? []);
  } catch (error) {
    console.error("API /products error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}