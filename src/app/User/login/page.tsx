// app/login/page.tsx
"use client";

import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useState, useRef } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [flipping, setFlipping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Password visibility states
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", { email, password });
    // Add your authentication logic here
  };

  const handleToggle = () => {
    setFlipping(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setFlipping(false);
    }, 300); // Matches the flip animation duration
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gray-900">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1601924994987-69e26d50dc26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')"
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Home Button */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 z-10 flex items-center text-white hover:text-gray-200 transition-colors"
      >
        <ArrowLeft className="mr-2" size={20} />
        <span className="font-light">Home</span>
      </Link>

      {/* Login Container with Flip Animation */}
      <div 
        ref={containerRef}
        className={`relative z-10 w-full max-w-5xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 ease-in-out ${flipping ? "opacity-70 scale-95" : "opacity-100 scale-100"}`}
        id="login">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Panel 1 - Form Panel */}
          <div className={`p-10 flex flex-col justify-between transition-all duration-300 ${isLogin ? "bg-white order-1" : "bg-gradient-to-br from-gray-900 to-black text-white order-2"}`}>
            {isLogin ? (
              // Login Form
              <div>
                <div className="text-center mb-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-gray-900 to-black rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold">FY</span>
                    </div>
                  </div>
                  <h1 className="text-2xl font-light text-gray-800 mb-2">
                    Welcome to Forever Young
                  </h1>
                  <p className="text-gray-600">
                    Sign in to continue your journey
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div className="mb-6 relative">
                    <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                    <div className="relative">
                      <input
                        type={showLoginPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 pr-10"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 mt-1"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                      >
                        {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="remember"
                        className="w-4 h-4 text-gray-800 border-gray-300 rounded focus:ring-gray-800"
                      />
                      <label htmlFor="remember" className="ml-2 text-gray-700">
                        Remember me
                      </label>
                    </div>
                    
                    <Link href="#" className="text-gray-800 hover:underline">
                      Forgot password?
                    </Link>
                  </div>

                  <Link  href="/" >
                    <button
                      type="submit"
                      className="cursor-pointer w-full py-3 bg-gradient-to-r from-gray-900 to-black text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Sign In
                    </button>
                 </Link>
                </form>
              </div>
            ) : (
              // Signup Form
              <div>
                <div className="text-center mb-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-gray-900 to-black rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold text-black">FY</span>
                    </div>
                  </div>
                  <h1 className="text-2xl font-light mb-2">
                    Create Your Account
                  </h1>
                  <p className="text-gray-300">
                    Create an account to get started
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="signup-email" className="block mb-2">Email Address</label>
                    <input
                      type="email"
                      id="signup-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 bg-gray-800 text-white"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div className="mb-6 relative">
                    <label htmlFor="signup-password" className="block mb-2">Password</label>
                    <div className="relative">
                      <input
                        type={showSignupPassword ? "text" : "password"}
                        id="signup-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 bg-gray-800 text-white pr-10"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-200 mt-1"
                        onClick={() => setShowSignupPassword(!showSignupPassword)}
                      >
                        {showSignupPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="mb-6 relative">
                    <label htmlFor="confirm-password" className="block mb-2">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirm-password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 bg-gray-800 text-white pr-10"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-200 mt-1"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="mb-8 flex items-center">
                    <input
                      type="checkbox"
                      id="terms"
                      className="w-4 h-4 text-gray-800 border-gray-300 rounded focus:ring-gray-300"
                    />
                    <label htmlFor="terms" className="ml-2">
                      I agree to the Terms and Conditions
                    </label>
                  </div>

                  <button
                    onClick={handleToggle}
                    type="submit"
                    className="w-full py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    Create Account
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Panel 2 - Promotion Panel */}
          <div className={`p-10 text-white flex flex-col justify-between transition-all duration-300 ${isLogin ? "bg-gradient-to-br from-gray-900 to-black order-2" : "bg-white order-1"}`}>
            {isLogin ? (
              // Login Promotion (Signup options)
              <div>
                <div>
                  <h2 className="text-3xl font-light mb-6">Create Your Account</h2>
                  <p className="text-gray-300 mb-10 max-w-md">
                    Sign up to unlock exclusive features and personalized shopping experiences. 
                    Join our community of fashion enthusiasts today.
                  </p>
                </div>

                <div>
                  <button className="w-full flex items-center justify-center py-3 px-4 mb-4 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                    <FcGoogle className="mr-3 text-xl" />
                    <span>Sign up with Google</span>
                  </button>
                  
                  <button className="w-full flex items-center justify-center py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    <FaFacebook className="mr-3 text-xl" />
                    <span>Sign up with Facebook</span>
                  </button>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-gray-400">
                    Don`t have an account?
                    <button 
                      onClick={handleToggle}
                      className="ml-2 text-white font-medium hover:underline"
                    >
                      Sign Up
                    </button>
                  </p>
                </div>
              </div>
            ) : (
              // Signup Promotion (Login options)
              <div className="text-gray-800">
                <div>
                  <h2 className="text-3xl font-light mb-6">Already Have An Account?</h2>
                  <p className="text-gray-600 mb-10 max-w-md">
                    Login to access your account and continue your shopping experience. 
                    We`re glad to have you back.
                  </p>
                </div>

                <div>
                  <button className="w-full flex items-center justify-center py-3 px-4 mb-4 bg-gray-100 text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                    <FcGoogle className="mr-3 text-xl" />
                    <span>Login with Google</span>
                  </button>
                  
                  <button className="w-full flex items-center justify-center py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    <FaFacebook className="mr-3 text-xl" />
                    <span>Login with Facebook</span>
                  </button>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    Already have an account?
                    <button 
                      onClick={handleToggle}
                      className="ml-2 text-gray-900 font-medium hover:underline"
                    >
                      Login
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}