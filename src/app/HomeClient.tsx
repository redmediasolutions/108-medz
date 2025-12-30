"use client";

import { useEffect, useState } from "react";
import HeroSlider from "@/src/components/HeroSlider";
import Categories from "@/src/components/Categories";
import Products from "@/src/components/Products";
import { categories } from "@/src/data/categories";
import { auth } from "@/src/lib/firebase";

export default function HomeClient() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  useEffect(() => {
    console.log("Firebase auth loaded:", auth);
    fetchProducts(null); // ✅ load ALL products initially
  }, []);

  const fetchProducts = async (categoryId: number | null) => {
    try {
      setLoading(true);
      setActiveCategory(categoryId);

      // ⚠️ TEMP: ignore category filtering until Woo categories are mapped
      const url = `/api/products`;

      const res = await fetch(url);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch products", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeroSlider />

      <Categories
        categories={categories}
        activeCategory={activeCategory}
        onSelect={fetchProducts}
      />

      <Products products={products} loading={loading} />
    </>
  );
}