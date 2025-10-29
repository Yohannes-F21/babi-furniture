"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Filter } from "lucide-react";

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Sofa", "Bed", "Dining Set", "Chair", "Table"];

  const products = [
    {
      id: 1,
      name: "Sofa M115",
      price: "94,900",
      image: "/placeholder.svg?height=300&width=400",
      category: "Sofa",
    },
    {
      id: 2,
      name: "Bed B205",
      price: "67,500",
      image: "/placeholder.svg?height=300&width=400",
      category: "Bed",
    },
    {
      id: 3,
      name: "Dining Set D340",
      price: "125,800",
      image: "/placeholder.svg?height=300&width=400",
      category: "Dining Set",
    },
    {
      id: 4,
      name: "Sofa S220",
      price: "78,900",
      image: "/placeholder.svg?height=300&width=400",
      category: "Sofa",
    },
    {
      id: 5,
      name: "Bed B180",
      price: "89,200",
      image: "/placeholder.svg?height=300&width=400",
      category: "Bed",
    },
    {
      id: 6,
      name: "Chair C105",
      price: "25,400",
      image: "/placeholder.svg?height=300&width=400",
      category: "Chair",
    },
    {
      id: 7,
      name: "Table T150",
      price: "45,600",
      image: "/placeholder.svg?height=300&width=400",
      category: "Table",
    },
    {
      id: 8,
      name: "Dining Set D280",
      price: "98,500",
      image: "/placeholder.svg?height=300&width=400",
      category: "Dining Set",
    },
    {
      id: 9,
      name: "Sofa S190",
      price: "112,300",
      image: "/placeholder.svg?height=300&width=400",
      category: "Sofa",
    },
  ];

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Products
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our extensive collection of premium furniture crafted with
            care and attention to detail
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-amber-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {product.category}
                  </div>
                  <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Free Shipping
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-amber-600">
                      {product.price} Br
                    </span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                  </div>
                  <button className="w-full bg-amber-600 text-white py-2 rounded-lg font-semibold hover:bg-amber-700 transition-colors duration-300">
                    View Details
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
