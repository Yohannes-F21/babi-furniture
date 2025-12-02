// app/dashboard/products/edit/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { ChevronLeft, Upload, X, Image as ImageIcon } from "lucide-react";
import Toast from "@/app/components/Toast";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
import { updateProduct, getProducts } from "@/app/store/productSlice";

interface ProductFormData {
  title: string;
  category: string;
  description: string;
  price: string;
  isFeatured: boolean;
}

export default function EditProduct() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { products, isLoading } = useSelector(
    (state: RootState) => state.product
  );

  const product = products.find((p) => p._id === id);

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
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>();

  const isFeatured = watch("isFeatured");

  // Populate form when product loads
  useEffect(() => {
    if (product) {
      setValue("title", product.title);
      setValue("category", product.category);
      setValue("description", product.description || "");
      setValue("price", String(product.price));
      setValue("isFeatured", product.isFeatured);

      setThumbnailPreview(product.thumbnailUrl);
      setImagePreviews(product.imagesUrl);
    }
  }, [product, setValue]);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length + imagePreviews.length > 4) {
      setToast({ type: "error", message: "Maximum 4 images allowed" });
      return;
    }
    setImages((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const removeImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ProductFormData) => {
    const formData = { ...data, thumbnail: thumbnail!, images };
    console.log("Submitting:", formData);

    const result = await dispatch(
      updateProduct({ id: id as string, formData })
    );

    if (updateProduct.fulfilled.match(result)) {
      dispatch(getProducts());
      setToast({ type: "success", message: "Product updated successfully!" });
      setTimeout(() => router.push("/dashboard/products"), 1500);
    } else {
      setToast({ type: "error", message: result.payload as string });
    }
  };

  if (!product) return <div>Product not found</div>;

  return (
    <div className="flex min-h-screen bg-gray-50 pt-16">
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <main className="flex-1 lg:ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <button onClick={() => router.back()} className="text-amber-600">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-3xl font-bold">Edit Product</h1>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-xl shadow-sm p-8 space-y-8"
          >
            {/* Same form as Add, but pre-filled */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  {...register("title", { required: true })}
                  className="w-full px-4 py-3 border rounded-lg"
                />
              </div>
              <div>
                <select
                  {...register("category", { required: true })}
                  className="w-full px-4 py-3 border rounded-lg"
                >
                  <option value="sofa">Sofa</option>
                  <option value="bed">Bed</option>
                  <option value="dining table">Dining Table</option>
                  <option value="dressing table">Dressing Table</option>

                  <option value="closet">Closet</option>
                  <option value="cabinet">Cabinet</option>
                </select>
              </div>
              <div>
                <input
                  {...register("price", { required: true })}
                  type="number"
                  className="w-full px-4 py-3 border rounded-lg"
                />
              </div>
              <div className="md:col-span-2">
                <textarea
                  {...register("description")}
                  rows={4}
                  className="w-full px-4 py-3 border rounded-lg"
                />
              </div>
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block font-semibold mb-3">Thumbnail</label>
              <label className="flex items-center justify-center h-64 border-2 border-dashed rounded-xl cursor-pointer">
                {thumbnailPreview && (
                  <img
                    src={thumbnailPreview}
                    alt="thumb"
                    className="w-full h-full object-cover rounded-xl"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Images */}
            <div>
              <label className="block font-semibold mb-3">
                Product Images (max 4)
              </label>
              <div className="grid grid-cols-4 gap-4">
                {imagePreviews.map((src, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={src}
                      alt=""
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {imagePreviews.length < 4 && (
                  <label className="h-40 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer">
                    <ImageIcon className="w-10 h-10 text-gray-400" />
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImagesChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* isFeatured */}
            <div>
              <label className="block font-semibold mb-4">
                Featured Product?
              </label>
              <div className="flex gap-8">
                <label className="flex items-center">
                  <input
                    type="radio"
                    {...register("isFeatured")}
                    value="true"
                    className="mr-3"
                  />{" "}
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    {...register("isFeatured")}
                    value="false"
                    className="mr-3"
                  />{" "}
                  No
                </label>
              </div>
            </div>

            <div className="flex gap-4 pt-6 border-t">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-amber-600 text-white py-4 rounded-lg font-bold"
              >
                {isLoading ? "Updating..." : "Update Product"}
              </button>
              <button
                type="button"
                onClick={() => router.push("/dashboard/products")}
                className="px-8 py-4 border rounded-lg"
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
