import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import miningImagePath from "@assets/miner pic.png";
import logoImagePath from "@assets/71digital logo.png";

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
              {/* 71 Digital Logo */}
              <div className="relative">
                <img
                  src={logoImagePath}
                  alt="71 Digital Logo"
                  className="h-24 lg:h-32 w-auto object-contain"
                />
              </div>
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
