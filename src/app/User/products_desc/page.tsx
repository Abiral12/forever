"use client";   

import Navbar from "@/components/ux/navbar";
import Footer from "@/components/ux/footer";
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ArrowLeft, Heart, Star, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react'; 
import { useRouter } from 'next/navigation';

export default function ProductPage() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, []);

  // Product data
  const product = {
    id: 1,
    name: "Premium Leather Jacket",
    price: 299.99,
    description: "Handcrafted from the finest leather, this jacket offers both style and durability. Designed for the modern man who appreciates timeless elegance.",
    details: [
      "100% Genuine Leather",
      "Soft cotton lining",
      "Metal zipper with leather puller",
      "Four external pockets",
      "Two internal pockets",
      "Adjustable waist strap"
    ],
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    sizes: ['XS','S','M','L','XL'],
    colors: [
      { name: 'Black', value: 'bg-black' },
      { name: 'Brown', value: 'bg-amber-900' },
      { name: 'Navy', value: 'bg-blue-900' }
    ],
    rating: 4.8,
    reviews: 142,
    stock: 15
  };

  // Related products
  const relatedProducts = [
    {
      id: 2,
      name: "Classic Denim Shirt",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 3,
      name: "Slim Fit Chinos",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 4,
      name: "Designer Sneakers",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  // Handle image navigation
  const nextImage = () => {
    setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  // Handle quantity changes
  const increaseQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, product.stock));
  };

  const decreaseQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <Navbar />
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-black transition-colors duration-300"
          data-aos="fade-right"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Collection
        </button>
      </div>
      
      {/* Product Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Product Images */}
            <div className="relative">
              {/* Main Image */}
              <div 
                className="relative h-[500px] rounded-2xl overflow-hidden shadow-lg"
                data-aos="fade-right"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                  style={{ backgroundImage: `url('${product.images[selectedImage]}')` }}
                />
                
                {/* Navigation Arrows */}
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all"
                >
                  <ChevronLeft className="h-6 w-6 text-black" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all"
                >
                  <ChevronRight className="h-6 w-6 text-black" />
                </button>
                
                {/* Favorite Button */}
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all">
                  <Heart className="h-5 w-5 text-black" />
                </button>
              </div>
              
              {/* Thumbnails */}
              <div className="flex mt-6 space-x-4" data-aos="fade-right" data-aos-delay="100">
                {product.images.map((img, index) => (
                  <button 
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index ? 'border-black scale-105' : 'border-transparent'
                    }`}
                  >
                    <div 
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url('${img}')` }}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div data-aos="fade-left">
              {/* Breadcrumb */}
              <div className="text-sm text-gray-500 mb-4">
                <span>Home / </span>
                <span>Outerwear / </span>
                <span className="text-black">Jackets</span>
              </div>
              
              {/* Product Title */}
              <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-3">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">({product.reviews} reviews)</span>
                {product.stock > 0 && (
                  <span className="ml-4 text-green-600 flex items-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                    In Stock ({product.stock} left)
                  </span>
                )}
              </div>
              
              {/* Price */}
              <div className="text-3xl font-light text-gray-900 mb-8">
                ${product.price.toFixed(2)}
              </div>
              
              {/* Description */}
              <p className="text-gray-700 mb-8 leading-relaxed">
                {product.description}
              </p>
              
              {/* Details */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Details</h3>
                <ul className="space-y-2">
                  {product.details.map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3"></div>
                      <span className="text-gray-600">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Size Selector */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 border rounded-lg text-sm font-medium transition-all duration-300 ${
                        selectedSize === size
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Color Selector */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Color</h3>
                <div className="flex gap-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      className={`w-10 h-10 rounded-full ${color.value} border-2 border-transparent hover:border-gray-300 transition-all`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
              
              {/* Quantity and Add to Cart */}
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button 
                    onClick={decreaseQuantity}
                    className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-3 text-lg">{quantity}</span>
                  <button 
                    onClick={increaseQuantity}
                    className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
                
                <button className="flex-1 px-8 py-4 bg-black text-white rounded-lg text-lg font-medium tracking-wide hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center">
                  <ShoppingBag className="h-5 w-5 mr-3" />
                  Add to Cart
                </button>
              </div>
              
              {/* Additional Info */}
              <div className="border-t border-b border-gray-200 py-6">
                <div className="flex flex-wrap gap-8 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.707 7.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L13 8.586V5a1 1 0 10-2 0v3.586l-1.293-1.293zM11 3a1 1 0 10-2 0v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 5.586V3z" />
                      <path d="M3 10a1 1 0 011-1h1a1 1 0 110 2H4a1 1 0 01-1-1zM7 10a1 1 0 011-1h1a1 1 0 110 2H8a1 1 0 01-1-1zM11 10a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM15 10a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1z" />
                    </svg>
                    Free shipping worldwide
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    Delivery in 3-5 days
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Products */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-r from-gray-100 to-white transform -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-r from-gray-100 to-white transform translate-x-1/2 translate-y-1/2 rotate-45 rounded-3xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 tracking-wider">
              YOU MAY ALSO LIKE
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Discover complementary pieces from our collection
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((product, index) => (
              <RelatedProductCard 
                key={product.id}
                product={product}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}

// Related Product Card Component
function RelatedProductCard({ product, index }: { product: any, index: number }) {
  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-700 group hover:-translate-y-2 hover:shadow-xl"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      {/* Product Image */}
      <div className="relative h-80 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url('${product.image}')` }}
        />
        
        {/* Quick View */}
        <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-black text-white text-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Quick View
        </button>
      </div>
      
      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-xl font-light text-gray-900 mb-2 group-hover:font-normal transition-all">
          {product.name}
        </h3>
        <p className="text-lg font-medium text-gray-900">${product.price.toFixed(2)}</p>
        
        {/* Quick Add to Cart */}
        <div className="mt-6 flex justify-between items-center">
          <button className="cursor-pointer px-4 py-2 bg-black text-white rounded-full text-sm font-light tracking-wide hover:bg-gray-800 transition-colors duration-300">
            Add to Cart
          </button>
          <button className="w-10 h-10 flex items-center justify-center border border-gray-200 text-sm cursor-pointer hover:border-black transition-colors">
            <Heart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}