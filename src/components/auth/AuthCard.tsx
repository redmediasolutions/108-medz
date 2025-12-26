import Image from "next/image";

export default function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <Image
            src="/108-medz logo.jpg"
            alt="108 Medz"
            width={56}
            height={56}
            className="rounded-xl"
          />
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-semibold text-center mb-2">
          {title}
        </h1>
        <p className="text-center text-gray-500 mb-8">
          {subtitle}
        </p>

        {children}
      </div>
    </div>
  );
}