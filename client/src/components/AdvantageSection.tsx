import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function AdvantageSection() {
  const services = [
    { what: "Site acquisition & lease terms", benefit: "Secure optimal power rates in strategic regions" },
    { what: "ASIC procurement", benefit: "Get top-tier hardware at competitive pricing" },
    { what: "Container-based hosting", benefit: "Air, hydro & immersion - ready in weeks" },
    { what: "24/7 operations & maintenance", benefit: "Real-time monitoring and uptime assurance" },
  ];

  return (
    <section className="py-16 px-4" id="advantage">
      <div className="container mx-auto max-w-6xl">
        {/* Title */}
        <h2 className="text-3xl font-bold text-orange-500 text-center mb-8">
          The 71 Advantage
        </h2>
        
        {/* Subtitle */}
        <div className="text-center mb-12">
          <h3 className="text-xl font-semibold text-white mb-4">
            A Complete Mining Infrastructure Solution
          </h3>
          <p className="text-gray-300 max-w-3xl mx-auto">
            We eliminate the complexity of mining by handling every aspect of deployment from 
            land and power to machines and management.
          </p>
        </div>

        {/* Services Table */}
        <div className="bg-transparent border-2 border-orange-500 rounded-lg overflow-hidden mb-8">
          <div className="grid grid-cols-2">
            {/* Header */}
            <div className="bg-orange-500 bg-opacity-20 border-r border-orange-500 p-4">
              <h4 className="text-orange-500 font-bold text-center text-sm md:text-base">What We Handle</h4>
            </div>
            <div className="bg-orange-500 bg-opacity-20 p-4">
              <h4 className="text-orange-500 font-bold text-center text-sm md:text-base">How You Benefit</h4>
            </div>
            
            {/* Services Rows */}
            {services.flatMap((service, index) => [
              <div key={`what-${index}`} className="border-r border-orange-500 border-t border-orange-500 p-4">
                <p className="text-white text-center text-sm md:text-base">{service.what}</p>
              </div>,
              <div key={`benefit-${index}`} className="border-t border-orange-500 p-4">
                <p className="text-white text-center text-sm md:text-base">{service.benefit}</p>
              </div>
            ])}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 font-semibold rounded-full transition-colors flex items-center justify-center">
            <ArrowRight className="w-4 h-4 mr-3" />
            Explore Our Solutions
          </Button>
        </div>
      </div>
    </section>
  );
}