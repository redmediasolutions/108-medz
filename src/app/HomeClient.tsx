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
  const [activeCategory, setActiveCategory] = useState<number>(78);

  useEffect(() => {
    console.log("Firebase auth loaded:", auth);
    fetchProducts(78);
  }, []);

  const fetchProducts = async (categoryId: number) => {
    try {
      setActiveCategory(categoryId);
      setLoading(true);

      const res = await fetch(`/api/products?category=${categoryId}`);
      const data = await res.json();

      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch products", error);
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