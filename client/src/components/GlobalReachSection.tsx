import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaInstagram, FaLinkedin, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import mapImage from "@assets/map.png";

export default function GlobalReachSection() {
  return (
    <section className="py-16 px-4" id="global-reach">
      <div className="container mx-auto max-w-6xl">
        {/* Global Reach */}
        <div className="relative mb-16">
          {/* Background Map */}
          <div className="w-full">
            <img 
              src={mapImage} 
              alt="Global mining locations map"
              className="w-full h-auto"
            />
          </div>
          
          {/* Overlay Content */}
          <div className="absolute top-8 left-8 max-w-md">
            <h2 className="text-3xl font-bold text-orange-500 mb-4">
              Global Reach
            </h2>
            <p className="text-lg text-white mb-4">
              Operating in Power-Rich Locations
            </p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-red-500" />
                <span className="text-white">UAE</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-red-500" />
                <span className="text-white">Canada (Alberta)</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-red-500" />
                <span className="text-white">USA</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-red-500" />
                <span className="text-white">Oman</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-red-500" />
                <span className="text-white">Ethiopia</span>
              </div>
            </div>
            
            <p className="text-white mb-4">
              25MW live. 50MW in expansion.
            </p>
            
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              [View Deployment Sites]
            </Button>
          </div>
        </div>
        
        {/* Case Studies Section */}
        <div className="mb-16">
          <p className="text-white text-sm mb-2">[Case Studies / Testimonials]</p>
          <p className="text-white text-sm mb-2">Optional carousel or slider with 1–3 examples.</p>
          <p className="text-white text-sm mb-2">
            "71 Digital helped us secure land, power, and set up 2.5MW in under 60 days — unheard of in this industry."
          </p>
          <p className="text-orange-500 text-sm">— Asset Manager, Dubai</p>
        </div>
        
        {/* Seen on WAYOND */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold text-orange-500 mb-8">
            Seen on
          </h3>
          <div className="text-6xl font-bold text-white mb-8">
            WAYOND
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold text-orange-500 mb-6">
            CTA: Ready to Scale Your Mining Operation?
          </h3>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Speak with our team to secure capacity, design your site, or co-mine with the most reliable hosting provider in the region.
          </p>
          <div className="space-y-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white mx-2">
              [Book a Consultation]
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white mx-2">
              [WhatsApp Business Chat]
            </Button>
          </div>
        </div>
        
        {/* Contact Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-orange-500 mb-6">
              Contact Us
            </h3>
            <p className="text-white mb-6">
              Let's Build the Future of Mining — Together
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-orange-500 mt-1" />
                <div>
                  <p className="text-white">Office A, RAK DAO Business Centre, Ras</p>
                  <p className="text-white">Al Khaimah, United Arab Emirates</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-orange-500" />
                <span className="text-white">info@71digital.io</span>
              </div>
            </div>
            
            <div>
              <p className="text-white mb-4">Social Media</p>
              <div className="flex space-x-4">
                <FaInstagram className="text-white text-xl hover:text-orange-500 cursor-pointer" />
                <FaLinkedin className="text-white text-xl hover:text-orange-500 cursor-pointer" />
                <FaWhatsapp className="text-white text-xl hover:text-orange-500 cursor-pointer" />
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <div className="bg-white p-6 rounded-lg">
              <h4 className="text-xl font-bold text-gray-800 mb-4">
                Send us a message
              </h4>
              
              <form className="space-y-4">
                <Input 
                  placeholder="Name" 
                  className="w-full"
                />
                <Input 
                  placeholder="Phone number" 
                  className="w-full"
                />
                <Input 
                  placeholder="Email address" 
                  type="email"
                  className="w-full"
                />
                <Textarea 
                  placeholder="What can we do for you?"
                  className="w-full h-24"
                />
                <div className="text-xs text-gray-600 mb-4">
                  Verification*
                </div>
                
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Contact us →
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}