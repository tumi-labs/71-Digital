import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Navigation, 
  Zap, 
  Thermometer, 
  Shield, 
  Clock,
  Building2,
  Phone,
  MessageCircle
} from "lucide-react";
import logo71NoText from "@assets/71digital logo - no text.png";

export default function DeploymentSites() {
  const [currentSection, setCurrentSection] = useState("deployment-sites");

  const handleNavigate = (section: string) => {
    if (section === "home") {
      window.location.href = "/";
    } else if (section === "about") {
      window.location.href = "/about";
    } else if (section === "services") {
      window.location.href = "/services";
    } else if (section === "contact") {
      window.location.href = "/contact";
    } else if (section === "mining-store") {
      window.location.href = "/mining-store";
    }
  };

  const sites = [
    {
      id: "ras-al-khaimah",
      name: "Ras Al Khaimah",
      country: "United Arab Emirates",
      status: "Operational",
      capacity: "15 MW",
      cooling: "Air-cooled & Hydro-cooled",
      uptime: "97%",
      description: "Our primary mining facility located in the RAK Digital Assets Oasis, featuring state-of-the-art infrastructure with hybrid cooling systems.",
      address: "RAK Digital Assets Oasis, Ras Al Khaimah, UAE",
      coordinates: "25.7889,55.9603", // Ras Al Khaimah coordinates
      mapUrl: "https://www.google.com/maps/place/Ras+Al+Khaimah,+United+Arab+Emirates/@25.7889,55.9603,12z",
      features: [
        "Industrial-grade infrastructure",
        "Hybrid cooling systems", 
        "24/7 monitoring",
        "Regulatory compliance",
        "Expert on-site teams"
      ]
    },
    {
      id: "kuwait",
      name: "Kuwait",
      country: "Kuwait",
      status: "Operational", 
      capacity: "10 MW",
      cooling: "Immersion cooling",
      uptime: "96%",
      description: "Strategic mining location in Kuwait offering competitive power costs and advanced immersion cooling technology for maximum efficiency.",
      address: "Kuwait Mining Facility, Kuwait",
      coordinates: "29.3759,47.9774", // Kuwait coordinates
      mapUrl: "https://www.google.com/maps/place/Kuwait/@29.3759,47.9774,10z",
      features: [
        "Low-cost power infrastructure",
        "Immersion cooling technology",
        "High-efficiency operations",
        "Strategic GCC location",
        "Scalable deployment"
      ]
    }
  ];

  const openGoogleMaps = (mapUrl: string) => {
    window.open(mapUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header currentSection={currentSection} onNavigate={handleNavigate} />
      <main>
        {/* Hero Section */}
        <section className="py-12 md:py-16 px-4" id="deployment-sites">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-8 md:mb-12">
              <div className="flex items-center justify-center mb-6">
                <img 
                  src={logo71NoText} 
                  alt="71 Digital Logo" 
                  className="w-12 h-12 mr-4"
                />
                <h1 className="text-3xl md:text-5xl font-bold text-orange-500">Deployment Sites</h1>
              </div>
              <p className="text-white text-lg md:text-xl max-w-3xl mx-auto">
                Our strategically located mining facilities across the GCC region, 
                currently operating 25MW with plans to expand to 50MW capacity.
              </p>
            </div>
          </div>
        </section>

        {/* Sites Overview */}
        <section className="py-12 md:py-16 px-4 bg-black/30">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Mining Facility Locations
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Two operational facilities providing industrial-grade Bitcoin mining infrastructure 
                with proven performance and regulatory compliance.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {sites.map((site) => (
                <div key={site.id} className="bg-gray-800/50 rounded-lg p-8 border border-orange-500/20">
                  {/* Site Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-orange-500 mb-2">{site.name}</h3>
                      <p className="text-gray-300 mb-1">{site.country}</p>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-green-400 text-sm font-medium">{site.status}</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => openGoogleMaps(site.mapUrl)}
                      className="bg-orange-500 hover:bg-orange-600 text-white transition-colors"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      View on Maps
                    </Button>
                  </div>

                  {/* Site Description */}
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {site.description}
                  </p>

                  {/* Technical Specs */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Zap className="w-5 h-5 text-orange-500 mr-2" />
                        <span className="text-white font-medium">Capacity</span>
                      </div>
                      <span className="text-gray-300">{site.capacity}</span>
                    </div>
                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Clock className="w-5 h-5 text-orange-500 mr-2" />
                        <span className="text-white font-medium">Uptime</span>
                      </div>
                      <span className="text-gray-300">{site.uptime}</span>
                    </div>
                    <div className="bg-gray-900/50 rounded-lg p-4 col-span-2">
                      <div className="flex items-center mb-2">
                        <Thermometer className="w-5 h-5 text-orange-500 mr-2" />
                        <span className="text-white font-medium">Cooling System</span>
                      </div>
                      <span className="text-gray-300">{site.cooling}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-white font-medium mb-3">Key Features</h4>
                    <div className="space-y-2">
                      {site.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex items-start">
                      <Navigation className="w-4 h-4 text-orange-500 mr-2 mt-1" />
                      <div>
                        <span className="text-white font-medium text-sm">Address</span>
                        <p className="text-gray-300 text-sm">{site.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Combined Stats */}
        <section className="py-12 md:py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Combined Infrastructure
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Total operational capacity and performance metrics across both deployment sites.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-gray-800/30 rounded-lg p-6 border border-orange-500/20 text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-2">25 MW</div>
                <div className="text-gray-300 text-sm">Total Capacity</div>
              </div>

              <div className="bg-gray-800/30 rounded-lg p-6 border border-orange-500/20 text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-2">2</div>
                <div className="text-gray-300 text-sm">Active Sites</div>
              </div>

              <div className="bg-gray-800/30 rounded-lg p-6 border border-orange-500/20 text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-2">96.5%</div>
                <div className="text-gray-300 text-sm">Avg Uptime</div>
              </div>

              <div className="bg-gray-800/30 rounded-lg p-6 border border-orange-500/20 text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Thermometer className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-2">3</div>
                <div className="text-gray-300 text-sm">Cooling Technologies</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-black/30">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Visit Our Mining Facilities
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Schedule a site visit to see our world-class mining infrastructure in action. 
              Experience our operations, cooling systems, and security measures firsthand.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
              <Button 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white transition-colors"
                onClick={() => window.open('/book-appointment', '_self')}
              >
                <Phone className="w-5 h-5 mr-2" />
                Schedule Site Visit
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors"
                onClick={() => window.open('/contact', '_self')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Contact Our Team
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}