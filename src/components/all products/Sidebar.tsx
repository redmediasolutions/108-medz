type Props = {
    categories: any[];
    activeCategory: number | null;
    onSelect: (id: number) => void;
    onReset: () => void;
};

export default function Sidebar({
    categories,
    activeCategory,
    onSelect,
    onReset,
}: Props) {
    return (
        <div className="bg-white text-slate-900 rounded-xl shadow-sm p-4">
            <h3 className="text-sm font-semibold mb-3">
                Categories
            </h3>

            <ul className="space-y-2">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => onSelect(cat.id)}
                        className="w-full text-left px-3 py-2 mb-1 rounded-lg text-sm font-medium transition"
                        style={{
                            color:
                                activeCategory === cat.id
                                    ? "var(--color-primary)"
                                    : "#000",
                            backgroundColor:
                                activeCategory === cat.id
                                    ? "rgba(29,78,216,0.1)"
                                    : "#fff",
                        }}
                    >
                        {cat.label}
                    </button>
                ))}
            </ul>
        </div>
    );
}