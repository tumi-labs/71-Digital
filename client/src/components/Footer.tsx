import { FaInstagram, FaLinkedin, FaPhone } from "react-icons/fa";
import { Link } from "wouter";
import logo71Digital from "@assets/71digital logo.png";

export default function Footer() {
  return (
    <footer className="py-12 px-4 bg-black/20">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="md:col-span-1">
            <img 
              src={logo71Digital} 
              alt="71 Digital"
              className="h-16 mb-4"
            />
          </div>
          
          {/* Navigation Links */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Column 1 */}
              <div className="space-y-4">
                <Link href="/" className="block text-white hover:text-orange-500 transition-colors">
                  Home
                </Link>
                <Link href="/about" className="block text-white hover:text-orange-500 transition-colors">
                  About
                </Link>
                <Link href="/services" className="block text-white hover:text-orange-500 transition-colors">
                  Services
                </Link>
                <a href="#" className="block text-white hover:text-orange-500 transition-colors">
                  Blog
                </a>
              </div>
              
              {/* Column 2 */}
              <div className="space-y-4">
                <a href="#" className="block text-white hover:text-orange-500 transition-colors">
                  Hosting and management
                </a>
                <a href="#" className="block text-white hover:text-orange-500 transition-colors">
                  Purchases of machines
                </a>
                <a href="#" className="block text-white hover:text-orange-500 transition-colors">
                  Machines
                </a>
              </div>
              
              {/* Column 3 */}
              <div className="space-y-4">
                <a href="#" className="block text-white hover:text-orange-500 transition-colors">
                  General Terms & Conditions
                </a>
                <a href="#" className="block text-white hover:text-orange-500 transition-colors">
                  Terms of use
                </a>
                <a href="#" className="block text-white hover:text-orange-500 transition-colors">
                  Privacy policy
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Section */}
          <div className="md:col-span-1">
            <div className="flex flex-col items-center md:items-end space-y-4">
              {/* Social Icons */}
              <div className="flex space-x-4">
                <div className="bg-gray-600 hover:bg-orange-500 p-3 rounded-full transition-colors cursor-pointer">
                  <FaInstagram className="text-white text-lg" />
                </div>
                <div className="bg-gray-600 hover:bg-orange-500 p-3 rounded-full transition-colors cursor-pointer">
                  <FaLinkedin className="text-white text-lg" />
                </div>
                <div className="bg-gray-600 hover:bg-orange-500 p-3 rounded-full transition-colors cursor-pointer">
                  <FaPhone className="text-white text-lg" />
                </div>
              </div>
              
              {/* Email */}
              <div className="text-center md:text-right">
                <p className="text-white font-medium">
                  info@71digital.io
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-600 mt-8 pt-6 text-center">
          <p className="text-gray-300">
            71 DIGITAL 2025 | All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}