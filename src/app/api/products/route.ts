import { NextResponse } from "next/server";
import { getProductsByCategory } from "@/src/lib/woocommerce";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  if (!category) {
    return NextResponse.json([]);
  }

  try {
    const products = await getProductsByCategory(
      Number(category)
    );
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}