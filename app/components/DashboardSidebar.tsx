"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Plus,
  Lock,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
export default function DashboardSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const reduxUser = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    // const user = localStorage.getItem("user")

    if (reduxUser) {
      setUser(reduxUser);
    }
  }, []);

  // const isActive = (path: string) =>
  //   pathname === path || pathname.startsWith(`${path}/`);
  // const isActive = (path: string) => pathname.startsWith(path);

  const menuItems = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Products", path: "/dashboard/products", icon: Package },
    { label: "Add Product", path: "/dashboard/products/add", icon: Plus },
    {
      label: "Change Password",
      path: "/dashboard/change-password",
      icon: Lock,
    },
  ];

  // const handleLogout = () => {
  //   localStorage.removeItem("user");
  //   localStorage.removeItem("token");
  //   setUser(null);
  //   router.push("/");
  // };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-20 left-4 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-20 h-screen bg-gray-900 text-white w-64 shadow-lg transition-transform duration-300 lg:translate-x-0 z-30 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-4">
          {/* User Info */}
          <div className="mb-8 p-4 bg-gray-800 rounded-lg text-center">
            <p className="text-sm text-gray-400">
              Welcome{" "}
              <span className="pl-2 text-lg font-semibold text-white">
                {user?.userName.toUpperCase()}
              </span>
            </p>
            {/* <p className="text-lg font-semibold text-white">{user?.userName}</p> */}
            {/* <p className="text-sm text-gray-400">{user?.email}</p> */}
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                // Exact match for /dashboard
                (item.path === "/dashboard" && pathname === "/dashboard") ||
                // For all other routes: check if current path starts with path
                (item.path !== "/dashboard" && pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-amber-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {isActive && <ChevronRight className="ml-auto w-4 h-4" />}
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <button
            // onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
