// src/components/ux/footer.tsx
"use client";

import { useState } from 'react';
import { MapPin, Mail, Phone, Clock, Instagram, Facebook, Twitter, Linkedin, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="bg-gray-200 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-gray-800/10 to-transparent rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-r from-gray-800/5 to-transparent rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
      
      {/* Top Section */}
      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-10 px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto z-10">
        {/* Store Location Map */}
        <div className="lg:col-span-2">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xl font-light tracking-wider mb-6 pb-2 border-b border-gray-700"
          >
            <MapPin className="inline mr-2 h-5 w-5" />
            OUR STORE
          </motion.h3>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-xl overflow-hidden shadow-xl h-80 border border-gray-700"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.616769385934!2d85.34227723600524!3d27.672654662953946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb197d972c66a9%3A0x711aca3f4d5067c3!2sFOREVERYOUNG%208848!5e1!3m2!1sen!2snp!4v1749055302190!5m2!1sen!2snp" 
              width="100%" 
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="filter grayscale-[25%] hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
          >
            <div className="flex items-center group">
              <MapPin className="h-5 w-5 mr-2 text-black group-hover:text-gray-500 transition-colors" />
              <span className="text-black group-hover:text-gray-500 transition-colors">Forever Young, Koteshwor, Balkumari</span>
            </div>
            <div className="flex items-center group">
              <Phone className="h-5 w-5 mr-2 text-black group-hover:text-gray-500 transition-colors" />
              <span className="text-black group-hover:text-gray-500 transition-colors">+977-9803454603</span>
            </div>
            <div className="flex items-center group">
              <Clock className="h-5 w-5 mr-2 text-black group-hover:text-gray-500 transition-colors" />
              <span className="text-black group-hover:text-gray-500 transition-colors">Sun-Fri: 7AM - 9PM</span>
            </div>
          </motion.div>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xl font-light tracking-wider mb-6 pb-2 border-b border-gray-700"
          >
            <Mail className="inline mr-2 h-5 w-5" />
            NEWSLETTER
          </motion.h3>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-700 mb-6"
          >
            Subscribe to receive updates, access to exclusive deals, and style inspiration.
          </motion.p>
          
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-200 border border-black focus:border-gray-400 focus:outline-none transition-colors placeholder-gray-800"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-gray-200 to-gray-400 border border-gray-900 rounded-lg font-light tracking-wider hover:from-gray-400 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">
                {subscribed ? 'THANK YOU!' : 'SUBSCRIBE'}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-black to-gray-900 opacity-0 group-hover:opacity-3 transition-opacity duration-300"></span>
            </button>
          </motion.form>

          {subscribed && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-3 bg-white border border-gray-900 rounded-lg text-center"
            >
              <p className="text-green-400">You`ve been subscribed to our newsletter!</p>
            </motion.div>
          )}

          <motion.div 
            className="mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-lg font-light mb-4">CONNECT WITH US</h4>
            <div className="flex space-x-4">
              <motion.a 
                whileHover={{ scale: 1.1 }}
                href="#" 
                className="p-3 bg-gray-200 rounded-full hover:bg-gradient-to-r hover:from-pink-600 hover:to-pink-800 transition-all duration-300 group"
              >
                <Instagram className="h-5 w-5 group-hover:text-white" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1 }}
                href="#" 
                className="p-3 bg-gray-200 rounded-full hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 transition-all duration-300 group"
              >
                <Facebook className="h-5 w-5 group-hover:text-white" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1 }}
                href="#" 
                className="p-3 bg-gray-200 rounded-full hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-700 transition-all duration-300 group"
              >
                <Twitter className="h-5 w-5 group-hover:text-white" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1 }}
                href="#" 
                className="p-3 bg-gray-200 rounded-full hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 transition-all duration-300 group"
              >
                <Linkedin className="h-5 w-5 group-hover:text-white" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Middle Section - Links */}
      <div className="border-t border-gray-800 py-12 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h4 className="text-lg font-light tracking-wider mb-4">ABOUT US</h4>
            <ul className="space-y-3 text-gray-800">
              {['Our Story', 'Careers', 'Sustainability', 'Press', 'Corporate'].map((item, index) => (
                <motion.li 
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group"
                >
                  <a href="#" className="hover:text-black transition-colors flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h4 className="text-lg font-light tracking-wider mb-4">CUSTOMER CARE</h4>
            <ul className="space-y-3 text-gray-800">
              {['Contact Us', 'FAQs', 'Shipping', 'Returns', 'Order Tracking'].map((item, index) => (
                <motion.li 
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group"
                >
                  <a href="#" className="hover:text-black transition-colors flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h4 className="text-lg font-light tracking-wider mb-4">SHOP</h4>
            <ul className="space-y-3 text-gray-800">
              {['New Arrivals', 'Best Sellers', 'Seasonal Collections', 'Gift Cards', 'Sale'].map((item, index) => (
                <motion.li 
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group"
                >
                  <a href="#" className="hover:text-black transition-colors flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <h4 className="text-lg font-light tracking-wider mb-4">LEGAL</h4>
            <ul className="space-y-3 text-gray-800">
              {['Terms & Conditions', 'Privacy Policy', 'Cookie Policy', 'Accessibility', 'Sitemap'].map((item, index) => (
                <motion.li 
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group"
                >
                  <a href="#" className="hover:text-black transition-colors flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-gray-200 py-8 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-4 md:mb-0"
            >
              <p className="text-gray-900 text-sm">
                &copy; {new Date().getFullYear()} FOREVER YOUNG. All rights reserved.
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center space-x-4">
                <div className=" p-2 rounded-lg border border-gray-700">
                  <Image
                    src="/images/esewaa.png"
                    alt="Esewa Wallet"
                    width={60}
                    height={30}
                    className="opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
              
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}