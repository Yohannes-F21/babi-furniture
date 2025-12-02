"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Edit, Trash2, Plus, Search } from "lucide-react";
import Toast from "@/app/components/Toast";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
import { getProducts } from "@/app/store/productSlice";
import DeleteConfirmButton from "@/app/components/DeleteConfirmButton";

export default function DashboardProducts() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // GET DATA DIRECTLY FROM REDUX (BEST WAY!)
  const { products, isLoading, error } = useSelector(
    (state: RootState) => state.product
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // // Fetch products on mount
  // useEffect(() => {
  //   dispatch(getProducts());
  // }, [dispatch]);

  // Filter products (real-time)
  const filteredProducts = products.filter(
    (product: any) =>
      product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Show loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading products...
      </div>
    );
  }

  // Show error
  if (error) {
    return <div className="text-red-600 text-center">Error: {error}</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 pt-16">
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* <DashboardSidebar /> */}

      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Products</h1>
              <p className="text-gray-600 mt-1">
                Manage your furniture collection
              </p>
            </div>
            <button
              onClick={() => router.push("/dashboard/products/add")}
              className="inline-flex items-center bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors font-semibold"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </button>
          </div>

          {/* Search */}
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
            />
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {filteredProducts.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-gray-600 mb-6">No products found</p>
                <button
                  onClick={() => router.push("/dashboard/products/add")}
                  className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700"
                >
                  <Plus className="w-5 h-5 inline mr-2" />
                  Add Your First Product
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Title
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Price
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Created By
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredProducts.map((product: any) => (
                      <tr key={product._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {product.title}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {product.category}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-amber-600">
                          {parseFloat(product.price || 0).toLocaleString()} Br
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {product.createdBy?.userName || "Unknown"}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                router.push(
                                  `/dashboard/products/${product._id}`
                                )
                              }
                              className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <DeleteConfirmButton
                              productId={product._id}
                              productTitle={product.title}
                              onDeleteSuccess={() => {
                                // This will refetch fresh list after delete
                                dispatch(getProducts());
                              }}
                              setToast={setToast}
                              onDeleteComplete={() => {
                                // Force a state update to re-render table after any delete attempt
                                setSearchTerm((term) => term);
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
