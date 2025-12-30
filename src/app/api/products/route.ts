export const runtime = "nodejs";

import { NextResponse } from "next/server";
import {
  getProducts,
  getProductsByCategory,
} from "@/src/lib/woocommerce";

export async function GET(request: Request) {
  try {
    // ✅ ENV CHECK (safe)
    if (!process.env.WC_STORE_URL) {
      console.error("WC_STORE_URL missing");
      return NextResponse.json([]);
    }

    const { searchParams } = new URL(request.url);
    const categoryParam = searchParams.get("category");

    let products;

    if (categoryParam) {
      const categoryId = Number(categoryParam);

      // ✅ Guard invalid category
      if (Number.isNaN(categoryId)) {
        return NextResponse.json([]);
      }

      products = await getProductsByCategory(categoryId);
    } else {
      products = await getProducts();
    }

    // ✅ Always return 200
    return NextResponse.json(products ?? []);
  } catch (error) {
    console.error("API products error:", error);
    return NextResponse.json([]); // ❌ no 500
  }
}