"use client";   

import Navbar from "@/components/ux/navbar";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react'; 
import Footer from "@/components/ux/footer";
import Link from "next/link";

export default function HomePage() {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, []);

  // Category data with Unsplash image URLs
  const categories = [
    { 
      name: "Shirts", 
      description: "Premium fabrics for every occasion",
      image: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
      
    },
    { 
      name: "T-Shirts", 
      description: "Casual comfort for everyday wear",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
    },
    { 
      name: "Jeans", 
      description: "Classic denim for modern style",
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
    },
    { 
      name: "Trousers", 
      description: "Sharp styles for the discerning man",
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
    },
    { 
      name: "Shoes", 
      description: "Step out in style and comfort",
      image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
    },
    { 
      name: "Accessories", 
      description: "Complete your signature look",
      image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
    }
  ];

  // Trending products data
  const trendingProducts = [
    {
      id: 1,
      name: "Premium Leather Jacket",
      price: "Rs 2999.99",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 2,
      name: "Classic Denim Shirt",
      price: "Rs 899.99",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 3,
      name: "Slim Fit Chinos",
      price: "Rs 799.99",
      image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 4,
      name: "Designer Sneakers",
      price: "Rs 1499.99",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
    <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      
      
      {/* Video Background Section */}
      <div className="relative h-[90vh] flex items-center justify-center">
        {/* Video Container */}
        <div className="absolute inset-0 z-0">
          <video 
            preload="auto"     
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
          >
            <source src="/videos/bg video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 text-center text-white max-w-4xl px-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-wider mb-6">
            MEN`S COLLECTION
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
            Discover the timeless elegance of our new season collection
          </p>
          <Link href="/User/products"><button className="cursor-pointer px-10 py-4 bg-transparent border-2 border-white text-lg font-medium tracking-wider hover:bg-white hover:text-black transition-all duration-300 group relative overflow-hidden">
            <span className="relative z-10">SHOP NOW</span>
            <span className="absolute inset-0 bg-white transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></span>
          </button></Link>
        </div>
      </div>
      
      {/* Shop by Category Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">

            <h2 
              className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900"
              data-aos="fade-up"
            >
              Shop by Category
            </h2>
            <p 
              className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Explore our curated collections designed for the modern man
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <CategoryCard 
                key={category.name}
                category={category}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

       {/* Trending Products Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')" 
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/70" />
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header with Animation */}
          <div className="text-center mb-20" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-light text-white tracking-wider">
              FEATURED PRODUCTS
            </h2>
            <div className="mt-8 flex justify-center">
              <button className="px-8 py-3 bg-transparent border border-gray-400 text-white rounded-full text-base font-light tracking-wider group relative overflow-hidden">
                <span className="relative z-10">SHOP NOW</span>
                <span className="absolute inset-0 bg-gray-400  transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></span>
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product, index) => (
              <ProductCard 
                key={product.id}
                product={product}
                index={index}
              />
            ))}
          </div>
          
          {/* View All Button */}
          <div className="text-center mt-16" data-aos="fade-up" data-aos-delay="200">
            <Link href="/User/products"><button className="px-8 py-3 bg-white text-black rounded-full text-base font-light tracking-wider hover:bg-gray-400 cursor-pointer transition-colors duration-300 inline-flex items-center space-x-2">
              <span>View All Products</span>
              <ArrowRight className="h-4 w-4" />
            </button></Link>
          </div>
        </div>
      </section>
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
  {/* Parallax Background */}
  <div className="fixed inset-0 -z-10">
    <div 
      className="absolute inset-0 bg-cover bg-center"
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')",
        backgroundAttachment: 'fixed'
      }}
    />
    <div className="absolute inset-0 bg-white/90" />
  </div>
  
  <div className="relative z-10 max-w-7xl mx-auto">
    <div className="text-center mb-20" data-aos="fade-up">
      <h2 className="text-4xl md:text-4xl font-light text-gray-900 tracking-wider">
        OUR JOURNEY
      </h2>
      <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
        Celebrating milestones in men`s fashion excellence
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <MilestoneCard 
        title="Established"
        value="2010"
        description="Year we began our journey"
        delay={0}
      />
      <MilestoneCard 
        title="Happy Clients"
        value="50K+"
        description="Satisfied customers worldwide"
        delay={100}
      />
      <MilestoneCard 
        title="Products"
        value="500+"
        description="Unique designs in collection"
        delay={200}
      />
      <MilestoneCard 
        title="Awards"
        value="12"
        description="Industry recognitions"
        delay={300}
      />
    </div>
    
    {/* Auto-Animated Progress Bar */}
    <div className="mt-32 max-w-5xl mx-auto" data-aos="fade-up">
      <div className="relative h-1 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-black"
          data-aos="progress-bar"
          data-aos-duration="2000"
          data-aos-easing="ease-out"
          data-aos-once="true"
          style={{ width: '0%' }}
        ></div>
      </div>
      
      <div className="flex justify-between mt-8">
        {[2010, 2013, 2016, 2019, 2023].map((year, index) => (
          <div 
            key={year} 
            className="relative"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="w-4 h-4 bg-black rounded-full absolute -top-8 left-1/2 transform -translate-x-1/2"></div>
            <span className="text-gray-600">{year}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

<section className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
  {/* Decorative Elements */}
  <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-r from-gray-100 to-white transform -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-3xl"></div>
  <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-r from-gray-100 to-white transform translate-x-1/2 translate-y-1/2 rotate-45 rounded-3xl"></div>
  
  <div className="relative z-10 max-w-7xl mx-auto">
    <div className="text-center mb-16" data-aos="fade-up">
      <h2 className="text-3xl md:text-4xl font-light text-gray-900 tracking-wider">
        CUSTOMER STORIES
      </h2>
      <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
        Discover what our clients say about our premium collections
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <TestimonialCard 
        quote="The quality of their shirts is unmatched. I've never felt more confident in my attire."
        author="Michael Anderson"
        role="Senior Executive"
        rating={5}
        image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
        delay={0}
      />
      <TestimonialCard 
        quote="These trousers fit perfectly and maintain their shape after countless wears. Worth every penny!"
        author="James Wilson"
        role="Creative Director"
        rating={5}
        image="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
        delay={100}
      />
      <TestimonialCard 
        quote="The leather jacket I purchased has become my signature piece. Compliments everywhere I go."
        author="Thomas Roberts"
        role="Entrepreneur"
        rating={5}
        image="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
        delay={200}
      />
    </div>
    
    {/* View All Button */}
    <div className="text-center mt-16" data-aos="fade-up">
      <button className="px-8 py-3 bg-transparent border-2 border-black text-black rounded-full text-base font-light tracking-wider group relative overflow-hidden">
        <span className="relative z-10">READ MORE STORIES</span>
        <span className="absolute inset-0 bg-gray-200 transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></span>
      </button>
    </div>
  </div>
</section>
<Footer/>
    </div>
  )
}

// Updated Category Card Component with Unsplash images
function CategoryCard({ category, index }: { category: any, index: number }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Link href="/User/products">
      <div 
        ref={ref}
        className={`relative rounded-xl overflow-hidden shadow-lg transform transition-all duration-700 group ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        {/* Image Container with hover zoom effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url('${category.image}')` }}
        />
        
        {/* Gradient Overlay with hover darkening */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30 group-hover:from-black/90 group-hover:to-black/50 transition-all duration-500" />
        
        {/* Content Container */}
        <div className="relative h-80 flex flex-col justify-end p-6">
          <div>
            <h3 className="text-2xl font-light text-white mb-1 tracking-wider group-hover:font-normal transition-all">
              {category.name}
            </h3>
            <p className="text-gray-200 font-light text-sm mb-5 group-hover:font-normal transition-all">
              {category.description}
            </p>
            
            {/* Animated Shop Now Button */}
            <div className="mt-6 inline-flex items-center space-x-2 px-6 py-2 bg-white text-black rounded-full text-sm font-light tracking-wide hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
              <span>Shop Now</span>
              <ArrowRight 
                className="h-4 w-4 transition-transform duration-300 transform group-hover:translate-x-1" 
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// New Product Card Component
function ProductCard({ product, index }: { product: any, index: number }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div 
      ref={ref}
      className={`relative bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-700 group ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Product Image */}
      <div className="relative h-80 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url('${product.image}')` }}
        />
      </div>
      
      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-xl font-light text-gray-900 mb-2 group-hover:font-normal transition-all">
          {product.name}
        </h3>
        <p className="text-lg font-medium text-gray-900">{product.price}</p>
        
        {/* Quick Add to Cart */}
        <div className="mt-6 flex justify-between items-center">
          <div className="flex space-x-1">
            {['S','M','L','XL'].map((size) => (
              <div 
                key={size} 
                className="w-8 h-8 flex items-center justify-center border border-gray-200 text-sm cursor-pointer hover:border-black transition-colors"
              >
                {size}
              </div>
            ))}
          </div>
          <button className="cursor-pointer px-4 py-2 bg-black text-white rounded-full text-sm font-light tracking-wide hover:bg-gray-800 transition-colors duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

function MilestoneCard({ title, value, description, delay }: { title: string, value: string, description: string, delay: number }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div 
      ref={ref}
      className={`relative bg-gradient-to-br from-gray-50 to-white rounded-xl overflow-hidden shadow-lg p-8 transform transition-all duration-700 group ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
        <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
    <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="1" fill="black" />
    </pattern>
    <rect x="0" y="0" width="100" height="100" fill="url(#pattern)" />
  </svg>
</div>
      <div className="absolute top-0 right-0 w-24 h-24 bg-gray-100 rounded-bl-full transition-all duration-500 group-hover:w-full group-hover:h-full"></div>
      
      <div className="relative z-10">
        
        <div className="text-5xl md:text-6xl font-light text-gray-900 mb-4 transition-all duration-500 group-hover:text-black">
          {value}
        </div>
        <h3 className="text-xl font-light text-gray-700 mb-2 group-hover:font-normal transition-all">
          {title}
        </h3>
        <p className="text-gray-500 group-hover:text-gray-700 transition-all">
          {description}
        </p>
      </div>
    </div>
  );
}

function TestimonialCard({ quote, author, role, rating, image, delay }: 
  { quote: string, author: string, role: string, rating: number, image: string, delay: number }) {
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div 
      ref={ref}
      className={`bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-700 group hover:shadow-xl ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex flex-col h-full">
        {/* Quote Icon */}
        <div className="mb-6 text-gray-300 group-hover:text-black transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
          </svg>
        </div>
        
        {/* Testimonial Text */}
        <p className="text-gray-700 text-lg italic mb-8 flex-grow group-hover:text-gray-900 transition-colors">
          `{quote}`
        </p>
        
        {/* Author Info */}
        <div className="flex items-center">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white group-hover:border-black transition-colors">
              <img 
                src={image} 
                alt={author} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md group-hover:bg-black transition-colors">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-6 h-6" />
            </div>
          </div>
          
          <div className="ml-4">
            <h4 className="font-medium text-gray-900 group-hover:text-black transition-colors">{author}</h4>
            <p className="text-gray-600 text-sm">{role}</p>
            <div className="flex mt-1">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i}
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}