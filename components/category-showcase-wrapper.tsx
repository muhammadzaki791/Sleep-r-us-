'use client';

import { useEffect, useState } from 'react';
import CategoryShowcase from './category-showcase';
import { client } from '../lib/client';
import { getTopLevelCategoriesQuery } from '../lib/client/queries';

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
      _type: 'reference';
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

export default function CategoryShowcaseWrapper({ title }: { title?: string }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await client.fetch(getTopLevelCategoriesQuery);
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {title || 'Shop by Category'}
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  return <CategoryShowcase categories={categories} title={title} />;
}