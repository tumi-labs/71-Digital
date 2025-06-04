import { FaInstagram, FaLinkedin, FaPhone } from "react-icons/fa";
import { Link } from "wouter";
import logo71Digital from "@assets/71digital logo.png";

const handleLinkClick = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

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
                <Link href="/" onClick={handleLinkClick} className="block text-white hover:text-orange-500 transition-colors">
                  Home
                </Link>
                <Link href="/about" onClick={handleLinkClick} className="block text-white hover:text-orange-500 transition-colors">
                  About
                </Link>
                <Link href="/services" onClick={handleLinkClick} className="block text-white hover:text-orange-500 transition-colors">
                  Services
                </Link>
                <Link href="/contact" onClick={handleLinkClick} className="block text-white hover:text-orange-500 transition-colors">
                  Contact
                </Link>
              </div>
              
              {/* Column 2 */}
              <div className="space-y-4">
                <Link href="/mining-farms" onClick={handleLinkClick} className="block text-white hover:text-orange-500 transition-colors">
                  Mining Farms
                </Link>
                <Link href="/mining-store" onClick={handleLinkClick} className="block text-white hover:text-orange-500 transition-colors">
                  Mining Store
                </Link>
                <Link href="/deployment-sites" onClick={handleLinkClick} className="block text-white hover:text-orange-500 transition-colors">
                  Deployment Sites
                </Link>
              </div>
              
              {/* Column 3 */}
              <div className="space-y-4">
                <Link href="/terms-of-conditions" onClick={handleLinkClick} className="block text-white hover:text-orange-500 transition-colors">
                  General Terms & Conditions
                </Link>
                <Link href="/terms-of-use" onClick={handleLinkClick} className="block text-white hover:text-orange-500 transition-colors">
                  Terms of use
                </Link>
                <Link href="/privacy-policy" onClick={handleLinkClick} className="block text-white hover:text-orange-500 transition-colors">
                  Privacy policy
                </Link>
              </div>
            </div>
          </div>
          
          {/* Contact Section */}
          <div className="md:col-span-1">
            <div className="flex flex-col items-center md:items-start space-y-6">
              <h3 className="text-orange-500 font-bold text-lg">Connect With Us</h3>
              
              {/* Email */}
              <div className="text-center md:text-left">
                <p className="text-white text-sm mb-1">Email</p>
                <a href="mailto:info@71digital.io" className="text-orange-500 font-medium hover:text-orange-400 transition-colors">
                  info@71digital.io
                </a>
              </div>
              
              {/* Social Icons */}
              <div>
                <p className="text-white text-sm mb-3 text-center md:text-left">Follow Us</p>
                <div className="flex space-x-3 justify-center md:justify-start">
                  <div 
                    className="bg-gray-700 hover:bg-orange-500 p-2.5 rounded-full transition-all duration-300 cursor-pointer transform hover:scale-110"
                    onClick={() => window.open('https://www.instagram.com/71digital_inc/', '_blank')}
                  >
                    <FaInstagram className="text-white text-base" />
                  </div>
                  <div 
                    className="bg-gray-700 hover:bg-orange-500 p-2.5 rounded-full transition-all duration-300 cursor-pointer transform hover:scale-110"
                    onClick={() => window.open('https://www.linkedin.com/company/71-digital-inc/', '_blank')}
                  >
                    <FaLinkedin className="text-white text-base" />
                  </div>
                  <div className="bg-gray-700 hover:bg-orange-500 p-2.5 rounded-full transition-all duration-300 cursor-pointer transform hover:scale-110">
                    <FaPhone className="text-white text-base" />
                  </div>
                </div>
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