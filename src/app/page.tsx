"use client";

import { useEffect, useState } from "react";
import HeroSlider from "@/src/components/HeroSlider";
import Categories from "@/src/components/Categories";
import Products from "@/src/components/Products";
import { categories } from "@/src/data/categories";
import { auth } from "@/src/lib/firebase";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<number>(78);

  useEffect(() => {
    // ✅ FIREBASE TEST LOG
    console.log("Firebase auth loaded:", auth);

    // ✅ DEFAULT CATEGORY LOAD
    fetchProducts(78);
  }, []);

  const fetchProducts = async (categoryId: number) => {
    try {
      setActiveCategory(categoryId);
      setLoading(true);

      const res = await fetch(
        `/api/products?category=${categoryId}`
      );

      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products", error);
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

      <Products
        products={products}
        loading={loading}
      />
    </>
  );
}