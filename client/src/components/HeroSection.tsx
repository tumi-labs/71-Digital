import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import miningImagePath from "@assets/miner pic.png";

export default function HeroSection() {
  const handleContactSales = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 px-4" id="hero">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Logo and Company Name */}
            <div className="flex items-center space-x-4">
              {/* Orange Wing Logo */}
              <div className="relative">
                <svg width="80" height="60" viewBox="0 0 80 60" className="text-orange-500">
                  <path
                    d="M10 50 Q20 10, 35 25 Q45 15, 55 30 Q65 20, 75 35"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10 45 Q20 15, 35 30 Q45 20, 55 35 Q65 25, 75 40"
                    stroke="currentColor"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10 40 Q20 20, 35 35 Q45 25, 55 40 Q65 30, 75 45"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-wider">71 DIGITAL</h1>
            </div>

            {/* Tagline */}
            <h2 className="text-2xl lg:text-3xl font-bold text-orange-500">
              The Pathway to Financial Freedom
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-300 leading-relaxed">
              Institutional-Grade Bitcoin Mining. Built in the UAE. Scaled Globally.
            </p>

            {/* CTA Button */}
            <Button
              className="bg-orange-500 text-black px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
              onClick={handleContactSales}
            >
              <Phone className="mr-2 h-4 w-4" />
              Speak to Sales
            </Button>
          </div>

          {/* Right Content - Mining Equipment Image */}
          <div className="relative">
            {/* Main Mining Equipment Image */}
            <div className="w-full h-80 lg:h-96 overflow-hidden relative">
              <img
                src={miningImagePath}
                alt="71 Digital mining facility with ASIC miners and server racks"
                className="w-full h-full object-cover object-right rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
