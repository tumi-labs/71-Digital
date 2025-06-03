import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaInstagram, FaLinkedin, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";
import mapImage from "@assets/map.png";

export default function GlobalReachSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "71 Digital helped us secure land, power, and set up 2.5MW in under 60 days — unheard of in this industry.",
      author: "Ahmed Al-Rashid",
      title: "Asset Manager",
      location: "Dubai",
      company: "Regional Investment Fund",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      companyLogo: "data:image/svg+xml,%3Csvg width='80' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='80' height='40' fill='%23f97316'/%3E%3Ctext x='40' y='25' font-family='Arial' font-size='12' fill='white' text-anchor='middle'%3ERIF%3C/text%3E%3C/svg%3E"
    },
    {
      quote: "Their expertise in ASIC deployment and cooling solutions reduced our operational costs by 30% while maintaining 99.7% uptime.",
      author: "Sarah Mitchell",
      title: "Operations Director",
      location: "Alberta",
      company: "Northern Mining Corp",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      companyLogo: "data:image/svg+xml,%3Csvg width='80' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='80' height='40' fill='%230066cc'/%3E%3Ctext x='40' y='25' font-family='Arial' font-size='12' fill='white' text-anchor='middle'%3ENMC%3C/text%3E%3C/svg%3E"
    },
    {
      quote: "From site acquisition to full-scale operations, 71 Digital delivered everything on time and under budget. Exceptional service.",
      author: "Marcus Rodriguez",
      title: "Chief Technology Officer",
      location: "Texas",
      company: "Bitcoin Mining Solutions",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      companyLogo: "data:image/svg+xml,%3Csvg width='80' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='80' height='40' fill='%2328a745'/%3E%3Ctext x='40' y='25' font-family='Arial' font-size='12' fill='white' text-anchor='middle'%3EBMS%3C/text%3E%3C/svg%3E"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

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
        
        {/* Case Studies Carousel */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-orange-500 mb-8 text-center">
            Client Success Stories
          </h3>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-lg border border-gray-700">
              <div className="flex items-start mb-6">
                <FaQuoteLeft className="text-orange-500 text-2xl mr-4 mt-2" />
                <p className="text-white text-lg leading-relaxed">
                  {testimonials[currentTestimonial].quote}
                </p>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img 
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].author}
                    className="w-16 h-16 rounded-full object-cover border-2 border-orange-500"
                  />
                  <div>
                    <p className="text-orange-500 font-semibold">
                      {testimonials[currentTestimonial].author}
                    </p>
                    <p className="text-white text-sm">
                      {testimonials[currentTestimonial].title}
                    </p>
                    <p className="text-gray-300 text-sm">
                      {testimonials[currentTestimonial].location}
                    </p>
                  </div>
                  <img 
                    src={testimonials[currentTestimonial].companyLogo}
                    alt={testimonials[currentTestimonial].company}
                    className="w-20 h-10 object-contain rounded"
                  />
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={prevTestimonial}
                    className="bg-gray-700 hover:bg-orange-500 p-2 rounded-full transition-colors"
                  >
                    <FaChevronLeft className="text-white" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="bg-gray-700 hover:bg-orange-500 p-2 rounded-full transition-colors"
                  >
                    <FaChevronRight className="text-white" />
                  </button>
                </div>
              </div>
              
              {/* Dots indicator */}
              <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-orange-500' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
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
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-lg border border-gray-700">
            <h3 className="text-3xl font-bold text-orange-500 mb-4">
              Contact Us
            </h3>
            <p className="text-white text-lg mb-8 leading-relaxed">
              Let's Build the Future of Mining — Together
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="bg-orange-500 p-2 rounded-full">
                  <FaMapMarkerAlt className="text-white text-sm" />
                </div>
                <div>
                  <p className="text-white font-medium">Office Location</p>
                  <p className="text-gray-300 text-sm">Office A, RAK DAO Business Centre, Ras</p>
                  <p className="text-gray-300 text-sm">Al Khaimah, United Arab Emirates</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-orange-500 p-2 rounded-full">
                  <FaEnvelope className="text-white text-sm" />
                </div>
                <div>
                  <p className="text-white font-medium">Email</p>
                  <span className="text-gray-300">info@71digital.io</span>
                </div>
              </div>
            </div>
            
            <div>
              <p className="text-white font-medium mb-4">Follow Us</p>
              <div className="flex space-x-4">
                <div className="bg-gray-700 hover:bg-orange-500 p-3 rounded-full transition-colors cursor-pointer">
                  <FaInstagram className="text-white text-lg" />
                </div>
                <div className="bg-gray-700 hover:bg-orange-500 p-3 rounded-full transition-colors cursor-pointer">
                  <FaLinkedin className="text-white text-lg" />
                </div>
                <div className="bg-gray-700 hover:bg-orange-500 p-3 rounded-full transition-colors cursor-pointer">
                  <FaWhatsapp className="text-white text-lg" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <div className="bg-white p-8 rounded-lg shadow-2xl">
              <h4 className="text-2xl font-bold text-gray-800 mb-6">
                Send us a message
              </h4>
              
              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    placeholder="Full Name" 
                    className="w-full h-12 border-2 border-gray-200 focus:border-orange-500 rounded-lg"
                  />
                  <Input 
                    placeholder="Email Address" 
                    type="email"
                    className="w-full h-12 border-2 border-gray-200 focus:border-orange-500 rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    placeholder="Company Name" 
                    className="w-full h-12 border-2 border-gray-200 focus:border-orange-500 rounded-lg"
                  />
                  <Input 
                    placeholder="Phone Number" 
                    className="w-full h-12 border-2 border-gray-200 focus:border-orange-500 rounded-lg"
                  />
                </div>
                <div>
                  <select
                    className="w-full h-12 border-2 border-gray-200 focus:border-orange-500 rounded-lg px-3 bg-white text-gray-700"
                  >
                    <option value="">Select a service</option>
                    <option value="hosting">Hosting Solutions</option>
                    <option value="site-acquisition">Site Acquisition & Power Deals</option>
                    <option value="hardware">Hardware Procurement</option>
                    <option value="operations">Mining Operations & Site Management</option>
                    <option value="consultation">General Consultation</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <Textarea 
                    placeholder="Tell us about your mining infrastructure needs..."
                    className="w-full h-32 border-2 border-gray-200 focus:border-orange-500 rounded-lg resize-none"
                  />
                </div>
                
                <Button className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                  Send Message →
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}