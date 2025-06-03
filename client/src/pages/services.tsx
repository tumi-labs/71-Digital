import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, Building2, Zap, HardDrive, Settings, MapPin, Phone } from "lucide-react";

export default function Services() {
  const [currentSection, setCurrentSection] = useState("services");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services = [
    {
      icon: <Building2 className="w-8 h-8 text-orange-500" />,
      title: "Hosting Solutions",
      items: [
        "Air Cooling | Hydro | Immersion",
        "Facilities in the UAE, Canada, USA, Oman, and Ethiopia.",
        "99% uptime SLA",
        "Remote monitoring & smart alerts",
        "Flexible contract terms"
      ],
      action: "Request Hosting Quote"
    },
    {
      icon: <MapPin className="w-8 h-8 text-orange-500" />,
      title: "Site Acquisition & Power Deals",
      items: [
        "Lease terms and CAPEX structuring",
        "Energy rates as low as $0.012$/kWh",
        "Land sourcing, legal, and permits handled",
        "Grid or off-grid site options",
        "Fast-track timelines for deployment"
      ],
      action: "Secure a Site"
    },
    {
      icon: <HardDrive className="w-8 h-8 text-orange-500" />,
      title: "Hardware Procurement",
      items: [
        "ASIC machines at competitive rates with DDP delivery.",
        "Bitmain, Whatsminer, and hydro-ready rigs",
        "Bulk purchase agreements",
        "Optional setup & configuration",
        "Verified warranties and vendor partners"
      ],
      action: "View Inventory"
    },
    {
      icon: <Settings className="w-8 h-8 text-orange-500" />,
      title: "Mining Operations & Site Management",
      items: [
        "Let 71 Digital manage from setup to ongoing operations.",
        "24/7 monitoring and maintenance",
        "On-site technical support",
        "Firmware upgrades and optimization",
        "Energy efficiency tracking"
      ],
      action: "Talk to a Site Manager"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header currentSection={currentSection} onNavigate={scrollToSection} />
      <main>
        {/* Hero Section */}
        <section className="py-16 px-4" id="services">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center mb-8">
              <div className="w-12 h-2 bg-orange-500 rounded mr-4"></div>
              <h1 className="text-4xl font-bold text-orange-500">Services</h1>
            </div>
            
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-6">End-to-End Mining Infrastructure Delivered</h2>
              <p className="text-white text-lg leading-relaxed max-w-4xl">
                Whether you're an institutional investor, a mining fund, or a large-scale operator, 71 
                Digital provides everything needed to deploy, scale, and manage a profitable crypto 
                mining operation. Every service is modular and customizable to fit your growth goals.
              </p>
            </div>

            {/* Services Layout */}
            <div className="space-y-12 mb-16">
              {/* First Row - Hosting Solutions with Mining Racks */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-orange-500/30">
                  <div className="flex items-center mb-4">
                    <Building2 className="w-8 h-8 text-orange-500" />
                    <h3 className="text-xl font-bold text-white ml-3">Hosting Solutions</h3>
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-white text-sm">Air Cooling | Hydro | Immersion</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-white text-sm">Facilities in the UAE, Canada, USA, Oman, and Ethiopia.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-white text-sm">99% uptime SLA</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-white text-sm">Remote monitoring & smart alerts</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-white text-sm">Flexible contract terms</span>
                    </li>
                  </ul>
                  
                  <button className="flex items-center text-orange-500 font-medium hover:text-orange-400 transition-colors">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                    Request Hosting Quote
                  </button>
                </div>
                
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=800&q=80"
                    alt="Mining facility racks"
                    className="w-full h-80 object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* Second Row - Site Acquisition */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-orange-500/30 max-w-lg">
                <div className="flex items-center mb-4">
                  <MapPin className="w-8 h-8 text-orange-500" />
                  <h3 className="text-xl font-bold text-white ml-3">Site Acquisition & Power Deals</h3>
                </div>
                
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">Lease terms and CAPEX structuring</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">Energy rates as low as $0.012$/kWh</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">Land sourcing, legal, and permits handled</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">Grid or off-grid site options</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">Fast-track timelines for deployment</span>
                  </li>
                </ul>
                
                <button className="flex items-center text-orange-500 font-medium hover:text-orange-400 transition-colors">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  Secure a Site
                </button>
              </div>

              {/* Center Image with Crypto Icons */}
              <div className="flex justify-center my-8">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=400&q=80"
                    alt="ASIC miner"
                    className="w-64 h-64 object-cover rounded-lg"
                  />
                  {/* Floating crypto icons */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">₿</span>
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">Ł</span>
                  </div>
                  <div className="absolute top-8 -left-8 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">↗</span>
                  </div>
                </div>
              </div>

              {/* Third Row - Hardware Procurement */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-orange-500/30 max-w-lg">
                <div className="flex items-center mb-4">
                  <HardDrive className="w-8 h-8 text-orange-500" />
                  <h3 className="text-xl font-bold text-white ml-3">Hardware Procurement</h3>
                </div>
                
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">ASIC machines at competitive rates with DDP delivery.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">Bitmain, Whatsminer, and hydro-ready rigs</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">Bulk purchase agreements</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">Optional setup & configuration</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">Verified warranties and vendor partners</span>
                  </li>
                </ul>
                
                <button className="flex items-center text-orange-500 font-medium hover:text-orange-400 transition-colors">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  View Inventory
                </button>
              </div>

              {/* Fourth Row - Mining Operations with Cables Image */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-orange-500/30">
                  <div className="flex items-center mb-4">
                    <Settings className="w-8 h-8 text-orange-500" />
                    <h3 className="text-xl font-bold text-white ml-3">Mining Operations & Site Management</h3>
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-white text-sm">Let 71 Digital manage from setup to ongoing operations.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-white text-sm">24/7 monitoring and maintenance</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-white text-sm">On-site technical support</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-white text-sm">Firmware upgrades and optimization</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-white text-sm">Energy efficiency tracking</span>
                    </li>
                  </ul>
                  
                  <button className="flex items-center text-orange-500 font-medium hover:text-orange-400 transition-colors">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                    Talk to a Site Manager
                  </button>
                </div>
                
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80"
                    alt="Data center cables and infrastructure"
                    className="w-full h-80 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-orange-500 mr-2" />
                <h3 className="text-xl font-bold text-orange-500">Ready to build or scale your mining infrastructure?</h3>
              </div>
              
              <p className="text-white text-lg mb-8">Let's start with a free consultation.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  <Phone className="w-5 h-5 mr-2" />
                  Book a Call
                </button>
                <button className="flex items-center justify-center border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  Get Hosting Quote
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}