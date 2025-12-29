"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/src/components/all products/Sidebar";
import ProductsGrid from "@/src/components/all products/ProductsGrid";
import { categories } from "@/src/data/categories";

export default function AllProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  {!loading && products.length === 0 && (
  <p className="text-center text-gray-500 py-10">
    No products found
  </p>
)}

  const fetchAllProducts = async () => {
    setLoading(true);
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  const fetchByCategory = async (categoryId: number) => {
    setActiveCategory(categoryId);
    setLoading(true);

    const res = await fetch(`/api/products?category=${categoryId}`);
    const data = await res.json();

    setProducts(data);
    setLoading(false);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">All Products</h1>
        <p className="text-sm text-gray-500">
          Showing {products.length} products
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
        {/* SIDEBAR */}
        <Sidebar
          categories={categories}
          activeCategory={activeCategory}
          onSelect={fetchByCategory}
          onReset={fetchAllProducts}
        />

        {/* PRODUCTS */}
        <ProductsGrid products={products} loading={loading} />
      </div>
    </section>
  );
}