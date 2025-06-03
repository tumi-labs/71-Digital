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
    <section className="py-12 px-4" id="hero">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Logo and Company Name */}
            <div className="space-y-4">
              {/* Orange Wing Logo */}
              <div className="relative">
                <svg width="120" height="80" viewBox="0 0 120 80" className="text-orange-500">
                  <path
                    d="M15 65 Q30 15, 50 35 Q65 20, 80 40 Q95 25, 110 45"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M15 60 Q30 20, 50 40 Q65 25, 80 45 Q95 30, 110 50"
                    stroke="currentColor"
                    strokeWidth="7"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M15 55 Q30 25, 50 45 Q65 30, 80 50 Q95 35, 110 55"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold tracking-wider text-white">71 DIGITAL</h1>
            </div>

            {/* Tagline */}
            <h2 className="text-3xl lg:text-4xl font-bold text-orange-500">
              The Pathway to Financial Freedom
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
              Institutional-Grade Bitcoin Mining. Built in<br />
              the UAE. Scaled Globally.
            </p>

            {/* CTA Button */}
            <div className="pt-4">
              <Button
                className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors flex items-center"
                onClick={handleContactSales}
              >
                <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                Speak to Sales
              </Button>
            </div>
          </div>

          {/* Right Content - Mining Equipment Image */}
          <div className="relative flex justify-end items-center">
            <div className="relative">
              <img
                src={miningImagePath}
                alt="71 Digital mining facility with ASIC miners and server racks"
                className="w-full max-w-lg h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
