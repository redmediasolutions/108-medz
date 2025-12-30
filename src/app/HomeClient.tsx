"use client";

import { useEffect, useState } from "react";
import HeroSlider from "@/src/components/HeroSlider";
import Categories from "@/src/components/Categories";
import Products from "@/src/components/Products";

export default function HomeClient() {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchProducts(null);
  }, []);

  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(Array.isArray(data) ? data : []);
  };

  const fetchProducts = async (categoryId: number | null) => {
    try {
      setLoading(true);
      setActiveCategory(categoryId);

      const url = categoryId
        ? `/api/products?category=${categoryId}`
        : `/api/products`;

      const res = await fetch(url);
      const data = await res.json();

      setProducts(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Product fetch error", e);
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