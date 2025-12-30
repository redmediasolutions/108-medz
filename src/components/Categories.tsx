"use client";

type Category = {
  id: number;
  name: string;
};

type Props = {
  categories: Category[];
  activeCategory: number | null;
  onSelect: (categoryId: number | null) => void;
};

export default function Categories({
  categories,
  activeCategory,
  onSelect,
}: Props) {
  return (
    <section className="bg-gray-50 border-b">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">

          {/* ALL */}
          <button
            onClick={() => onSelect(null)}
            className={`px-6 py-2 rounded-full whitespace-nowrap ${
              activeCategory === null
                ? "bg-black text-white"
                : "bg-white"
            }`}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`px-6 py-2 rounded-full whitespace-nowrap ${
                activeCategory === cat.id
                  ? "bg-black text-white"
                  : "bg-white"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}