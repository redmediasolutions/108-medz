import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300">

      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/108-medz logo.jpg"
              alt="108 Medz Logo"
              width={36}
              height={36}
              className="object-contain"
            />
            <span className="text-white font-semibold text-lg">
              108 Medz
            </span>
          </div>

          <p className="text-sm leading-relaxed text-slate-400">
            Your trusted partner in medical supplies and healthcare equipment.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-white font-medium mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">All Products</li>
            <li className="hover:text-white cursor-pointer">Diagnostic Equipment</li>
            <li className="hover:text-white cursor-pointer">Mobility Aids</li>
            <li className="hover:text-white cursor-pointer">Respiratory Care</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-medium mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">FAQ</li>
            <li className="hover:text-white cursor-pointer">Contact Us</li>
            <li className="hover:text-white cursor-pointer">Order History</li>
            <li className="hover:text-white cursor-pointer">Shipping Info</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-medium mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Careers</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Terms of Service</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

          {/* Left */}
          <p className="text-sm text-slate-400 text-center md:text-left">
            © 2026 108-Medz. All rights reserved.
          </p>

          {/* Center */}
          <p className="text-sm text-slate-500">
            Designed & Developed by{" "}
            <span className="text-slate-300 hover:text-white transition cursor-pointer">
              Red Media Solutions
            </span>
          </p>

        </div>
      </div>
    </footer>
  );
}