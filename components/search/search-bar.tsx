"use client";

import { useState, useEffect, useRef } from "react";
import { client } from "../../lib/client";
import { getSearchResultsQuery } from "../../lib/client/queries";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../../lib/client/utils";
import { Search as SearchIcon, X } from "lucide-react";
import TypewriterEffect from "@/components/ui/typewriter-effect"; // Adjust path as needed

interface Product {
  _id: string;
  _type: string;
  title: string;
  slug: { current: string };
  description: any[];
  images?: any[];
}

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const performSearch = async (searchQuery: string) => {
    if (searchQuery.trim().length === 0) {
      setResults([]);
      return;
    }
    setIsLoading(true);
    try {
      const searchResults = await client.fetch(getSearchResultsQuery, {
        query: searchQuery,
      } as any);
      setResults(searchResults);
    } catch (error) {
      console.error("Error searching products:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (query.trim().length > 0) {
      const timeoutId = setTimeout(() => {
        performSearch(query);
        setIsOpen(true);
      }, 300);
      return () => clearTimeout(timeoutId);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  // Extract plain text from Portable Text blocks for search result previews
  const extractText = (blocks: any[]): string => {
    if (!blocks || !Array.isArray(blocks)) return '';
    return blocks
      .map((block: any) => {
        if (block._type === 'block' && Array.isArray(block.children)) {
          return block.children.map((child: any) => child.text || '').join('');
        }
        return '';
      })
      .filter((text: string) => text)
      .join(' ')
      .trim();
  };

  return (
    <div className="relative w-full max-w-md mx-auto" ref={searchRef}>
      <div className="relative">
        {/* Search Icon (left aligned, vertically centered) */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
          <SearchIcon
            className={`h-5 w-5 transition-colors duration-200 ${isFocused ? "text-[#0B3D91]" : "text-gray-400"}`}
          />
        </div>

        {/* Input Field */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            if (query) setIsOpen(true);
          }}
          onBlur={() => setIsFocused(false)}
          placeholder=" " // Use space so placeholder doesn't conflict with the effect
          className="block w-full pl-12 pr-12 py-3 bg-white border-2 border-gray-100 rounded-2xl text-gray-900 shadow-sm transition-all duration-300 focus:outline-none focus:border-[#0B3D91] focus:ring-4 focus:ring-[#0B3D91]/10"
        />

        {/* Typewriter Overlay (positioned to start exactly where input text starts) */}
        {!query && (isFocused || results.length === 0) && (
          <div className="absolute inset-y-0 left-0 opacity-50 pl-12 pr-12 flex items-center pointer-events-none text-gray-400 font-light overflow-hidden whitespace-nowrap">
            <span className="mr-1">Search</span>
            <span className="mb-1">
              <TypewriterEffect
                texts={[
                  "mattresses...",
                  "bed frames..",
                  "quality sleep..",
                  "comfort...",
                ]}
                speed={100}
                pauseDuration={1500}
              />
            </span>
          </div>
        )}

        {/* Clear Button (right aligned, vertically centered) */}
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
              setIsOpen(false);
            }}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#0B3D91] transition-colors z-10"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      {/* ... (Results Dropdown code from previous response remains the same) ... */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-h-[70vh] overflow-y-auto custom-scrollbar">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="inline-block w-6 h-6 border-2 border-[#0B3D91] border-t-transparent rounded-full animate-spin mb-2" />
                <p className="text-sm text-gray-500 font-medium">
                  Finding the best for you...
                </p>
              </div>
            ) : results.length > 0 ? (
              results.map((product) => {
                const productType =
                  product._type === "mattress" ? "mattresses" : "bed-frames";
                const href = `/products/${productType}/${product.slug.current}`;
                return (
                  <Link
                    key={product._id}
                    href={href as any}
                    onClick={() => {
                      setQuery("");
                      setIsOpen(false);
                    }}
                    className="flex items-center p-4 hover:bg-[#0B3D91]/5 transition-all group border-b border-gray-50 last:border-0"
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden mr-4 flex-shrink-0 border border-gray-100 bg-gray-50">
                      {product.images?.length ? (
                        <Image
                          src={urlFor(product.images[0])
                            .width(100)
                            .height(100)
                            .url()}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          width={56}
                          height={56}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-gray-900 group-hover:text-[#0B3D91] truncate transition-colors">
                        {product.title}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-1 mt-0.5 font-light">
                        {extractText(product.description)}
                      </p>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500 text-sm">
                  No results found for "
                  <span className="font-semibold text-gray-800">{query}</span>"
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {isOpen &&
        query.trim().length > 0 &&
        results.length === 0 &&
        !isLoading && (
          <div className="absolute right-0 mt-2 w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
            <p className="text-center text-gray-500">
              No products found matching "{query}"
            </p>
          </div>
        )}
    </div>
  );
};

export default SearchBar;
