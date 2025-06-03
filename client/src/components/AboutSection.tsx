import { Check } from "lucide-react";

export default function AboutSection() {
  const services = [
    "Crypto Mining Hosting (Air, Hydro, and Immersion Cooling)",
    "CAPEX Site Acquisition & Lease Structuring",
    "ASIC Hardware Sourcing & Deployment",
    "Full-Suite Mining Operations & Site Management",
    "Institutional and Retail Mining Solutions",
  ];

  return (
    <section className="py-12 px-4" id="about">
      <div className="container mx-auto max-w-4xl">
        <p className="text-lg text-gray-300 leading-relaxed text-center mb-16">
          Based in the UAE and operating globally, 71 Digital delivers everything needed to launch and
          scale your mining operation. From power-rich site acquisition and hosting to hardware
          logistics and full-facility management. Whether you're building a new fleet or expanding
          existing capacity, all resources and expertise are here to support your growth.
        </p>

        {/* Services List */}
        <div className="space-y-6" id="services">
          {services.map((service, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center flex-shrink-0">
                <Check className="text-white text-sm w-4 h-4" />
              </div>
              <span className="text-lg text-gray-300">{service}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
