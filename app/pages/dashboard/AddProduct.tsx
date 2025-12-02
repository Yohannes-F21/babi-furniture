"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ChevronLeft, Upload, X, Image as ImageIcon } from "lucide-react";
import Toast from "@/app/components/Toast";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
import { createProduct } from "@/app/store/productSlice";

interface ProductFormData {
  title: string;
  category: string;
  description: string;
  price: string;
  isFeatured: boolean;
}

export default function AddProduct() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.product);

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ProductFormData>({
    defaultValues: { isFeatured: false },
  });

  const isFeatured = watch("isFeatured");

  // Handle thumbnail
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  // Handle multiple images (max 4)
  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 4) {
      setToast({ type: "error", message: "Maximum 4 images allowed" });
      return;
    }
    const newImages = [...images, ...files];
    setImages(newImages);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ProductFormData) => {
    if (!thumbnail) {
      setToast({ type: "error", message: "Thumbnail is required" });
      return;
    }
    if (images.length === 0) {
      setToast({
        type: "error",
        message: "At least one product image is required",
      });
      return;
    }

    const formData = {
      ...data,
      thumbnail,
      images,
    };

    const result = await dispatch(createProduct(formData));

    if (createProduct.fulfilled.match(result)) {
      setToast({ type: "success", message: "Product created successfully!" });
      setTimeout(() => router.push("/dashboard/products"), 1500);
    } else {
      setToast({
        type: "error",
        message: (result.payload as string) || "Failed to create product",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 pt-16">
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => router.back()}
              className="text-amber-600 hover:text-amber-700"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Add New Product
              </h1>
              <p className="text-gray-600">Fill in the details below</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-xl shadow-sm p-8 space-y-8"
          >
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title
                </label>
                <input
                  {...register("title", { required: "Title is required" })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                  placeholder="Modern Sofa M107"
                />
                {errors.title && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-600"
                >
                  <option value="">Select category</option>
                  <option value="sofa">Sofa</option>
                  <option value="bed">Bed</option>
                  <option value="dining table">Dining Table</option>
                  <option value="dressing table">Dressing Table</option>
                  <option value="cabinet">Cabinet</option>
                  <option value="closet">Closet</option>
                </select>
                {errors.category && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price (Br)
                </label>
                <input
                  {...register("price", { required: "Price is required" })}
                  type="number"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-600"
                  placeholder="75000"
                />
                {errors.price && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  rows={4}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-600"
                  placeholder="Premium quality leather sofa with modern design..."
                />
                {errors.description && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>

            {/* Thumbnail Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Thumbnail Image *
              </label>
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-amber-500 transition-all bg-gray-50">
                {thumbnailPreview ? (
                  <div className="relative">
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail"
                      className="w-full h-64 object-cover rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setThumbnail(null);
                        setThumbnailPreview("");
                      }}
                      className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-gray-400 mb-3" />
                    <p className="text-sm text-gray-600">
                      Click to upload thumbnail
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG up to 5MB
                    </p>
                  </>
                )}
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                />
              </label>
            </div>

            {/* Multiple Images */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Product Images * (up to 4)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {imagePreviews.map((preview, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${i + 1}`}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {imagePreviews.length < 4 && (
                  <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-amber-500 bg-gray-50">
                    <ImageIcon className="w-10 h-10 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-2">
                      Add Image
                    </span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleImagesChange}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Featured Radio */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Featured Product?
              </label>
              <div className="flex gap-8">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    {...register("isFeatured")}
                    value="true"
                    className="w-5 h-5 text-amber-600 focus:ring-amber-500"
                  />
                  <span className="ml-3 text-gray-700 font-medium">
                    Yes, feature this product
                  </span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    {...register("isFeatured")}
                    value="false"
                    defaultChecked
                    className="w-5 h-5 text-amber-600 focus:ring-amber-500"
                  />
                  <span className="ml-3 text-gray-700 font-medium">No</span>
                </label>
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-4 pt-6 border-t">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-amber-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-amber-700 disabled:opacity-50 transition-all"
              >
                {isLoading ? "Creating Product..." : "Create Product"}
              </button>
              <button
                type="button"
                onClick={() => router.push("/dashboard/products")}
                className="px-8 py-4 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
