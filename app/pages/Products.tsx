"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, Filter } from "lucide-react";
import publicApi from "@/lib/publicApi";

// ──────────────────────────────────────────────────────────────
// MAIN PAGE + DATA FETCHING + FILTERING (ALL IN ONE CLIENT COMPONENT)
// ──────────────────────────────────────────────────────────────
export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const categories = [
    "all",
    "sofa",
    "bed",
    "dining table",
    "closet",
    "dressing table",
    "cabinet",
  ];

  // Fetch products once on mount
  useEffect(() => {
    publicApi
      .get("/products/get")
      .then((res) => {
        const data = res.data.data || [];
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Filter when category changes
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(
          (p) =>
            p.category?.toLowerCase().includes(activeCategory.toLowerCase()) ||
            activeCategory.toLowerCase().includes(p.category?.toLowerCase())
        )
      );
    }
  }, [activeCategory, products]);

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Products
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our extensive collection of premium furniture
          </p>
        </div>
      </section>

      {/* Loading Skeleton */}
      {loading && <ProductsSkeleton />}

      {/* Content (only show when loaded) */}
      {!loading && (
        <>
          {/* Category Filter */}
          <section className="py-8 bg-white border-b sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Filter by Category
                </h2>
                <div className="flex items-center text-gray-600">
                  <Filter className="w-5 h-5 mr-2" />
                  <span>{filteredProducts.length} Products</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      activeCategory === cat
                        ? "bg-amber-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Products Grid */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <Link
                    key={product._id}
                    href={`/products/${product._id}`}
                    className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={product.thumbnailUrl || "/placeholder.svg"}
                        alt={product.title}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {product.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {product.title}
                      </h3>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl font-bold text-amber-600">
                          {Number(product.price).toLocaleString()} Br
                        </span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-amber-400 text-amber-400"
                            />
                          ))}
                        </div>
                      </div>
                      <button className="w-full bg-amber-600 text-white py-2 rounded-lg font-semibold hover:bg-amber-700 transition">
                        View Details
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Loading Skeleton
// ──────────────────────────────────────────────────────────────
function ProductsSkeleton() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-pulse">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="h-64 bg-gray-300"></div>
              <div className="p-6 space-y-4">
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-8 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
