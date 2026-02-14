"use client";

import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../../lib/client/utils";

interface PortableTextBlock {
  _key: string;
  _type: string;
  children: {
    _key: string;
    _type: string;
    text: string;
  }[];
  markDefs: any[];
  style: string;
}

interface Product {
  _id: string;
  _type: string;
  title: string;
  slug: {
    current: string;
  };
  images: any[];
  description: PortableTextBlock[];
  priceContact: string;
  category?: {
    title: string;
    slug: {
      current: string;
    };
  };
}

interface PortableTextChild {
  _key: string;
  _type: string;
  text: string;
}

interface PortableTextBlock {
  _key: string;
  _type: string;
  children: PortableTextChild[];
  markDefs: any[];
  style: string;
}

// Helper function to extract text content from Portable Text
const extractTextFromPortableText = (blocks: PortableTextBlock[]): string => {
  if (!blocks || !Array.isArray(blocks)) return '';

  return blocks
    .map(block => {
      if (block._type === 'block' && Array.isArray(block.children)) {
        return block.children.map((child: PortableTextChild) => child.text || '').join('');
      }
      return '';
    })
    .filter(text => text)
    .join(' ')
    .trim();
};

const ProductCard = ({ product }: { product: Product }) => {
  // Handle both direct URLs and image objects
  const imageUrl =
    product.images && product.images.length > 0
      ? urlFor(product.images[0]).width(300).height(300).url()
      : "/placeholder-product.jpg";

  // Extract and truncate description text for card display
  const descriptionText = extractTextFromPortableText(product.description);

  // Determine the category path based on product type
  const categoryPath =
    product._type === "mattress" ? "mattresses" : "bed-frames";

  return (
    <Link href={`/products/${categoryPath}/${product.slug.current}`}>
      <div className="group h-full bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-muted-foreground cursor-pointer">
        {/* Image Container with Overlay */}
        <div className="relative h-72 overflow-hidden bg-muted">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content Container */}
        <div className="flex flex-col p-5">
          {/* Title */}
          <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
            {descriptionText}
          </p>

          {/* Price and CTA */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-border">
            <span className="text-base font-medium text-primary">
              {product.priceContact}
            </span>
            <button className="text-sm font-medium px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-foreground hover:text-background transition-all duration-300 whitespace-nowrap">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
