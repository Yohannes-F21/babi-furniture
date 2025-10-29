"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useForm } from "react-hook-form"
import Link from "next/link"
import DashboardSidebar from "@/app/components/DashboardSidebar"
import { ChevronLeft } from "lucide-react"
import Toast from "@/app/components/Toast"

interface ProductFormData {
  title: string
  category: string
  description: string
  price: string
  imageUrl: string
  status: "active" | "inactive"
}

export default function EditProduct() {
  const router = useRouter()
  const params = useParams()
  const productId = params.id as string
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>()

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/login")
    }

    const mockProduct = {
      title: "Sofa M115",
      category: "Sofa",
      description: "Premium leather sofa with modern design",
      price: "94900",
      imageUrl: "https://example.com/sofa.jpg",
      status: "active",
    }
    reset(mockProduct)
  }, [productId, reset, router])

  const onSubmit = async (data: ProductFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))
      setToast({ type: "success", message: "Product updated successfully!" })
      setTimeout(() => router.push("/dashboard/products"), 1500)
    } catch (error) {
      setToast({ type: "error", message: "Failed to update product" })
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50 pt-16">
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      <DashboardSidebar />

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/dashboard/products" className="inline-flex items-center text-amber-600 hover:text-amber-700">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
              <p className="text-gray-600 mt-1">Update product details</p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Title */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Title</label>
                  <input
                    {...register("title", { required: "Title is required" })}
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                    placeholder="e.g., Sofa M115"
                  />
                  {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    {...register("category", { required: "Category is required" })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    <option value="Sofa">Sofa</option>
                    <option value="Bed">Bed</option>
                    <option value="Dining Set">Dining Set</option>
                    <option value="Chair">Chair</option>
                    <option value="Table">Table</option>
                  </select>
                  {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>}
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (Br)</label>
                  <input
                    {...register("price", { required: "Price is required" })}
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                    placeholder="e.g., 94900"
                  />
                  {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>}
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    {...register("description", { required: "Description is required" })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                    placeholder="Describe the product..."
                  />
                  {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
                </div>

                {/* Image URL */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                  <input
                    {...register("imageUrl", { required: "Image URL is required" })}
                    type="url"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                  {errors.imageUrl && <p className="text-red-600 text-sm mt-1">{errors.imageUrl.message}</p>}
                </div>

                {/* Status */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input {...register("status")} type="radio" value="active" className="w-4 h-4 text-amber-600" />
                      <span className="ml-2 text-gray-700">Active</span>
                    </label>
                    <label className="flex items-center">
                      <input {...register("status")} type="radio" value="inactive" className="w-4 h-4 text-amber-600" />
                      <span className="ml-2 text-gray-700">Inactive</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-6 border-t">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-amber-600 text-white py-2 rounded-lg font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Updating..." : "Update Product"}
                </button>
                <Link
                  href="/dashboard/products"
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 text-center transition-colors"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
