// app/cart/page.tsx
"use client";

import Navbar from "@/components/ux/navbar";
import Footer from "@/components/ux/footer";
import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { X, Plus, Minus, ShieldCheck, Truck, CreditCard } from "lucide-react";
import Link from "next/link";

// Define cart item type
type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
};

export default function CartPage() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Load cart from localStorage on initial render
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  const recentlyViewed = [
    {
      name: "Modern Sunglasses",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Leather Handbag",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Classic Denim Shirt",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Minimalist Watch",
      price: 159.99,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
  ];

  useEffect(() => {
    if (cartItems.length === 0 && typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (!savedCart) {
        const exampleItems = [
          {
            id: 1,
            name: "Premium Leather Jacket",
            price: 299.99,
            quantity: 1,
            size: "M",
            image:
              "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          },
          {
            id: 2,
            name: "Classic Denim Shirt",
            price: 89.99,
            quantity: 2,
            size: "L",
            image:
              "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          },
          {
            id: 3,
            name: "Designer Sneakers",
            price: 149.99,
            quantity: 1,
            size: "42",
            image:
              "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          },
        ];
        setCartItems(exampleItems);
        localStorage.setItem("cart", JSON.stringify(exampleItems));
      }
    }
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });

    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.pageYOffset;
        parallaxRef.current.style.transform = `translateY(${
          scrollPosition * 0.4
        }px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate cart totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 15.0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedItems);
    // Save to localStorage
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  // Remove item from cart
  const removeItem = (id: number) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    // Save to localStorage
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />

      {/* Hero Section with Parallax */}
      <div className="relative h-96 flex items-center justify-center overflow-hidden">
        <div
          ref={parallaxRef}
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.7)",
            transform: "translateY(0px)",
            transition: "transform 0.1s ease-out",
          }}
        />

        <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/70 to-black/30" />

        <div className="relative z-10 text-center text-white max-w-4xl px-4">
          <h1 className="text-4xl md:text-6xl font-light tracking-wider mb-4 animate-fade-in">
            YOUR CART
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-90">
            Review your carefully selected items
          </p>
        </div>
      </div>

      {/* Cart Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                  <h2 className="text-2xl font-light text-gray-900">
                    Shopping Cart ({cartItems.length} items)
                  </h2>
                </div>

                {cartItems.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="text-2xl font-light text-gray-400 mb-4">
                      Your cart is empty
                    </div>
                    <Link
                      href="/"
                      className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-full text-base font-light tracking-wider hover:bg-black transition-colors shadow-md hover:shadow-lg"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="divide-y divide-gray-100">
                      {cartItems.map((item, index) => (
                        <div
                          key={item.id}
                          className="p-6 flex flex-col sm:flex-row gap-6 group hover:bg-gray-50 transition-all duration-300"
                          data-aos="fade-up"
                          data-aos-delay={index * 100}
                        >
                          {/* Product Image */}
                          <div className="flex-shrink-0 relative">
                            <div className="rounded-xl w-32 h-32 sm:w-40 sm:h-40 overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          </div>

                          {/* Product Info */}
                          <div className="flex-grow">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="text-xl font-light text-gray-900 mb-1">
                                  {item.name}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                  Size: {item.size}
                                </p>
                              </div>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors self-start"
                              >
                                <X className="h-5 w-5" />
                              </button>
                            </div>

                            <div className="mt-6 flex flex-wrap items-center justify-between">
                              {/* Quantity Selector */}
                              <div className="flex items-center border border-gray-200 rounded-full px-4 py-2 bg-white shadow-sm">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  className="text-gray-500 hover:text-black p-1 disabled:opacity-30"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="mx-4 text-gray-900 min-w-[20px] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  className="text-gray-500 hover:text-black p-1"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>

                              {/* Price */}
                              <div className="text-xl font-light text-gray-900 mt-4 sm:mt-0">
                                Rs{(item.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Continue Shopping */}
                    <div className="p-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center bg-gradient-to-r from-gray-50 to-white">
                      <Link
                        href="/"
                        className="text-gray-600 hover:text-black inline-flex items-center mb-4 sm:mb-0"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Continue Shopping
                      </Link>

                      <button
                        onClick={() => {
                          // In a real app, this would save cart changes to the backend
                          alert("Cart updated successfully!");
                        }}
                        className="px-6 py-3 bg-gray-900 text-white rounded-full text-base font-light tracking-wider hover:bg-black transition-colors shadow-md hover:shadow-lg"
                      >
                        Update Cart
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Shipping Notice */}
              <div
                className="mt-8 bg-gradient-to-r from-gray-50 to-white rounded-2xl shadow-xl p-6 border border-gray-100"
                data-aos="fade-up"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-50 rounded-xl w-14 h-14 flex items-center justify-center">
                    <Truck className="h-8 w-8 text-blue-500" />
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-light text-gray-900 mb-2">
                      Free Shipping on Orders Over Rs200
                    </h3>
                    <p className="text-gray-600">
                      You`re Rs{(200 - subtotal).toFixed(2)} away from free
                      shipping!
                    </p>
                    <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
                        style={{
                          width: `${Math.min(100, (subtotal / 200) * 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-6 sticky top-8 border border-gray-100"
                data-aos="fade-left"
              >
                <h2 className="text-2xl font-light text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-light">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-light">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-light">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-gray-200">
                    <span className="text-lg font-light">Total</span>
                    <span className="text-xl font-light">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Link href="/User/checkout">
                  <button
                    disabled={cartItems.length === 0}
                    className={` cursor-pointer mt-8 w-full px-6 py-4 bg-gradient-to-r from-gray-900 to-black text-white rounded-xl text-base font-light tracking-wider hover:opacity-95 transition-opacity shadow-lg ${
                      cartItems.length === 0
                        ? "opacity-60 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {cartItems.length > 0
                      ? "Proceed to Checkout"
                      : "Cart is Empty"}
                  </button>
                </Link>

                <div className="mt-6 text-center">
                  <p className="text-gray-600 text-sm">
                    or{" "}
                    <Link
                      href="/"
                      className="text-black hover:underline font-medium"
                    >
                      Continue Shopping
                    </Link>
                  </p>
                </div>

                {/* Payment Methods */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-light text-gray-900 mb-4">
                    We Accept
                  </h3>
                  <div className="flex justify-center space-x-6">
                    <div className="cursor-pointer bg-gray-100 rounded-xl w-14 h-10 flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-gray-500" />
                    </div>
                    <div className="cursor-pointer bg-gray-100 rounded-xl w-14 h-10 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-5 w-5 text-blue-600"
                      >
                        <path
                          fill="currentColor"
                          d="M11.5 4a7.5 7.5 0 0 0-7.456 8.06l-2.858 6.917a.5.5 0 0 0 .656.65l6.456-2.7A7.5 7.5 0 1 0 11.5 4zm0 14a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13z"
                        />
                      </svg>
                    </div>
                    <div className="cursor-pointer bg-gray-100 rounded-xl w-14 h-10 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-5 w-5 text-yellow-500"
                      >
                        <path
                          fill="currentColor"
                          d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"
                        />
                        <circle cx="12" cy="12" r="4" fill="currentColor" />
                      </svg>
                    </div>
                    <div className="cursor-pointer bg-gray-100 rounded-xl w-14 h-10 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-5 w-5 text-purple-500"
                      >
                        <path
                          fill="currentColor"
                          d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"
                        />
                        <path
                          fill="currentColor"
                          d="M16 8h-8v8h8V8zm-6 6v-4h4v4h-4z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div
                className="mt-8 bg-gradient-to-r from-gray-50 to-white rounded-2xl shadow-xl p-6 border border-gray-100"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-50 rounded-xl w-14 h-14 flex items-center justify-center">
                    <ShieldCheck className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-light text-gray-900 mb-1">
                      Secure Checkout
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Your information is protected with 256-bit encryption
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recently Viewed */}
          <div className="mt-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-gray-900">
                Recently Viewed
              </h2>
              <p className="mt-2 text-gray-600">
                Items you might be interested in
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentlyViewed.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="h-64 overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-light text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 font-medium">
                      Rs{item.price.toFixed(2)}
                    </p>
                    <button className="cursor-pointer mt-4 w-full py-3 bg-gray-100 text-gray-900 rounded-xl text-sm font-light tracking-wider group-hover:bg-black group-hover:text-white transition-all duration-300">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
