'use client'
import { useState, useEffect } from 'react';
import { Car, MapPin, Calendar, Star, ArrowRight, Heart, Sparkles } from 'lucide-react';
import Link from 'next/link';
export default function CarRentalIntro() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentCar, setCurrentCar] = useState(0);

  const cars = [
    { name: "Sunny Beetle", type: "Compact & Cute", color: "bg-yellow-400", emoji: "🚗" },
    { name: "Ocean Breeze", type: "Convertible", color: "bg-blue-400", emoji: "🏎️" },
    { name: "Forest Explorer", type: "SUV Adventure", color: "bg-green-400", emoji: "🚙" }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentCar((prev) => (prev + 1) % cars.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 animate-bounce delay-1000">
          <Heart className="w-6 h-6 text-pink-400 opacity-60" />
        </div>
        <div className="absolute top-40 right-20 animate-bounce delay-500">
          <Sparkles className="w-8 h-8 text-purple-400 opacity-60" />
        </div>
        <div className="absolute bottom-40 left-20 animate-bounce delay-700">
          <Star className="w-5 h-5 text-yellow-400 opacity-60" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
            <Car className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Propelize
          </span>
        </div>
        <div className="hidden md:flex space-x-8 text-gray-600">
          <a href="#" className="hover:text-purple-500 transition-colors">Cars</a>
          <a href="#" className="hover:text-purple-500 transition-colors">About</a>
          <a href="#" className="hover:text-purple-500 transition-colors">Contact</a>
        </div>
        <Link href="/signUp">
        <button className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all">
          Sign In
        </button>
        </Link>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 pt-12 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 border border-pink-200">
                <Sparkles className="w-4 h-4 text-pink-500" />
                <span className="text-sm text-gray-600">Your adventure starts here!</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Rent Your
                </span>
                <br />
                <span className="text-gray-800">Dream Car</span>
                <br />
                <span className="text-4xl lg:text-5xl">Today! ✨</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Discover amazing cars for every journey. From cute city rides to adventure-ready SUVs, 
                we make car rental as delightful as your destination.
              </p>
            </div>

            {/* Search Bar */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                  <MapPin className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold">Choose city</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                  <Calendar className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-semibold">Pick dates</p>
                  </div>
                </div>
                <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl p-3 hover:shadow-lg transform hover:scale-105 transition-all flex items-center justify-center space-x-2">
                  <span className="font-semibold">Search</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">1000+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-500">50+</div>
                <div className="text-gray-600">Car Models</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500">24/7</div>
                <div className="text-gray-600">Support</div>
              </div>
            </div>
          </div>

          {/* Right Content - Car Showcase */}
          <div className={`relative transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
            <div className="relative">
              {/* Background Decorative Elements */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 rounded-full blur-3xl opacity-30 transform scale-110"></div>
              
              {/* Car Display */}
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
                <div className="text-center space-y-6">
                  <div className="text-8xl transform transition-all duration-500 hover:scale-110">
                    {cars[currentCar].emoji}
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-800">{cars[currentCar].name}</h3>
                    <p className="text-purple-600 font-semibold">{cars[currentCar].type}</p>
                  </div>

                  <div className="flex justify-center space-x-2">
                    {cars.map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === currentCar ? cars[currentCar].color : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                    <span className="ml-2 text-gray-600 font-semibold">4.9/5</span>
                  </div>

                  <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
                    Book This Beauty
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 bg-white/50 backdrop-blur-sm py-16">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold text-gray-800">Why Choose CuteRides?</h2>
            <p className="text-gray-600 text-lg">We make every journey special</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🚗", title: "Premium Cars", desc: "Hand-picked, well-maintained vehicles for every adventure" },
              { icon: "💝", title: "Best Prices", desc: "Competitive rates with no hidden fees. Transparent pricing always!" },
              { icon: "🌟", title: "24/7 Support", desc: "Our friendly team is here to help you anytime, anywhere" }
            ].map((feature, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center hover:shadow-xl transform hover:scale-105 transition-all border border-white/50">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}