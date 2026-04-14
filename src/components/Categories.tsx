"use client";

import Image from "next/image";

type Category = {
  id: number;
  title1: string;
  title2: string;
  icon: string;
  background: string;
};

type Props = {
  categories: Category[];
  activeCategory: number | null;
  onSelect: (categoryId: number | null) => void;
};

export default function CategoriesSection({
  categories,
  activeCategory,
  onSelect,
}: Props) {
  return (
    <section className="w-full py-6">
      {/* Header */}
      <div className="flex items-center justify-between px-2 mb-2">
      </div>

      {/* Scroll */}
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex gap-4 px-4 min-w-max">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`flex items-center gap-4 min-w-[260px] p-4 rounded-2xl shadow-sm cursor-pointer transition ${activeCategory === cat.id
                  ? "bg-primary text-white"
                  : ""
                }`}
              style={
                activeCategory !== cat.id
                  ? {
                    backgroundImage: `url(${cat.background})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                  : {}
              }
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow overflow-hidden">
                <Image
                  src={cat.icon || "/images/categories/default.png"}
                  alt={cat.title1}
                  width={500}
                  height={500}
                  className="object-contain -translate-y-4"
                />
              </div>

              {/* Text */}
              <div>
                <h3
                  className={`font-semibold ${activeCategory === cat.id
                      ? "text-white"
                      : "text-gray-800"
                    }`}
                >
                  {cat.title1}
                </h3>

                <p
                  className={`text-sm ${activeCategory === cat.id
                      ? "text-white/80"
                      : "text-gray-600"
                    }`}
                >
                  {cat.title2}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}