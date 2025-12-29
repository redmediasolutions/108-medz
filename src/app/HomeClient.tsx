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
    fetchProducts(null); // ✅ load ALL products
  }, []);

  const fetchProducts = async (categoryId: number | null) => {
    try {
      setLoading(true);
      setActiveCategory(categoryId); // ✅ VERY IMPORTANT

      const url = categoryId
        ? `/api/products?category=${categoryId}`
        : `/api/products`;

      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
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