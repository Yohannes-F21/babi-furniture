"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DashboardSidebar from "@/app/components/DashboardSidebar"
import { Edit, Trash2, Plus, Search } from "lucide-react"
import Toast from "@/app/components/Toast"

interface Product {
  id: string
  title: string
  price: number
  category: string
  status: "active" | "inactive"
}

export default function DashboardProducts() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([
    { id: "1", title: "Sofa M115", price: 94900, category: "Sofa", status: "active" },
    { id: "2", title: "Bed B205", price: 67500, category: "Bed", status: "active" },
    { id: "3", title: "Dining Set D340", price: 125800, category: "Dining Set", status: "active" },
  ])
  const [searchTerm, setSearchTerm] = useState("")
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null)

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/login")
    }
  }, [router])

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id))
      setToast({ type: "success", message: "Product deleted successfully" })
    }
  }

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen bg-gray-50 pt-16">
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      <DashboardSidebar activePath="/dashboard/products" />

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Products</h1>
              <p className="text-gray-600 mt-1">Manage your furniture collection</p>
            </div>
            <button
              onClick={() => router.push("/dashboard/products/add")}
              className="inline-flex items-center bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors font-semibold"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
            />
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {filteredProducts.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-600 mb-4">No products found</p>
                <button
                  onClick={() => router.push("/dashboard/products/add")}
                  className="inline-flex items-center bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Product
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{product.title}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-amber-600">{product.price} Br</td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              product.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {product.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm space-x-2 flex">
                          <button
                            onClick={() => router.push(`/dashboard/products/edit/${product.id}`)}
                            className="inline-flex items-center px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="inline-flex items-center px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
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
  )
}
