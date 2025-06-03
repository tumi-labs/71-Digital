import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, Download, MessageCircle } from "lucide-react";
import productsImage from "@assets/4.png";
import logo71NoText from "@assets/71digital logo - no text.png";
import s21AirImage from "@assets/Antminer s21 air cooling.png";
import s21HydroImage from "@assets/S21 hydro.png";
import l9Image from "@assets/l9.png";

export default function MiningStore() {
  const [currentSection, setCurrentSection] = useState("store");

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['store'];
      const scrollY = window.scrollY;
      
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollY >= offsetTop - 100 && scrollY < offsetTop + offsetHeight - 100) {
            setCurrentSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <Header currentSection={currentSection} onNavigate={handleNavigate} />
      <main>
        {/* Hero Section */}
        <section className="py-16 px-4" id="store">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center mb-8">
              <img 
                src={logo71NoText} 
                alt="71 Digital Logo" 
                className="w-12 h-12 mr-4"
              />
              <h1 className="text-4xl font-bold text-orange-500">Mining Store</h1>
            </div>
            
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-6">Performance-Grade ASIC Miners for Every Operation</h2>
              <p className="text-white text-lg leading-relaxed max-w-4xl">
                Choose from a curated selection of top-performing machines optimized for air 
                cooling, hydro immersion, and scrypt mining. Each unit comes with verified 
                warranties and our comprehensive support package.
              </p>
            </div>

            {/* Products Layout */}
            <div className="space-y-16 mb-16">
              {/* Bitmain Antminer S21 (Air Cooling) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <img 
                    src={s21AirImage}
                    alt="Bitmain Antminer S21 Air Cooling"
                    className="w-full h-auto object-contain rounded-lg"
                  />
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-orange-500/30">
                  <h3 className="text-xl font-bold text-orange-500 mb-4 flex items-center">
                    🔶 Bitmain Antminer S21 (Air Cooling)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-white text-sm"><strong>Hashrate:</strong> 234 TH/s</p>
                      <p className="text-white text-sm"><strong>Power Consumption:</strong> ~3500W</p>
                      <p className="text-white text-sm"><strong>Efficiency:</strong> 17.5 J/TH</p>
                    </div>
                    <div>
                      <p className="text-white text-sm"><strong>Cooling Type:</strong> Traditional Air Cooling</p>
                      <p className="text-white text-sm"><strong>Best For:</strong> Standard container deployments</p>
                      <p className="text-white text-sm"><strong>Warranty:</strong> 12 months</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Button size="sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Inquire Now
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download Spec Sheet
                    </Button>
                  </div>
                </div>
              </div>

              {/* Bitmain Antminer S21 Hydro */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="order-2 lg:order-1 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-orange-500/30">
                  <h3 className="text-xl font-bold text-orange-500 mb-4 flex items-center">
                    🔷 Bitmain Antminer S21 Hydro
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-white text-sm"><strong>Hashrate:</strong> 335 TH/s</p>
                      <p className="text-white text-sm"><strong>Power Consumption:</strong> ~5300W</p>
                      <p className="text-white text-sm"><strong>Efficiency:</strong> 21.2 J/TH</p>
                    </div>
                    <div>
                      <p className="text-white text-sm"><strong>Cooling Type:</strong> Hydro-Cooling</p>
                      <p className="text-white text-sm"><strong>Best For:</strong> High-density, low-maintenance sites</p>
                      <p className="text-white text-sm"><strong>Requirements:</strong> Water loop system</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Button size="sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Inquire Now
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download Spec Sheet
                    </Button>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <img 
                    src={s21HydroImage}
                    alt="Bitmain Antminer S21 Hydro"
                    className="w-full h-auto object-contain rounded-lg"
                  />
                </div>
              </div>

              {/* Bitmain Antminer L9 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <img 
                    src={l9Image}
                    alt="Bitmain Antminer L9 Scrypt Miner"
                    className="w-full h-auto object-contain rounded-lg"
                  />
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-orange-500/30">
                  <h3 className="text-xl font-bold text-orange-500 mb-4 flex items-center">
                    ⚡ Bitmain Antminer L9 (Scrypt Miner)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-white text-sm"><strong>Hashrate:</strong> 17-18 GH/s</p>
                      <p className="text-white text-sm"><strong>Power Consumption:</strong> ~3300W</p>
                      <p className="text-white text-sm"><strong>Algorithms:</strong> Scrypt</p>
                    </div>
                    <div>
                      <p className="text-white text-sm"><strong>Cooling Type:</strong> Air Cooling</p>
                      <p className="text-white text-sm"><strong>Best For:</strong> Litecoin / Dogecoin mining</p>
                      <p className="text-white text-sm"><strong>Deployment:</strong> Altcoin diversification</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Button size="sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Inquire Now
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download Spec Sheet
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Help Section */}
            <div className="text-center bg-white/5 rounded-lg p-8 border border-orange-500/20 mb-16">
              <h3 className="text-xl font-bold text-orange-500 mb-4">Need help choosing the right machine?</h3>
              <p className="text-white text-lg mb-6">Let our team recommend the best model for your site setup.</p>
              <Button className="mx-auto">
                <MessageCircle className="w-5 h-5 mr-2" />
                Talk to a Hardware Specialist
              </Button>
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Verified Warranties</h4>
                <p className="text-white text-sm">All machines come with manufacturer warranties and our support guarantee.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">DDP Delivery</h4>
                <p className="text-white text-sm">Delivered duty paid to your facility with full logistics support.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Setup Support</h4>
                <p className="text-white text-sm">Optional configuration and deployment assistance available.</p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <img 
                  src={logo71NoText} 
                  alt="71 Digital Logo" 
                  className="w-8 h-8 mr-3"
                />
                <h3 className="text-xl font-bold text-orange-500">Ready to scale your mining operation?</h3>
              </div>
              
              <p className="text-white text-lg mb-8">Get competitive pricing and bulk purchase agreements.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button>
                  <Phone className="w-5 h-5 mr-2" />
                  Request Quote
                </Button>
                <Button variant="outline">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat with Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}