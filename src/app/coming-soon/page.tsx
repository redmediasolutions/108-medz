export default function ComingSoonPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      <div className="max-w-xl text-center bg-white rounded-2xl shadow-xl p-8">
        <h1
          className="text-3xl font-bold mb-4"
          style={{ color: "var(--color-primary)" }}
        >
          108 Medz
        </h1>

        <p className="text-lg font-medium mb-2">
          We’re launching soon 🚀
        </p>

        <p className="text-sm text-gray-600 mb-6">
          Our website is currently under maintenance.
          We’re working hard to bring you a better experience.
        </p>

        <div
          className="inline-block px-6 py-3 rounded-lg text-sm font-semibold"
          style={{
            backgroundColor: "var(--color-secondary)",
            color: "var(--color-primary)",
          }}
        >
          Coming Soon
        </div>
      </div>
    </div>
  );
}