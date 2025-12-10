import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-amber-400 mb-4">
              Babi Furniture Ethiopia
            </h3>
            <p className="text-gray-300 mb-4">
              10+ years of experience in providing quality furniture with custom
              designs, free delivery in Addis Ababa, and two-year warranty.
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <Phone size={16} className="mr-2 text-amber-400" />
                <span>0920244062 / 0983835555</span>
              </div>
              <div className="flex items-center">
                <Mail size={16} className="mr-2 text-amber-400" />
                <span>hailegebralefantahun@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Our Products
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Showroom Locations */}
          {/* <div>
            <h4 className="text-lg font-semibold mb-4">Showrooms</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <MapPin
                  size={16}
                  className="mr-2 text-amber-400 mt-0.5 flex-shrink-0"
                />
                <span className="text-gray-300">
                  Beklo Bet (Opposite Alpha Building)
                </span>
              </div>
              <div className="flex items-start">
                <MapPin
                  size={16}
                  className="mr-2 text-amber-400 mt-0.5 flex-shrink-0"
                />
                <span className="text-gray-300">Salete Mehret (Behind 3F)</span>
              </div>
              <div className="flex items-start">
                <MapPin
                  size={16}
                  className="mr-2 text-amber-400 mt-0.5 flex-shrink-0"
                />
                <span className="text-gray-300">
                  Gurd Shola (Opp Ethio Telecom)
                </span>
              </div>
            </div>
          </div> */}
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Babi Furniture Ethiopia. All rights reserved.
          </p>
          <p className="text-gray-300">
            Designed by Yohannes Fantahun (Web Developer)
          </p>
          <p className="text-gray-300">email: yohannesfantahun.m@gmail.com</p>
          <p className="text-gray-300">phone: +251910594289</p>
        </div>
      </div>
    </footer>
  );
}
