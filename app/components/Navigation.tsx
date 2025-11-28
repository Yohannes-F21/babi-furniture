"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, LogOut, User } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
import { logout, logoutUser } from "@/app/store/authSlice";
export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const pathname = usePathname();
  // const [user, setUser] = useState<any>(null);
  const [pastHero, setPastHero] = useState(false);

  const auth = useSelector((state: RootState) => state?.auth);
  const user = auth?.user;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Our Products", path: "/products" },
    { name: "About Us", path: "/about" },
    { name: "FAQs", path: "/faq" },
    { name: "Contact Us", path: "/contact" },
  ];

  const handleLogout = async () => {
    // 1. Clear state immediately
    dispatch(logout());
    setIsUserMenuOpen(false);

    // 2. Redirect immediately
    router.push("/login");

    // 3. Call backend (can fail — already logged out)
    try {
      await dispatch(logoutUser());
    } catch (err) {
      console.warn("Backend logout failed, but user is already logged out");
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 bg-white shadow-md z-50 `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src={"/logo4.png"}
              alt="Babi Furniture Logo"
              className="h-20 w-auto object-contain "
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="font-semibold text-sm">{user.userName}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors text-sm"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard/change-password"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors text-sm"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Change Password
                    </Link>
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors flex items-center text-sm"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-amber-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            {user && (
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="p-2 rounded-lg bg-amber-100 text-amber-700"
              >
                <User className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-amber-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="my-2" />
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="block px-3 py-2 text-base font-medium bg-amber-600 text-white rounded-lg text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
