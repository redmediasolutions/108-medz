export default function ProductPageLoading() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10 animate-pulse">
      {/* Top section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="bg-gray-200 rounded-xl h-[400px]" />

        {/* Details */}
        <div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6" />

          {/* Add to cart */}
          <div className="h-12 bg-gray-200 rounded w-1/3 mb-6" />

          {/* App CTA */}
          <div className="h-20 bg-gray-200 rounded-xl" />
        </div>
      </div>

      {/* Description */}
      <div className="mt-10 bg-gray-200 rounded-xl h-40" />

      {/* Related products */}
      <div className="mt-14">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-6" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 rounded-xl h-48"
            />
          ))}
        </div>
      </div>
    </section>
  );
}