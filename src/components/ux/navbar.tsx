"use client"; 

import { useState, useEffect } from 'react';
import { Menu, Search, Heart, User, ShoppingBag, X } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);

  return (
    <header className="w-full border-b sticky top-0 bg-white z-40">
      <nav className="flex items-center justify-between px-4 sm:px-6 py-4">
        {/* Left Section - Hamburger & Search */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="hidden sm:flex items-center gap-2 text-sm">
            <Search className="h-4 w-4" />
            <span>Search</span>
          </div>
        </div>

        {/* Center Logo */}
        <Link href="/">
          <div className="text-base sm:text-lg font-semibold tracking-widest">
            FOREVER YOUNG
          </div>
        </Link>

        {/* Right Section - Icons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="" className="hidden sm:block">
            <span className="text-sm">Contact Us</span>
          </Link>
          <Link href="" className="p-2">
            <Heart className="h-5 w-5" />
          </Link>
          <Link href="/User/login" className="p-2">
            <User className="h-5 w-5" />
          </Link>
          <Link href="/User/cart" className="p-2 relative">
            <ShoppingBag className="h-5 w-5" />
            <Badge
              variant="secondary"
              className="absolute top-0 right-0 h-4 w-4 text-xs flex items-center justify-center"
            >
              0
            </Badge>
          </Link>
        </div>
      </nav>

      {/* Sidebar with Animation */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsSidebarOpen(false)}
            />
            
            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 h-screen w-full sm:w-80 bg-white z-50 shadow-xl"
            >
              <div className="p-4 sm:p-5 border-b flex justify-between items-center">
                <h2 className="text-lg sm:text-xl font-bold">Menu</h2>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <nav className="py-2 sm:py-4">
                {['Home', 'Shop', 'Collections', 'About', 'New Arrivals'].map((item) => (
                  <a 
                    key={item}
                    href="#"    
                    className="block py-3 px-4 sm:px-6 text-base sm:text-lg hover:bg-gray-100 transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </nav>
              
              <div className="absolute bottom-0 w-full p-4 sm:p-6 border-t">
                <div className="flex flex-col gap-2 sm:gap-3">
                  <Button variant="outline" className="text-sm sm:text-base">
                    Account Settings
                  </Button>
                  <Button className="text-sm sm:text-base">Sign Out</Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}