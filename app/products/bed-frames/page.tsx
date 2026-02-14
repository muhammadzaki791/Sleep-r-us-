'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { client } from '../../../lib/client'
import { getCategoryBySlugWithProductsQuery } from '../../../lib/client/queries'
import ProductGrid from '../../../components/product/product-grid'
import WhatsAppButton from '../../../components/whatsapp-button/whatsapp-button'
import { FadeIn, StaggerContainer, StaggerItem } from '../../../lib/animations'

interface SizeOption {
  sizeName: string;
  dimensions: string;
  price: string;
}

interface Category {
  title: string;
  slug: {
    current: string;
  };
}

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
  description: PortableTextBlock[];
  priceContact: string;
}

interface MattressProduct extends BaseProduct {
  _type: 'mattress';
  thickness?: number;
  sizes: SizeOption[];
}

interface BedProduct extends BaseProduct {
  _type: 'bed';
  sizes: SizeOption[];
}

type Product = MattressProduct | BedProduct;

interface SubCategory {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: PortableTextBlock[];
  products: Product[];
}

interface CategoryData {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: PortableTextBlock[];
  subCategories: SubCategory[];
  directProducts: Product[];
}

export default function BedFramesPage() {
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const data = await client.fetch(getCategoryBySlugWithProductsQuery, { slug: 'bed-frames' })
        setCategoryData(data)
      } catch (error) {
        console.error('Error fetching bed frames category and products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategoryData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0B3D91]"></div>
          <p className="mt-4 text-[#0B3D91]">Loading bed frames...</p>
        </div>
      </div>
    )
  }

  if (!categoryData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-16">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h1 className="text-4xl font-bold text-center text-[#0B3D91] mb-6">Premium Bed Frames</h1>
            <p className="text-xl text-gray-600 text-center mb-12">Elegant support for your perfect sleep</p>
          </FadeIn>

          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Bed frame category not found or no products available at the moment. Please check back later.</p>
          </div>
        </div>

        <WhatsAppButton message="Hello, I'm interested in your bed frames. Can you provide more information?" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-16">
      <div className="container mx-auto px-4">
        <FadeIn>
          <h1 className="text-4xl font-bold text-center text-[#0B3D91] mb-4">{categoryData.title}</h1>
          <p className="text-xl text-gray-600 text-center mb-12">Elegant support for your perfect sleep</p>
        </FadeIn>

        {/* Display direct products if any */}
        {categoryData.directProducts && categoryData.directProducts.length > 0 && (
          <StaggerContainer>
            <div className="mb-16">
              <FadeIn>
                <h2 className="text-2xl font-bold text-center text-[#0B3D91] mb-8">Premium Bed Frames</h2>
              </FadeIn>
              <ProductGrid products={categoryData.directProducts} />
            </div>
          </StaggerContainer>
        )}

        {/* Display subcategories and their products */}
        {categoryData.subCategories && categoryData.subCategories.length > 0 && (
          <div className="space-y-20">
            {categoryData.subCategories.map((subCategory, index) => (
              <StaggerContainer key={subCategory._id} className="mb-12">
                <FadeIn>
                  <h3 className="text-2xl font-semibold text-center text-[#1A5BB8] mb-8">
                    {subCategory.title}
                  </h3>
                </FadeIn>

                {subCategory.products && subCategory.products.length > 0 ? (
                  <ProductGrid products={subCategory.products} />
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No products in this category yet.</p>
                  </div>
                )}
              </StaggerContainer>
            ))}
          </div>
        )}

        {(!categoryData.directProducts || categoryData.directProducts.length === 0) &&
         (!categoryData.subCategories || categoryData.subCategories.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No bed frames available at the moment. Please check back later.</p>
          </div>
        )}
      </div>

      <WhatsAppButton message="Hello, I'm interested in your bed frames. Can you provide more information?" />
    </div>
  )
}