import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800 mt-16">

      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
              <Image
                src="/108-medz logo.jpg"
                alt="108 Medz Logo"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>

            <div>
              <p className="font-bold text-primary text-lg">
                108 MEDZ
              </p>
              <p className="text-xs text-gray-500">
                YOUR HEALTH PARTNER
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed">
            Your trusted partner for affordable and accessible healthcare.
            Delivering quality medicines at lower prices.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li className="hover:text-primary cursor-pointer">About Us</li>
            <li className="hover:text-primary cursor-pointer">Contact Us</li>
            <li className="hover:text-primary cursor-pointer">Privacy Policy</li>
            <li className="hover:text-primary cursor-pointer">Terms & Conditions</li>
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
            Services
          </h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li className="hover:text-primary cursor-pointer">Order Medicine</li>
            <li className="hover:text-primary cursor-pointer">Upload Prescription</li>
            <li className="hover:text-primary cursor-pointer">Healthcare Products</li>
            <li className="hover:text-primary cursor-pointer">Blogs</li>
          </ul>
        </div>

        {/* CONNECT */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
            Connect With Us
          </h4>

          <div className="flex gap-4 mb-4 text-gray-500">
            <span className="cursor-pointer hover:text-primary">🌐</span>
            <span className="cursor-pointer hover:text-primary">✉️</span>
            <span className="cursor-pointer hover:text-primary">📞</span>
          </div>

          <p className="text-sm text-gray-500 mb-2">
            Download App
          </p>

          <div className="flex gap-2">
            <div className="bg-black text-white px-3 py-1 rounded text-xs flex items-center gap-1 cursor-pointer">
              🤖 Google Play
            </div>
            <div className="bg-black text-white px-3 py-1 rounded text-xs flex items-center gap-1 cursor-pointer">
              🍎 App Store
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">

          <p>© 2026 108 MEDZ. All rights reserved.</p>

          <p>
            Designed & Developed by{" "}
            <span className="text-primary hover:underline cursor-pointer">
              Red Media Solutions
            </span>
          </p>

        </div>
      </div>
    </footer>
  );
}