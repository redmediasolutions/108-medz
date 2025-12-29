console.log("ENV CHECK:", {
  store: process.env.WC_STORE_URL,
  key: process.env.WC_CONSUMER_KEY?.slice(0, 5),
});

import { NextResponse } from "next/server";
import {
  getProducts,
  getProductsByCategory,
} from "@/src/lib/woocommerce";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  try {
    const products = category
      ? await getProductsByCategory(Number(category))
      : await getProducts();

    return Response.json(products ?? []);
  } catch (error) {
    console.error("API products error:", error);
    return NextResponse.json([], { status: 500 });
  }
}