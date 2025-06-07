// app/User/products/page.tsx
"use client";

import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "@/components/ux/navbar";
import Footer from "@/components/ux/footer";
import Link from "next/link";

export default function ProductCollectionPage() {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);
  // Mock product data
  const products = [
    {
      id: 1,
      name: "Premium Leather Jacket",
      price: "RS 25999.99",
      category: "Jackets",
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 2,
      name: "Classic Denim Shirt",
      price: "RS 899.99",
      category: "Shirts",
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 3,
      name: "Slim Fit Chinos",
      price: "RS 799.99",
      category: "Trousers",
      image:
        "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 4,
      name: "Designer Sneakers",
      price: "RS 1499.99",
      category: "Shoes",
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 5,
      name: "Cashmere Sweater",
      price: "RS 1899.99",
      category: "Sweaters",
      image:
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 6,
      name: "Tailored Blazer",
      price: "RS 24999.99",
      category: "Jackets",
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 7,
      name: "Cotton Polo Shirt",
      price: "RS 1599.99",
      category: "Shirts",
      image:
        "https://images.unsplash.com/photo-1525450824786-227cbef70703?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 8,
      name: "Classic Oxford Shoes",
      price: "RS 1799.99",
      category: "Shoes",
      image:
        "https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 9,
      name: "Wool Overcoat",
      price: "RS 34999.99",
      category: "Jackets",
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 10,
      name: "Linen Shorts",
      price: "RS 699.99",
      category: "Shorts",
      image:
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 11,
      name: "Silk Pocket Square",
      price: "RS 2999.99",
      category: "Accessories",
      image:
        "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 12,
      name: "Leather Belt",
      price: "RS 4999.99",
      category: "Accessories",
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
  ];

  // Helper function to parse price
  const getPriceValue = (priceStr: string) => {
    return parseFloat(priceStr.replace("RS", "").trim());
  };

  // Calculate max price for range slider
  const maxPriceValue = Math.max(
    ...products.map((p) => getPriceValue(p.price))
  );
  const maxPrice = Math.ceil(maxPriceValue / 1000) * 1000; // Round to nearest 1000


  // Categories for filtering
  const categories = [
    "All",
    "Shirts",
    "Jackets",
    "Trousers",
    "Shoes",
    "Accessories",
    "Sweaters",
    "Shorts",
  ];

   // State for filters - UPDATED INITIAL RANGE
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, maxPrice]); // Fixed initial range
  const [sortOption, setSortOption] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter products - UPDATED PRICE PARSING
  const filteredProducts = products
    .filter(
      (product) =>
        selectedCategory === "All" || product.category === selectedCategory
    )
    .filter((product) => {
      const price = getPriceValue(product.price); // Fixed parsing
      return price >= priceRange[0] && price <= priceRange[1];
    })
    .sort((a, b) => {
      const priceA = getPriceValue(a.price); // Fixed parsing
      const priceB = getPriceValue(b.price); // Fixed parsing

      if (sortOption === "price-low") return priceA - priceB;
      if (sortOption === "price-high") return priceB - priceA;
      return a.id - b.id;
    });

  // Hero Section
  const HeroSection = () => (
    <div className="relative h-[60vh] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 text-center text-white max-w-4xl px-4">
        <h1
          className="text-4xl md:text-6xl font-bold tracking-wider mb-6"
          data-aos="fade-up"
        >
          MEN`S COLLECTION
        </h1>
        <p
          className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Discover premium quality and timeless designs
        </p>
      </div>
    </div>
  );

  // Product Card Component
  const ProductCard = ({ product, index }: { product: any; index: number }) => {
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    return (
      <div
        ref={ref}
        className={`relative bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-700 group ${
          inView ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}
        style={{ transitionDelay: `${index * 50}ms` }}
      >
        <Link href={`/User/products_desc`}>
          <div className="relative h-80 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url('${product.image}')` }}
            />
          </div>

          <div className="p-6">
            <span className="text-sm text-gray-500">{product.category}</span>
            <h3 className="text-xl font-light text-gray-900 mb-2 group-hover:font-normal transition-all">
              {product.name}
            </h3>
            <p className="text-lg font-medium text-gray-900">{product.price}</p>
          </div>
        </Link>

        <div className="p-6 pt-0">
          <button className=" cursor-pointer w-full px-4 py-3 bg-black text-white rounded-full text-sm font-light tracking-wide hover:bg-gray-800 transition-colors duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    );
  };

  // Filter Section Component
 const FilterSection = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Filters</h3>
      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-2">Category</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center">
                <input
                  id={`category-${category}`}
                  name="category"
                  type="radio"
                  checked={selectedCategory === category}
                  onChange={() => setSelectedCategory(category)}
                  className="h-4 w-4 border-gray-300 text-black focus:ring-black"
                />
                <label
                  htmlFor={`category-${category}`}
                  className="ml-3 text-sm text-gray-600"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

       {/* Price Filter - UPDATED */}
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-2">
            Price Range
          </h4>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">
                RS {priceRange[0]}
              </span>
              <span className="text-sm text-gray-500">
                RS {priceRange[1]}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={maxPrice}
              step={1000}
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], parseInt(e.target.value)])
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Reset Button - UPDATED RANGE RESET */}
      <button
        onClick={() => {
          setSelectedCategory("All");
          setPriceRange([0, maxPrice]); // Reset to full range
        }}
        className="mt-6 w-full px-4 py-2 border border-black text-black rounded-full hover:bg-gray-100 transition-colors"
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile Filters Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>

          {/* Mobile Filters Panel */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 flex">
              <div
                className="fixed inset-0 bg-black bg-opacity-25"
                onClick={() => setMobileFiltersOpen(false)}
              />

              <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="mt-4 px-4">
                  <FilterSection />
                </div>
              </div>
            </div>
          )}

          {/* Desktop Filters */}
          <div className="hidden md:block md:w-1/4">
            <FilterSection />
          </div>

          {/* Product Grid */}
          <div className="md:w-3/4" id="product">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <h2
                className="text-2xl font-bold text-gray-900 mb-4 md:mb-0"
                data-aos="fade-up"
              >
                {selectedCategory === "All" ? "All Products" : selectedCategory}
                <span className="text-gray-500 text-base font-normal ml-2">
                  ({filteredProducts.length} products)
                </span>
              </h2>

              <div className="flex items-center">
                <label htmlFor="sort" className="mr-2 text-sm text-gray-700">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="border-0 py-2 pl-3 pr-10 text-sm rounded-md focus:ring-2 focus:ring-black"
                  data-aos="fade-left"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div className="mt-16 flex justify-center" data-aos="fade-up">
                <nav className="flex items-center space-x-2">
                  <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100">
                    1
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100">
                    2
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100">
                    3
                  </button>
                  <span className="text-gray-500">...</span>
                  <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100">
                    8
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800">
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Featured Banner */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 text-black/100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6" data-aos="fade-right">
              <h2 className="text-3xl md:text-4xl font-light tracking-wider">
                PREMIUM QUALITY, UNMATCHED STYLE
              </h2>
              <p className="text-gray-600 text-lg max-w-xl">
                Each piece in our collection is crafted with attention to detail
                and designed for the modern man who appreciates timeless
                elegance.
              </p>
              <Link href="#product">
                <button className="cursor-pointer px-8 py-3 bg-gray-400 text-black rounded-full text-base font-light tracking-wider group relative overflow-hidden">
                  <span className="relative z-10">EXPLORE COLLECTION</span>
                  <span className="absolute inset-0 bg-gray-200 transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></span>
                </button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4" data-aos="fade-left">
              <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')",
                }}
              ></div>
              <div className="bg-gray-800 rounded-xl aspect-square"></div>
              <div className="bg-gray-800 rounded-xl aspect-square"></div>
              <div className="bg-gray-800 rounded-xl aspect-square"></div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
