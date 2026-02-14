"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { urlFor } from "../../lib/client/utils";
import { client } from "../../lib/client";
import { getTopLevelCategoriesQuery } from "../../lib/client/queries";
import WhatsAppButton from "../../components/whatsapp-button/whatsapp-button";
import { FadeIn, StaggerContainer, StaggerItem } from "../../lib/animations";

interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  showcaseSubtitle?: string;
  showcaseImage?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
    hotspot?: {
      x: number;
      y: number;
      height: number;
      width: number;
    };
    _type?: string;
    crop?: any;
  };
}

export default function ProductsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopLevelCategories = async () => {
      try {
        const data = await client.fetch(getTopLevelCategoriesQuery);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching top-level categories:", error);
        // Fallback to default categories if API fails
        setCategories([
          {
            _id: "mattresses-default",
            title: "Mattresses",
            slug: { current: "mattresses" },
            description: "Premium mattresses for the perfect night's rest",
          },
          {
            _id: "bed-frames-default",
            title: "Bed Frames",
            slug: { current: "bed-frames" },
            description:
              "Durable and stylish bed frames to complement your bedroom",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopLevelCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0B3D91]"></div>
          <p className="mt-4 text-[#0B3D91]">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <StaggerContainer className="container mx-auto px-4 max-w-6xl">
        <div className="py-16">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold text-center text-[#0B3D91] mb-6">
              Our Premium Collection
            </h1>
            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-16">
              Discover our premium selection of beds and mattresses designed for
              the perfect night's rest. Each product is crafted with care to
              provide comfort and support for years to come.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {categories.map((category, index) => (
              <StaggerItem key={category._id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-80"
                >
                  {category.showcaseImage?.asset ? (
                    <img
                      src={
                        urlFor(category.showcaseImage)
                          .width(800)
                          .height(800)
                          .url() || "/placeholder.svg"
                      }
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#0B3D91]/20 to-[#1A5BB8]/20 flex items-center justify-center">
                      <span className="text-6xl opacity-30">
                        {category.title.toLowerCase().includes("mattress")
                          ? "🛏️"
                          : "🪑"}
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                  <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                    <h2 className="text-3xl text-shadow-background md:text-4xl font-bold text-white mb-2 group-hover:translate-y-0 transition-transform duration-300">
                      {category.title}
                    </h2>

                    <p className="text-gray-200 text-base leading-relaxed line-clamp-2 mb-4">
                      {category.description}
                    </p>

                    <Link
                      href={`/products/${category.slug.current}` as any}
                      className="inline-flex items-center text-white font-semibold hover:text-blue-200 transition-colors duration-300 group/link"
                    >
                      Shop Now
                      <svg
                        className="ml-2 w-5 h-5 group-hover/link:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </div>

          <FadeIn>
            <div className="mt-20 text-center">
              <h3 className="text-2xl font-semibold text-[#0B3D91] mb-4">
                Looking for something specific?
              </h3>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
                Browse our complete range of mattresses and bed frames to find
                the perfect fit for your bedroom needs. Each product is
                carefully selected to ensure quality, comfort, and durability.
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  href="/products/mattresses"
                  className="px-6 py-3 bg-white text-[#0B3D91] border-2 border-[#0B3D91] rounded-lg hover:bg-[#0B3D91] hover:text-white transition-all duration-300 font-medium"
                >
                  Mattresses
                </Link>
                <Link
                  href="/products/bed-frames"
                  className="px-6 py-3 bg-white text-[#0B3D91] border-2 border-[#0B3D91] rounded-lg hover:bg-[#0B3D91] hover:text-white transition-all duration-300 font-medium"
                >
                  Bed Frames
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </StaggerContainer>

      <WhatsAppButton message="Hello, I'm interested in your products. Can you provide more information?" />
    </div>
  );
}
