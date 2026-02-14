import { client } from '../index';
import { getCategoryBySlugWithProductsQuery } from '../queries';

interface SizeOption {
  sizeName: string;
  dimensions: string;
  price: string;
}

interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
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
  description: string;
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
  description?: string;
  products?: Product[];
}

export interface CategoryData {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  subCategories?: SubCategory[];
  directProducts?: Product[];
}

export async function getCategoryBySlug(slug: string): Promise<CategoryData | null> {
  try {
    const category = await client.fetch(
      getCategoryBySlugWithProductsQuery,
      { slug } // Pass the slug parameter correctly
    );

    return category;
  } catch (error) {
    console.error('Error fetching category by slug:', error);
    throw new Error(`Failed to fetch category with slug: ${slug}`);
  }
}