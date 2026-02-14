"use client";

import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/client/utils";

interface Category {
  _id: string;
  title: string;
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
  slug: {
    current: string;
  };
}

interface CategoryShowcaseProps {
  categories: Category[];
  title?: string;
}

export default function CategoryShowcase({
  categories,
  title = "Shop by Category",
}: CategoryShowcaseProps) {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-[#0B3D91] mb-6">
            {title}
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#0B3D91] to-white mx-auto rounded-full" />
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/products/${category.slug.current}` as any}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 h-80 md:h-96"
            >
              {/* Background Image */}
              {category.showcaseImage?.asset ? (
                <Image
                  src={
                    urlFor(category.showcaseImage)
                      .width(800)
                      .height(800)
                      .url() || "/placeholder.svg"
                  }
                  alt={category.title}
                  fill
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
              )}

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300" />

              {/* Content - Bottom Positioned */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="space-y-2">
                  <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight text-balance">
                    {category.title}
                  </h3>
                  {category.showcaseSubtitle && (
                    <p className="text-sm md:text-base text-gray-100 font-medium">
                      {category.showcaseSubtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Hover Indicator */}
              <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
