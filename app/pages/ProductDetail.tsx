"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Star, Truck, Shield, ArrowLeft, Heart, Share2 } from "lucide-react";
import publicApi from "@/lib/publicApi";

export default function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const id = params.id as string;
  console.log(id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!id) return;

    publicApi
      .get(`/products/get/${id}`)
      .then((res) => {
        const data = res.data.data;
        console.log("Fetched product:", data);
        setProduct(data);
        setCurrentImageIndex(0); // Reset to first image
      })
      .catch((err) => {
        console.error("Error:", err);
        setProduct(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!product)
    return (
      <div className="text-center py-20 text-red-600">Product not found</div>
    );

  // SAFE WAY: Build images array only when product exists
  const allImages = [
    product.thumbnailUrl,
    ...(Array.isArray(product.imagesUrl)
      ? product.imagesUrl.filter((img: any) => img !== product.thumbnailUrl) // remove duplicate
      : []),
  ].filter(Boolean);

  const currentImage = allImages[currentImageIndex] || product.thumbnailUrl;
  const productLocal = {
    id: 1,
    name: "Sofa M115",
    price: "94,900",
    category: "Sofa",
    images: [
      "/placeholder.svg?height=500&width=600",
      "/placeholder.svg?height=500&width=600",
      "/placeholder.svg?height=500&width=600",
      "/placeholder.svg?height=500&width=600",
    ],
    description:
      "This premium leather sofa combines comfort and style with its modern design. Crafted from high-quality materials, it features durable construction and elegant finishing that will complement any living space.",
    features: [
      "Premium leather upholstery",
      "Solid wood frame construction",
      "High-density foam cushions",
      "Stain-resistant treatment",
      "Available in multiple colors",
    ],
    specifications: {
      Dimensions: "220cm x 90cm x 85cm",
      Material: "Genuine Leather",
      Frame: "Solid Wood",
      Warranty: "2 Years",
      Delivery: "7-10 Days",
    },
  };

  const relatedProducts = [
    {
      id: 2,
      name: "Sofa S220",
      price: "78,900",
      image: "/placeholder.svg?height=200&width=250",
    },
    {
      id: 3,
      name: "Sofa S190",
      price: "112,300",
      image: "/placeholder.svg?height=200&width=250",
    },
    {
      id: 4,
      name: "Chair C105",
      price: "25,400",
      image: "/placeholder.svg?height=200&width=250",
    },
  ];

  return (
    <div className="pt-16">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-amber-600">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href="/products"
              className="text-gray-500 hover:text-amber-600"
            >
              Products
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{product.title}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/products"
            className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={currentImage || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Free Shipping
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-4">
                {allImages.map((image: any, index: any) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative overflow-hidden rounded-lg ${
                      currentImage === index ? "ring-2 ring-amber-600" : ""
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-20 object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {product.category}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {product.title}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">(24 reviews)</span>
                </div>
                <div className="text-4xl font-bold text-amber-600 mb-6">
                  {product.price.toLocaleString()} Br
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {productLocal.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                  <Truck className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-800">
                      Free Delivery
                    </p>
                    <p className="text-sm text-green-600">Within Addis Ababa</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                  <Shield className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-semibold text-blue-800">
                      2 Year Warranty
                    </p>
                    <p className="text-sm text-blue-600">Full coverage</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-amber-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-amber-700 transition-colors duration-300">
                  Contact for Quote
                </button>
                <Link
                  href="/contact"
                  className="block w-full border-2 border-amber-600 text-amber-600 py-4 rounded-lg font-semibold text-lg hover:bg-amber-600 hover:text-white transition-all duration-300 text-center"
                >
                  Request Custom Size
                </Link>
              </div>

              {/* Specifications */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Specifications
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  {Object.entries(productLocal.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between py-2 border-b border-gray-200 last:border-b-0"
                      >
                        <span className="font-medium text-gray-700">
                          {String(key)}:
                        </span>
                        <span className="text-gray-600">{String(value)}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/products/${relatedProduct.id}`}
                className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <img
                  src={relatedProduct.image || "/placeholder.svg"}
                  alt={relatedProduct.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {relatedProduct.name}
                  </h3>
                  <span className="text-xl font-bold text-amber-600">
                    {relatedProduct.price} Br
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
