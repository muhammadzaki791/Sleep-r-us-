"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { urlFor } from "../../lib/client/utils";
import WhatsAppButton from "../whatsapp-button/whatsapp-button";
import { FadeIn } from "../../lib/animations";
import { PortableText } from "@portabletext/react";

interface SizeOption {
  sizeName: string;
  dimensions: string;
  price: string;
}

interface ConstructionDetail {
  detail: string;
}

interface Category {
  title: string;
  slug: {
    current: string;
  };
}

interface BaseProduct {
  _id: string;
  _type: string;
  title: string;
  slug: {
    current: string;
  };
  images: any[];
  comfortLevel?: string;
  category?: Category;
  description: any[]; // Portable Text array of blocks
  priceContact: string;
}

interface MattressProduct extends BaseProduct {
  _type: "mattress";
  thickness?: number;
  construction?: ConstructionDetail[];
  sizes: SizeOption[];
}

interface BedProduct extends BaseProduct {
  _type: "bed";
  storageType?: string;
  headboardStyle?: string;
  sizes: SizeOption[];
}

type Product = MattressProduct | BedProduct;

const ProductDetail = ({ product }: { product: Product }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const mainImageUrl =
    product.images && product.images.length > 0
      ? urlFor(product.images[selectedImageIndex]).width(600).height(600).url()
      : "/placeholder-product.jpg";

  const allImages = product.images || [];

  const portableTextComponents = {
    block: {
      normal: ({ children }: any) => (
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          {children}
        </p>
      ),
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className="list-disc pl-6 space-y-2 mb-3">
          {children}
        </ul>
      ),
    },
    listItem: {
      bullet: ({ children }: any) => (
        <li className="text-base text-muted-foreground">
          {children}
        </li>
      ),
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images Gallery */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-square w-full overflow-hidden rounded-lg border border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <Image
                src={mainImageUrl || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-contain p-4 sm:p-6 transition-all duration-500"
              />
            </motion.div>

            {/* Thumbnail Gallery */}
            {allImages.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex gap-3 overflow-x-auto pb-1"
              >
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImageIndex === index
                        ? "border-primary shadow-md"
                        : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <Image
                      src={
                        urlFor(image).width(120).height(120).url() ||
                        "/placeholder.svg"
                      }
                      alt={`${product.title} - Image ${index + 1}`}
                      fill
                      className="object-cover transition-opacity duration-300"
                    />
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-start gap-6">
            <FadeIn>
              {/* Header Section */}
              <div className="border-b border-border pb-6">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                  {product.title}
                </h1>
                <p className="text-base text-muted-foreground">
                  Premium Quality Product
                </p>
              </div>

              {/* Product Specs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-card rounded-lg border border-border p-6 sm:p-8"
              >
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Mattress specific specs */}
                  {product._type === "mattress" && (
                    <>
                      <div className="p-4 rounded-lg bg-muted/50 border border-border">
                        <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                          Thickness
                        </span>
                        <span className="text-xl font-semibold text-foreground">
                          {product.thickness} inches
                        </span>
                      </div>
                    </>
                  )}

                  {/* Bed specific specs */}
                  {product._type === "bed" && (
                    <>
                      {product.storageType && (
                        <div className="p-4 rounded-lg bg-muted/50 border border-border">
                          <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                            Storage Type
                          </span>
                          <span className="text-xl font-semibold text-foreground">
                            {product.storageType}
                          </span>
                        </div>
                      )}

                      {product.headboardStyle && (
                        <div className="p-4 rounded-lg bg-muted/50 border border-border">
                          <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                            Headboard Style
                          </span>
                          <span className="text-xl font-semibold text-foreground">
                            {product.headboardStyle}
                          </span>
                        </div>
                      )}
                    </>
                  )}

                  {/* Construction details for mattresses */}
                  {product._type === "mattress" &&
                    product.construction &&
                    product.construction.length > 0 && (
                      <div className="p-4 rounded-lg bg-muted/50 border border-border sm:col-span-2">
                        <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                          Construction
                        </span>
                        <ul className="space-y-2">
                          {product.construction.map((detail, index) => (
                            <li
                              key={index}
                              className="text-sm text-foreground flex items-start gap-2"
                            >
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                              {detail.detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>

                {/* Sizes table */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <h4 className="font-semibold text-foreground mb-4">
                      Available Sizes
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                              Size
                            </th>
                            <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                              Dimensions
                            </th>
                            <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                              Price
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {product.sizes.map((size, index) => (
                            <tr
                              key={index}
                              className="border-b border-border hover:bg-muted/50 transition-colors"
                            >
                              <td className="px-4 py-3 text-foreground font-medium">
                                {size.sizeName}
                              </td>
                              <td className="px-4 py-3 text-foreground">
                                {size.dimensions}
                              </td>
                              <td className="px-4 py-3 text-foreground">
                                {size.price}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-lg font-semibold text-foreground mb-3">
                  Product Description
                </h2>
                <div className="text-base text-muted-foreground leading-relaxed">
                  <PortableText
                    value={product.description}
                    components={portableTextComponents}
                  />
                </div>
              </motion.div>


              {/* Contact for Price Button */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-4"
              >
                <a
                  href={`/product-inquiry?product=${encodeURIComponent(product.title)}&slug=${encodeURIComponent(product.slug.current)}`}
                  className="w-full inline-flex items-center justify-center px-6 py-4 mt-4 bg-gradient-to-r from-[#0B3D91] to-[#1A5BB8] text-white font-semibold rounded-xl hover:from-[#082a69] hover:to-[#164a96] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Contact for More Info
                </a>

                <WhatsAppButton
                  message={`Hello, I'm interested in the ${product.title}. Can you provide more information?`}
                />
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
