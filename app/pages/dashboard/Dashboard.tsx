"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "@/app/components/DashboardSidebar";
import { useSelector } from "react-redux";

import { BarChart3, Package, Users, TrendingUp } from "lucide-react";
import { RootState } from "@/app/store/store";

export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated, isLoggedOut, isLoading } = useSelector(
    (state: RootState) => state.auth
  );
  // const auth = useSelector((state: RootState) => state.auth);
  // console.log(auth);

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || isLoggedOut)) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoggedOut, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Checking session...
      </div>
    );
  }

  if (!isAuthenticated || isLoggedOut) {
    return (
      <div className="flex justify-center items-center h-screen">
        Redirecting...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 pt-16">
      <DashboardSidebar />

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Welcome back to Babi Furniture Admin!
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                icon: Package,
                label: "Total Products",
                value: "145",
                color: "bg-blue-50",
              },
              {
                icon: Users,
                label: "Total Customers",
                value: "567",
                color: "bg-green-50",
              },
              {
                icon: TrendingUp,
                label: "Total Orders",
                value: "1230",
                color: "bg-purple-50",
              },
              {
                icon: BarChart3,
                label: "Revenue",
                value: "2,45,000 Br",
                color: "bg-amber-50",
              },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className={`${stat.color} rounded-lg p-6 shadow-sm`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">
                        {stat.value}
                      </p>
                    </div>
                    <Icon className="w-10 h-10 text-amber-600 opacity-20" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Info Boxes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => router.push("/dashboard/products/add")}
                  className="block w-full p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg hover:border-amber-400 transition-colors text-left"
                >
                  <p className="font-semibold text-gray-900">Add New Product</p>
                  <p className="text-sm text-gray-600">
                    Create a new furniture item
                  </p>
                </button>
                <button
                  onClick={() => router.push("/dashboard/products")}
                  className="block w-full p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:border-blue-400 transition-colors text-left"
                >
                  <p className="font-semibold text-gray-900">Manage Products</p>
                  <p className="text-sm text-gray-600">
                    View and edit all products
                  </p>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <p className="text-gray-600">New order received</p>
                  <p className="text-gray-400">2 hours ago</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Product updated</p>
                  <p className="text-gray-400">5 hours ago</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">New customer registered</p>
                  <p className="text-gray-400">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
