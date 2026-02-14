'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { client } from '@/lib/client'
import { getProductBySlugQuery } from '@/lib/client/queries'
import ProductDetail from '@/components/product/product-detail'
import WhatsAppButton from '@/components/whatsapp-button/whatsapp-button'

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
  _type: 'mattress';
  thickness?: number;
  construction?: ConstructionDetail[];
  sizes: SizeOption[];
}

interface BedProduct extends BaseProduct {
  _type: 'bed';
  storageType?: string;
  headboardStyle?: string;
  sizes: SizeOption[];
}

type Product = MattressProduct | BedProduct;

export default function BedFrameProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await client.fetch(getProductBySlugQuery, { slug })
        setProduct(data)
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchProduct()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0B3D91]"></div>
          <p className="mt-4 text-[#0B3D91]">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#0B3D91]">Product not found</h2>
          <p className="text-gray-600 mt-2">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <ProductDetail product={product} />
      <WhatsAppButton message={`Hello, I'm interested in the ${product.title}. Can you provide more information?`} />
    </div>
  )
}