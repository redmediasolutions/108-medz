import { db } from "@/src/lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { Product } from "@/src/data/product";
import { Category } from "@/src/data/category";

/* ---------------- PRODUCTS ---------------- */

export const getProducts = async (
  categoryId: number | null
): Promise<Product[]> => {
  try {
    const ref = collection(db, "products");

    const q = categoryId
      ? query(ref, where("categoryId", "==", categoryId))
      : query(ref);

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id, // ✅ KEEP STRING (safe)
        name: data.name || "",
        slug: data.slug || "",
        price: data.price || 0,
        images: data.images || [],
        meta_data: data.meta_data || [],
        categoryId: data.categoryId || null,
      } as Product;
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
};

/* ---------------- CATEGORIES ---------------- */

export const getCategories = async (): Promise<Category[]> => {
  try {
    const ref = collection(db, "Homecategories");

    const q = query(ref, orderBy("order"));

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => {
      const d = doc.data();

      return {
        id: doc.id || 0, // ✅ safe fallback
        title1: d.categoryTitle1 || "",
        title2: d.categoryTitle2 || "",
        icon: d.categoryIcon || "/images/categories/default.png",
        background: d.backgroundImage || "",
        order: d.order || 0,
      } as Category;
    });
  } catch (err) {
    console.error("Error fetching categories:", err);
    return [];
  }
};