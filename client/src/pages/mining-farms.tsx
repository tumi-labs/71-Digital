import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Zap, 
  Shield, 
  TrendingUp, 
  MapPin, 
  Users, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Phone,
  MessageCircle,
  Thermometer,
  Cpu,
  Globe,
  BarChart3
} from "lucide-react";
import logo71NoText from "@assets/71digital logo - no text.png";

export default function MiningFarms() {
  const [currentSection, setCurrentSection] = useState("mining-farms");

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

  return (
    <div className="min-h-screen bg-gray-900">
      <Header currentSection={currentSection} onNavigate={handleNavigate} />
      <main>
        {/* Hero Section */}
        <section className="py-12 md:py-16 px-4" id="mining-farms">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-8 md:mb-12">
              <div className="flex items-center justify-center mb-6">
                <img 
                  src={logo71NoText} 
                  alt="71 Digital Logo" 
                  className="w-12 h-12 mr-4"
                />
                <h1 className="text-3xl md:text-5xl font-bold text-orange-500">Mining Farm Solutions</h1>
              </div>
              <p className="text-white text-lg md:text-xl max-w-3xl mx-auto">
                Institutional-grade Bitcoin mining infrastructure designed for maximum efficiency, 
                reliability, and profitability across multiple global locations.
              </p>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-12 md:py-16 px-4 bg-black/30">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Enterprise Mining Infrastructure
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Our mining farms combine cutting-edge technology with strategic locations 
                to deliver superior mining performance and returns.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-orange-500/20">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Low-Cost Power</h3>
                <p className="text-gray-300">
                  Access to electricity rates as low as $0.03/kWh through strategic partnerships 
                  with renewable energy providers.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-orange-500/20">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <Thermometer className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Advanced Cooling</h3>
                <p className="text-gray-300">
                  Immersion cooling and hydro-cooling systems that maximize miner efficiency 
                  and extend hardware lifespan.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-orange-500/20">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">24/7 Security</h3>
                <p className="text-gray-300">
                  Military-grade security systems with 24/7 monitoring, biometric access, 
                  and comprehensive insurance coverage.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-orange-500/20">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Real-Time Analytics</h3>
                <p className="text-gray-300">
                  Advanced monitoring systems providing real-time data on power consumption, 
                  hash rates, and profitability metrics.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-orange-500/20">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Latest Hardware</h3>
                <p className="text-gray-300">
                  Access to the newest ASIC miners including Antminer S21 series with 
                  priority allocation and competitive pricing.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-orange-500/20">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Global Locations</h3>
                <p className="text-gray-300">
                  Strategic mining facilities across multiple continents with regulatory 
                  compliance and stable political environments.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Farm Specifications Section */}
        <section className="py-12 md:py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Mining Farm Specifications
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Purpose-built facilities designed for maximum mining efficiency and scalability.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Technical Specs */}
              <div className="bg-gray-800/30 rounded-lg p-8 border border-orange-500/20">
                <h3 className="text-2xl font-bold text-orange-500 mb-6">Technical Specifications</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Total Capacity:</span>
                    <span className="text-white font-semibold">500+ MW</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Mining Units:</span>
                    <span className="text-white font-semibold">100,000+ ASICs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Hash Rate:</span>
                    <span className="text-white font-semibold">10+ EH/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Uptime Guarantee:</span>
                    <span className="text-white font-semibold">99.9%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Power Redundancy:</span>
                    <span className="text-white font-semibold">N+1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Cooling Method:</span>
                    <span className="text-white font-semibold">Immersion & Hydro</span>
                  </div>
                </div>
              </div>

              {/* Infrastructure Features */}
              <div className="bg-gray-800/30 rounded-lg p-8 border border-orange-500/20">
                <h3 className="text-2xl font-bold text-orange-500 mb-6">Infrastructure Features</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-white">Dedicated substations and transformers</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-white">Fiber optic internet connectivity</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-white">Climate-controlled environments</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-white">24/7 on-site technical support</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-white">Remote monitoring capabilities</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-white">Comprehensive insurance coverage</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-12 md:py-16 px-4 bg-black/30">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Complete Mining Solutions
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                From site development to ongoing operations, we provide end-to-end mining farm services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Service 1 */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-orange-500/20">
                <Building2 className="w-12 h-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Site Development</h3>
                <p className="text-gray-300 mb-4">
                  Complete turnkey mining facility development from site selection to construction completion.
                </p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Site acquisition and permitting</li>
                  <li>• Engineering and construction</li>
                  <li>• Power infrastructure development</li>
                  <li>• Cooling system installation</li>
                </ul>
              </div>

              {/* Service 2 */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-orange-500/20">
                <Users className="w-12 h-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Operations Management</h3>
                <p className="text-gray-300 mb-4">
                  24/7 mining operations management with dedicated technical teams and support staff.
                </p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• 24/7 monitoring and maintenance</li>
                  <li>• Performance optimization</li>
                  <li>• Hardware replacement and repairs</li>
                  <li>• Security and access control</li>
                </ul>
              </div>

              {/* Service 3 */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-orange-500/20">
                <TrendingUp className="w-12 h-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Performance Analytics</h3>
                <p className="text-gray-300 mb-4">
                  Advanced analytics and reporting to maximize mining profitability and efficiency.
                </p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Real-time performance dashboards</li>
                  <li>• Profitability analysis and reporting</li>
                  <li>• Predictive maintenance alerts</li>
                  <li>• Energy consumption optimization</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Scale Your Mining Operations?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Partner with 71 Digital to access institutional-grade mining infrastructure 
              and maximize your Bitcoin mining returns.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
              <Button 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white transition-colors"
                onClick={() => window.open('/book-appointment', '_self')}
              >
                <Phone className="w-5 h-5 mr-2" />
                Schedule Consultation
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