// app/checkout/page.tsx
"use client";

import Navbar from "@/components/ux/navbar";
import Footer from "@/components/ux/footer";
import { useState, useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { X, Plus, Minus, ShieldCheck, Truck, CreditCard, ArrowLeft, Check, Lock } from 'lucide-react';
import Link from "next/link";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
};

type Address = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

type Payment = {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
};

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
   const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });
  
  const [address, setAddress] = useState<Address>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States'
  });
  
  const [payment, setPayment] = useState<Payment>({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });
  
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });

    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.pageYOffset;
        parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.4}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate cart totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = shippingMethod === 'express' ? 25.00 : 15.00;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Update item quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedItems = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  // Remove item from cart
  const removeItem = (id: number) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format card number with spaces every 4 digits
    if (name === 'cardNumber') {
      const formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{4})(?=\d)/g, '$1 ')
        .substring(0, 19);
      setPayment(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    // Format expiry date as MM/YY
    if (name === 'expiry') {
      const formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d{0,4})/, '$1/$2')
        .substring(0, 5);
      setPayment(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    setPayment(prev => ({ ...prev, [name]: value }));
  };

  const validateStep1 = () => {
    return (
      address.firstName.trim() !== '' &&
      address.lastName.trim() !== '' &&
      address.email.trim() !== '' &&
      /^\S+@\S+\.\S+$/.test(address.email) &&
      address.phone.trim() !== '' &&
      address.address.trim() !== '' &&
      address.city.trim() !== '' &&
      address.state.trim() !== '' &&
      address.zip.trim() !== ''
    );
  };

  const validateStep2 = () => {
    return (
      payment.cardNumber.replace(/\s/g, '').length === 16 &&
      payment.cardName.trim() !== '' &&
      payment.expiry.length === 5 &&
      payment.cvv.length === 3
    );
  };

  const handleSubmitOrder = () => {
    // In a real app, this would send data to a backend
    // Generate random order number
    const orderNum = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(orderNum);
    setOrderComplete(true);
    
    // Clear cart
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const renderStepIndicator = () => {
    const steps = [
      { number: 1, title: 'Shipping' },
      { number: 2, title: 'Payment' },
      { number: 3, title: 'Review' }
    ];
    
    return (
      <div className="flex justify-between items-center mb-12 max-w-3xl mx-auto relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
        {steps.map(step => (
          <div key={step.number} className="flex flex-col items-center relative">
            <button
              onClick={() => setCurrentStep(step.number)}
              disabled={step.number > currentStep}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-light transition-all duration-300 ${
                step.number === currentStep 
                  ? 'bg-black text-white scale-110' 
                  : step.number < currentStep 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100 text-gray-400'
              }`}
            >
              {step.number < currentStep ? <Check size={20} /> : step.number}
            </button>
            <span className={`mt-2 text-sm font-medium ${
              step.number === currentStep ? 'text-black' : 'text-gray-500'
            }`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
            <h3 className="text-xl font-light text-gray-900 mb-6">Shipping Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={address.firstName}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="John"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={address.lastName}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Doe"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={address.email}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={address.phone}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="(123) 456-7890"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-gray-700 text-sm font-medium mb-2">Street Address</label>
                <input
                  type="text"
                  name="address"
                  value={address.address}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="123 Main St"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={address.city}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="New York"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">State</label>
                <input
                  type="text"
                  name="state"
                  value={address.state}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="NY"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">ZIP Code</label>
                <input
                  type="text"
                  name="zip"
                  value={address.zip}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="10001"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Country</label>
                <select
                  name="country"
                  value={address.country}
                  onChange={(e) => setAddress(prev => ({ ...prev, country: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>Australia</option>
                  <option>Germany</option>
                </select>
              </div>
            </div>
            
            <h3 className="text-xl font-light text-gray-900 mt-8 mb-4">Shipping Method</h3>
            <div className="space-y-4">
              <div 
                className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  shippingMethod === 'standard' ? 'border-black' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setShippingMethod('standard')}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 ${
                    shippingMethod === 'standard' ? 'border-black' : 'border-gray-300'
                  }`}>
                    {shippingMethod === 'standard' && <div className="w-2 h-2 bg-black rounded-full"></div>}
                  </div>
                  <div>
                    <h4 className="font-medium">Standard Shipping</h4>
                    <p className="text-gray-600 text-sm">3-5 business days</p>
                  </div>
                </div>
                <div className="font-medium">${shipping.toFixed(2)}</div>
              </div>
              
              <div 
                className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  shippingMethod === 'express' ? 'border-black' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setShippingMethod('express')}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 ${
                    shippingMethod === 'express' ? 'border-black' : 'border-gray-300'
                  }`}>
                    {shippingMethod === 'express' && <div className="w-2 h-2 bg-black rounded-full"></div>}
                  </div>
                  <div>
                    <h4 className="font-medium">Express Shipping</h4>
                    <p className="text-gray-600 text-sm">1-2 business days</p>
                  </div>
                </div>
                <div className="font-medium">$25.00</div>
              </div>
            </div>
            
            <div className="flex justify-between mt-8">
              <Link href="/cart" className="flex items-center text-gray-600 hover:text-black">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Cart
              </Link>
              <button
                onClick={() => validateStep1() && setCurrentStep(2)}
                disabled={!validateStep1()}
                className={`px-6 py-3 rounded-full text-base font-light tracking-wider transition-colors shadow-md ${
                  validateStep1() 
                    ? 'bg-black text-white hover:bg-gray-800' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Continue to Payment
              </button>
            </div>
          </div>
        );
      
      case 2:
         return (
    <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
      <h3 className="text-xl font-light text-gray-900 mb-6">Payment Method</h3>
      
      <div className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-xl">
          <p className="text-gray-800 mb-4">
            You will be redirected to eSewa to complete your payment securely.
          </p>
          <div className="flex items-center">
            <div className="bg-[#55a747] w-12 h-12 rounded-lg flex items-center justify-center mr-4">
              <span className="text-white font-bold text-xl">e</span>
            </div>
            <div>
              <h4 className="font-medium">eSewa Payment Gateway</h4>
              <p className="text-sm text-gray-600">
                Pay with your eSewa account - fast, secure and easy
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                After clicking "Pay with eSewa", you'll be redirected to the eSewa payment page to complete your transaction securely.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setCurrentStep(1)}
          className="flex items-center px-6 py-3 bg-gray-100 text-gray-900 rounded-full text-base font-light tracking-wider hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Shipping
        </button>
        <button
          onClick={() => setCurrentStep(3)}
          className="px-6 py-3 bg-gradient-to-r from-[#55a747] to-[#4a9740] text-white rounded-full text-base font-light tracking-wider hover:opacity-90 transition-opacity shadow-md flex items-center"
        >
          <Lock className="h-4 w-4 mr-2" /> Pay with eSewa
        </button>
      </div>
    </div>
  );
      
      case 3:
        return (
          <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
            <h3 className="text-xl font-light text-gray-900 mb-6">Review Your Order</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Shipping Information</h4>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-gray-800">{address.firstName} {address.lastName}</p>
                  <p className="text-gray-800">{address.address}</p>
                  <p className="text-gray-800">{address.city}, {address.state} {address.zip}</p>
                  <p className="text-gray-800">{address.country}</p>
                  <p className="text-gray-800 mt-2">{address.email}</p>
                  <p className="text-gray-800">{address.phone}</p>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="font-medium">Shipping Method</p>
                    <p className="text-gray-800">
                      {shippingMethod === 'standard' ? 'Standard Shipping (3-5 days)' : 'Express Shipping (1-2 days)'}
                    </p>
                  </div>
                </div>
                
                <h4 className="font-medium text-gray-900 mt-8 mb-4">Payment Method</h4>
                <div className="bg-gray-50 p-4 rounded-xl">
 <div className="flex items-center">
    <div className="bg-[#55a747] w-8 h-8 rounded-md flex items-center justify-center mr-3">
      <span className="text-white font-bold text-lg">e</span>
    </div>
    <p className="text-gray-800">eSewa Payment Gateway</p>
  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Order Summary</h4>
                <div className="bg-gray-50 p-4 rounded-xl">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                      <div className="flex items-center">
                        <div className="w-16 h-16 rounded-lg overflow-hidden mr-4">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-gray-600 text-sm">Size: {item.size}</p>
                          <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  
                  <div className="pt-4 mt-4 border-t border-gray-200">
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-2 mt-2">
                      <span className="text-lg font-medium">Total</span>
                      <span className="text-lg font-medium">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentStep(2)}
                className="flex items-center px-6 py-3 bg-gray-100 text-gray-900 rounded-full text-base font-light tracking-wider hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Payment
              </button>
              <button
                onClick={handleSubmitOrder}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-full text-base font-light tracking-wider hover:opacity-90 transition-opacity shadow-md"
              >
                Place Order
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderOrderComplete = () => {
    return (
      <div className="bg-white rounded-2xl shadow-md p-8 max-w-3xl mx-auto text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="h-10 w-10 text-green-600" />
        </div>
        
        <h2 className="text-3xl font-light text-gray-900 mb-4">Order Confirmed!</h2>
        <p className="text-gray-600 text-lg mb-8">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <p className="text-gray-800 mb-2">Your order number is:</p>
          <p className="text-2xl font-medium text-gray-900 mb-6">{orderNumber}</p>
          
          <p className="text-gray-600">
            We`ve sent a confirmation email to <span className="font-medium">{address.email}</span> with your order details.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto">
          <Link 
            href="/" 
            className="px-6 py-3 bg-black text-white rounded-full text-base font-light tracking-wider hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
          
          <Link 
            href="/account/orders" 
            className="px-6 py-3 bg-gray-100 text-gray-900 rounded-full text-base font-light tracking-wider hover:bg-gray-200 transition-colors"
          >
            View Order History
          </Link>
        </div>
      </div>
    );
  };

  if (cartItems.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navbar />
        
        <div className="relative h-60 flex items-center justify-center overflow-hidden">
          <div 
            ref={parallaxRef}
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.7)',
              transform: 'translateY(0px)',
              transition: 'transform 0.1s ease-out'
            }}
          />
          
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/70 to-black/30" />
          
          <div className="relative z-10 text-center text-white max-w-4xl px-4">
            <h1 className="text-4xl md:text-5xl font-light tracking-wider mb-4">
              CHECKOUT
            </h1>
          </div>
        </div>
        
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-xl p-12">
              <h2 className="text-2xl font-light text-gray-900 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">
                Add items to your cart before proceeding to checkout.
              </p>
              <Link 
                href="/" 
                className="inline-block px-6 py-3 bg-black text-white rounded-full text-base font-light tracking-wider hover:bg-gray-800 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      
      <div className="relative h-60 flex items-center justify-center overflow-hidden">
        <div 
          ref={parallaxRef}
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.7)',
            transform: 'translateY(0px)',
            transition: 'transform 0.1s ease-out'
          }}
        />
        
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/70 to-black/30" />
        
        <div className="relative z-10 text-center text-white max-w-4xl px-4">
          <h1 className="text-4xl md:text-5xl font-light tracking-wider mb-4">
            {orderComplete ? 'ORDER CONFIRMED' : 'CHECKOUT'}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            {orderComplete ? 'Thank you for your purchase' : 'Complete your purchase'}
          </p>
        </div>
      </div>
      
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {orderComplete ? (
            renderOrderComplete()
          ) : (
            <>
              {renderStepIndicator()}
              {renderStepContent()}
              
              <div className="mt-12 bg-gradient-to-r from-gray-50 to-white rounded-2xl shadow-xl p-6 border border-gray-100">
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
            </>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
}