"use client";

import { Category } from "@/src/data/categories";

type Props = {
  categories: Category[];
  activeCategory: number;
  onSelect: (categoryId: number) => void;
};

export default function Categories({
  categories,
  activeCategory,
  onSelect,
}: Props) {
  return (
    <section className="bg-gray-50 border-b">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => {
            const active = cat.id === activeCategory;

            return (
              <button
                key={cat.id}
                onClick={() => onSelect(cat.id)}
                className="
                  px-6 py-2.5 rounded-full
                  whitespace-nowrap text-sm font-medium
                  transition cursor-pointer
                "
                style={
                  active
                    ? {
                        backgroundColor: "var(--color-primary)",
                        color: "#fff",
                        boxShadow:
                          "0 4px 10px rgba(0,0,0,0.15)",
                      }
                    : {
                        backgroundColor: "#fff",
                        color: "var(--color-primary)",
                      }
                }
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}