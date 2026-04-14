"use client";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
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
    try {
      const snapshot = await getDocs(collection(db, "Homecategories"));

      const data = snapshot.docs.map((doc) => {
        const d = doc.data();

        return {
          id: Number(d.categoryId),
          title1: d.categoryTitle1,
          title2: d.categoryTitle2,
          icon: d.categoryIcon,
          background: d.backgroundImage,
          order: d.order || 0,
        };
      });

      data.sort((a, b) => a.order - b.order);

      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategories([]);
    }
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
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-10">

        {/* HERO */}
        <section>
          <HeroSlider />
        </section>

        {/* QUICK ACTIONS */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-primary text-white p-6 rounded-xl">
            <h2 className="text-xl font-bold">Upload Prescription</h2>
            <p className="text-sm">via WhatsApp</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <button className="w-full bg-primary text-white py-3 rounded-lg mb-3">
              Order with Prescription
            </button>
            <button className="w-full border py-3 rounded-lg">
              Call to Enquire
            </button>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="w-full py-6">
          <div className="flex items-center justify-between px-4 mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">
              Browse Categories
            </h2>

            {/* Optional: View All */}
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <div className="flex gap-4 px-4 min-w-max">
              <Categories
                categories={categories}
                activeCategory={activeCategory}
                onSelect={fetchProducts}
              />
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section>
          <h2 className="text-xl font-bold mb-4">Popular Medicines</h2>

          <Products products={products} loading={loading} />
        </section>

      </main>
    </div>
  );
}