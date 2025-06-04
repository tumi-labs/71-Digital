import { FaInstagram, FaLinkedin, FaPhone } from "react-icons/fa";
import { Link } from "wouter";
import logo71Digital from "@assets/71digital logo.png";

const handleLinkClick = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export default function Footer() {
  return (
    <footer className="w-full" style={{ backgroundColor: '#2D1810' }}>
      <div className="w-full px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 mb-8">
            {/* Logo Section */}
            <div className="lg:col-span-2">
              <div className="flex flex-col items-center lg:items-start space-y-6">
                <img 
                  src={logo71Digital} 
                  alt="71 Digital"
                  className="h-20"
                />
                <p className="text-gray-300 text-sm text-center lg:text-left max-w-sm leading-relaxed">
                  Leading cryptocurrency mining solutions with institutional-grade infrastructure and 24/7 operations across multiple deployment sites.
                </p>
              </div>
            </div>
          
            {/* Navigation Links */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Column 1 - Main Pages */}
                <div className="space-y-4">
                  <h4 className="text-orange-500 font-semibold text-base mb-4">Company</h4>
                  <Link href="/" onClick={handleLinkClick} className="block text-gray-300 hover:text-orange-500 transition-colors text-sm">
                    Home
                  </Link>
                  <Link href="/about" onClick={handleLinkClick} className="block text-gray-300 hover:text-orange-500 transition-colors text-sm">
                    About
                  </Link>
                  <Link href="/services" onClick={handleLinkClick} className="block text-gray-300 hover:text-orange-500 transition-colors text-sm">
                    Services
                  </Link>
                  <Link href="/contact" onClick={handleLinkClick} className="block text-gray-300 hover:text-orange-500 transition-colors text-sm">
                    Contact
                  </Link>
                </div>
                
                {/* Column 2 - Services */}
                <div className="space-y-4">
                  <h4 className="text-orange-500 font-semibold text-base mb-4">Solutions</h4>
                  <Link href="/mining-farms" onClick={handleLinkClick} className="block text-gray-300 hover:text-orange-500 transition-colors text-sm">
                    Mining Farms
                  </Link>
                  <Link href="/mining-store" onClick={handleLinkClick} className="block text-gray-300 hover:text-orange-500 transition-colors text-sm">
                    Mining Store
                  </Link>
                  <Link href="/deployment-sites" onClick={handleLinkClick} className="block text-gray-300 hover:text-orange-500 transition-colors text-sm">
                    Deployment Sites
                  </Link>
                </div>
                
                {/* Column 3 - Legal */}
                <div className="space-y-4">
                  <h4 className="text-orange-500 font-semibold text-base mb-4">Legal</h4>
                  <Link href="/terms-of-conditions" onClick={handleLinkClick} className="block text-gray-300 hover:text-orange-500 transition-colors text-sm">
                    Terms & Conditions
                  </Link>
                  <Link href="/terms-of-use" onClick={handleLinkClick} className="block text-gray-300 hover:text-orange-500 transition-colors text-sm">
                    Terms of Use
                  </Link>
                  <Link href="/privacy-policy" onClick={handleLinkClick} className="block text-gray-300 hover:text-orange-500 transition-colors text-sm">
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Contact Section */}
            <div className="lg:col-span-1">
              <div className="flex flex-col items-center lg:items-start space-y-6">
                <h4 className="text-orange-500 font-semibold text-base">Connect With Us</h4>
                
                {/* Email */}
                <div className="text-center lg:text-left">
                  <p className="text-gray-400 text-xs mb-2 uppercase tracking-wide">Email</p>
                  <a href="mailto:info@71digital.io" className="text-white font-medium hover:text-orange-500 transition-colors text-sm">
                    info@71digital.io
                  </a>
                </div>
                
                {/* Social Icons */}
                <div>
                  <p className="text-gray-400 text-xs mb-3 text-center lg:text-left uppercase tracking-wide">Follow Us</p>
                  <div className="flex space-x-3 justify-center lg:justify-start">
                    <div 
                      className="bg-gray-700 hover:bg-orange-500 p-3 rounded-lg transition-all duration-300 cursor-pointer transform hover:scale-105"
                      onClick={() => window.open('https://www.instagram.com/71digital_inc/', '_blank')}
                    >
                      <FaInstagram className="text-white text-lg" />
                    </div>
                    <div 
                      className="bg-gray-700 hover:bg-orange-500 p-3 rounded-lg transition-all duration-300 cursor-pointer transform hover:scale-105"
                      onClick={() => window.open('https://www.linkedin.com/company/71-digital-inc/', '_blank')}
                    >
                      <FaLinkedin className="text-white text-lg" />
                    </div>
                    <div className="bg-gray-700 hover:bg-orange-500 p-3 rounded-lg transition-all duration-300 cursor-pointer transform hover:scale-105">
                      <FaPhone className="text-white text-lg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                © 2025 71 Digital Inc. All rights reserved.
              </p>
              <p className="text-gray-400 text-sm">
                Institutional-grade Bitcoin mining solutions
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}