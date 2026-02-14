// Product Types for Sleep R Us E-commerce

export interface BaseProduct {
  _id: string;
  _type: string;
  title: string;
  slug: {
    current: string;
  };
  images: Array<{
    asset: {
      _ref: string;
      url: string;
    };
  }>;
  description: string;
  category: {
    _ref: string;
    _type: string;
    title: string;
    slug: {
      current: string;
    };
  };
}

export interface MattressSize {
  sizeName: string;
  dimensions: string;
  price: string;
}

export interface MattressConstruction {
  detail: string;
}

export interface Mattress extends BaseProduct {
  _type: 'mattress';
  comfortLevel: string;
  thickness: number;
  construction: MattressConstruction[];
  sizes: MattressSize[];
}

export interface BedSize {
  sizeName: string;
  dimensions: string;
  price: string;
}

export interface Bed extends BaseProduct {
  _type: 'bed';
  storageType: string;
  headboardStyle: string;
  sizes: BedSize[];
}

export type Product = Mattress | Bed;

export interface Category {
  _id: string;
  _type: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  parentCategory?: {
    _ref: string;
  };
}

export interface SanityImage {
  asset: {
    _ref: string;
    url: string;
  };
}