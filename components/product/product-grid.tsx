import ProductCard from "./product-card";

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
  comfortLevel?: string;
  category?: {
    title: string;
    slug: {
      current: string;
    };
  };
  description: PortableTextBlock[];
  priceContact: string;
}

const ProductGrid = ({ products }: { products: Product[] }) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No products available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
