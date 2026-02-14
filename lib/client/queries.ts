import { groq } from "next-sanity";

// Query to get all products (mattresses and beds)
export const getAllProductsQuery = groq`
  *[(_type == "mattress" || _type == "bed")]{
    _id,
    _type,
    title,
    slug,
    images,
    comfortLevel,
    description,
    "priceContact": select(
      _type == "mattress" => sizes[0].price,
      _type == "bed" => sizes[0].price
    ),
    "category": category->{
      _id,
      title,
      slug,
      "parentCategory": parentCategory->{_id, title, slug}
    },
    // Mattress specific fields
    _type == "mattress" => {
      thickness,
      construction[] {
        detail
      },
      sizes[] {
        sizeName,
        dimensions,
        price
      }
    },
    // Bed specific fields
    _type == "bed" => {
      storageType,
      headboardStyle,
      sizes[] {
        sizeName,
        dimensions,
        price
      }
    }
  }
`;

// Query to get a single product by slug
export const getProductBySlugQuery = groq`
  *[(_type == "mattress" || _type == "bed") && slug.current == $slug][0]{
    _id,
    _type,
    title,
    slug,
    images,
    comfortLevel,
    category->{
      _id,
      title,
      slug,
      "parentCategory": parentCategory->{_id, title, slug}
    },
    description,
    "priceContact": select(
      _type == "mattress" => sizes[0].price,
      _type == "bed" => sizes[0].price
    ),
    // Mattress specific fields
    _type == "mattress" => {
      thickness,
      construction[] {
        detail
      },
      sizes[] {
        sizeName,
        dimensions,
        price
      }
    },
    // Bed specific fields
    _type == "bed" => {
      storageType,
      headboardStyle,
      sizes[] {
        sizeName,
        dimensions,
        price
      }
    }
  }
`;

// Query to get all categories
export const getAllCategoriesQuery = groq`
  *[_type == "category"]{
    _id,
    title,
    slug,
    description,
    parentCategory->
  }
`;

// Query to get hierarchical categories with their products
export const getHierarchicalCategoriesWithProductsQuery = groq`
  {
    "topLevelCategories": *[_type == "category" && !defined(parentCategory)] | order(title asc){
      _id,
      title,
      slug,
      description,
      "subCategories": *[_type == "category" && parentCategory._ref == ^._id] | order(title asc){
        _id,
        title,
        slug,
        description,
        "products": *[(_type == "mattress" || _type == "bed") && category._ref == ^._id] | order(title asc) {
          _id,
          _type,
          title,
          slug,
          images,
          description,
          "priceContact": select(
            _type == "mattress" => sizes[0].price,
            _type == "bed" => sizes[0].price
          ),
          "category": category->{title, slug}
        }
      }
    }
  }
`;

// Query to get top-level categories only (for main products page)
export const getTopLevelCategoriesQuery = groq`
  *[_type == "category" && !defined(parentCategory)] | order(title asc) {
    _id,
    title,
    slug,
    description,
    showcaseSubtitle,
    "showcaseImage": showcaseImage {
      "asset": {
        "_ref": asset->_id,
        "_type": "reference"
      },
      hotspot,
      _type,
      crop
    }
  }
`;

// Query to get category by slug with its subcategories and products
export const getCategoryBySlugWithProductsQuery = groq`
  *[_type == "category" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    description,
    "subCategories": *[_type == "category" && parentCategory._ref == ^._id] | order(title asc){
      _id,
      title,
      slug,
      description,
      "products": *[(_type == "mattress" || _type == "bed") && category._ref == ^._id] | order(title asc){
        _id,
        _type,
        title,
        slug,
        images,
        description,
        "priceContact": select(
          _type == "mattress" => sizes[0].price,
          _type == "bed" => sizes[0].price
        ),
        "category": category->{title, slug}
      }
    },
    "directProducts": *[(_type == "mattress" || _type == "bed") && category._ref == ^._id] | order(title asc){
      _id,
      _type,
      title,
      slug,
      images,
      description,
      "priceContact": select(
        _type == "mattress" => sizes[0].price,
        _type == "bed" => sizes[0].price
      ),
      "category": category->{title, slug}
    }
  }
`;

// Query to get a single category by slug
export const getCategoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    description,
  }
`;

// Query to get SEO data for a specific page
export const getSeoByPageSlugQuery = groq`
  *[_type == "seo" && pageSlug == $pageSlug][0]{
    pageTitle,
    pageDescription,
    ogImage,
    keywords[],
    canonicalUrl,
    noIndex,
  }
`;

// Query to get search results
export const getSearchResultsQuery = groq`
  *[(_type == "mattress" || _type == "bed") && (title match $query + "*" || title match "*" + $query + "*" || description match $query + "*" || description match "*" + $query + "*")]{
    _id,
    _type,
    title,
    slug,
    description,
    images,
    "priceContact": select(
      _type == "mattress" => sizes[0].price,
      _type == "bed" => sizes[0].price
    ),
    "category": category->{title, slug}
  }
`;

// Query to get homepage content (products, categories, etc.)
export const getHomepageContentQuery = groq`
  {
    "featuredProducts": *[_type == "mattress" || _type == "bed"] | order(_createdAt desc)[0...6]{
      _id,
      _type,
      title,
      slug,
      images,
      description,
      "priceContact": select(
        _type == "mattress" => sizes[0].price,
        _type == "bed" => sizes[0].price
      ),
      "category": category->{title, slug}
    },
    "topLevelCategories": *[_type == "category" && !defined(parentCategory)] | order(title asc)[0...4]{
      _id,
      title,
      slug,
      description,
      "subCategories": *[_type == "category" && parentCategory._ref == ^._id] | order(title asc)[0...5]{
        _id,
        title,
        slug,
        "productCount": count(*[(_type == "mattress" || _type == "bed") && references(^._id)])
      }
    }
  }
`;
