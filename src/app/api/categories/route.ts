export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { wcFetch } from "@/src/lib/woocommerce";

export async function GET() {
  try {
    const all = await wcFetch("/products/categories?per_page=100");

    // Only real parent categories
    const parents = all.filter(
      (c: any) =>
        c.parent === 0 &&
        c.count > 0 &&
        !["uncategorized", "admin products"].includes(
          c.slug.toLowerCase()
        )
    );

    const categories = parents
      .map((parent: any) => {
        const children = all.filter(
          (c: any) => c.parent === parent.id && c.count > 0
        );

        if (children.length === 0) return null;

        return {
          id: parent.id,
          name: parent.name,
          children: children.map((c: any) => c.id),
        };
      })
      .filter(Boolean);

    return NextResponse.json(categories);
  } catch (e) {
    console.error("Categories API error", e);
    return NextResponse.json([], { status: 500 });
  }
}