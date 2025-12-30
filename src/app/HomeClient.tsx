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
    fetchProducts(); // ✅ load ALL products initially
  }, []);

  // 🔥 TEMP: categoryId intentionally ignored
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setActiveCategory(null); // ✅ reset category highlight

      const res = await fetch("/api/products");
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
        onSelect={fetchProducts} // 👈 clicks still work visually
      />

      <Products products={products} loading={loading} />
    </>
  );
}