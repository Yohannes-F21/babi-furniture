"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Star, Truck, Shield, Clock } from "lucide-react";

export default function Home() {
  const [currentPromo, setCurrentPromo] = useState(0);
  const promoTexts = [
    "Custom Orders Available",
    "Free Delivery in Addis Ababa",
    "Two Year Warranty",
  ];

  const featuredProducts = [
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
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promoTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-50 to-orange-50 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Quality Furniture
                  <span className="block text-amber-600">Made to Last</span>
                </h1>

                {/* Animated Promo Text */}
                <div className="h-8 overflow-hidden">
                  <div
                    className="transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateY(-${currentPromo * 32}px)` }}
                  >
                    {promoTexts.map((text, index) => (
                      <p
                        key={index}
                        className="text-xl text-gray-600 h-8 flex items-center"
                      >
                        {text}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="group bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                >
                  Shop Now
                  <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-amber-600 text-amber-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-600 hover:text-white transition-all duration-300 text-center"
                >
                  Get Quote
                </Link>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div className="text-center">
                  <Truck className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                  <p className="text-sm font-medium">Free Delivery</p>
                </div>
                <div className="text-center">
                  <Shield className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                  <p className="text-sm font-medium">2 Year Warranty</p>
                </div>
                <div className="text-center">
                  <Clock className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                  <p className="text-sm font-medium">7-10 Days</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="/hero3.jpeg"
                alt="Alpha Furniture Showroom"
                className="rounded-lg shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Categories
            </h2>
            <p className="text-xl text-gray-600">
              Discover our premium furniture collections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sofas",
                image: "/placeholder.svg?height=300&width=400",
                count: "25+ Models",
              },
              {
                name: "Beds",
                image: "/placeholder.svg?height=300&width=400",
                count: "30+ Models",
              },
              {
                name: "Dining Sets",
                image: "/placeholder.svg?height=300&width=400",
                count: "20+ Models",
              },
            ].map((category, index) => (
              <Link
                key={category.name}
                href="/products"
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-amber-200">{category.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">
              Our most popular furniture pieces
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
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
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
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
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Snippet */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Alpha Furniture Workshop"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                19+ Years of Excellence
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Alpha Furniture Ethiopia has been crafting quality furniture for
                over 19 years. We specialize in custom designs, offer free
                delivery within Addis Ababa, and provide a comprehensive
                two-year warranty on all our products.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our experienced craftsmen use premium materials to create
                furniture that combines style, comfort, and durability. From
                sofas to dining sets, we have everything you need to furnish
                your home.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors duration-300"
              >
                Learn More About Us
                <ChevronRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
