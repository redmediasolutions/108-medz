// src/app/api/categories/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { wcFetch } from "@/src/lib/woocommerce";

const HOME_CATEGORIES = [
  { name: "Respiratory", slug: "respiratory-range" },
  { name: "Diabeties", slug: "diabeties" },
  { name: "Cardiology", slug: "cardiology" },
  { name: "Orthopedic", slug: "orthapaedic" },
  { name: "Asthma", slug: "asthama" },
  { name: "Dentist", slug: "dental" },
  { name: "Dermatologist", slug: "dermatology" },
];

export async function GET() {
  try {
    const all = await wcFetch("/products/categories?per_page=100");

    const categories = HOME_CATEGORIES
      .map((cfg) => {
        const cat = all.find(
          (c: any) => c.slug === cfg.slug
        );

        if (!cat) return null;

        return {
          id: cat.id,
          name: cfg.name,
        };
      })
      .filter(Boolean);

    return NextResponse.json(categories);
  } catch (e) {
    console.error("Categories API error", e);
    return NextResponse.json([], { status: 500 });
  }
}