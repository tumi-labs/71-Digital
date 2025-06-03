import { Button } from "@/components/ui/button";

export default function TailoredSection() {
  const minerTypes = [
    {
      icon: "🏢",
      title: "Family Office: Looking for stable BTC exposure",
      color: "text-blue-400"
    },
    {
      icon: "🏭",
      title: "Large-Scale Miner: Scaling capacity across regions",
      color: "text-red-400"
    },
    {
      icon: "🌐",
      title: "Sovereign Fund or Gov Entity: Seeking CAPEX infrastructure",
      color: "text-blue-400"
    },
    {
      icon: "🧠",
      title: "Tech Founder or HNWI: Exploring retail-friendly co-mining",
      color: "text-pink-400"
    }
  ];

  return (
    <section className="py-16 px-4" id="tailored">
      <div className="container mx-auto max-w-4xl">
        {/* Title */}
        <h2 className="text-3xl font-bold text-orange-500 mb-8">
          Tailored for Every Miner
        </h2>
        
        {/* Description */}
        <p className="text-lg text-white mb-8">
          Whether you're a...
        </p>

        {/* Miner Types */}
        <div className="space-y-6 mb-12">
          {minerTypes.map((miner, index) => (
            <div key={index} className="flex items-center space-x-4">
              <span className="text-2xl">{miner.icon}</span>
              <span className={`text-lg ${miner.color}`}>{miner.title}</span>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="space-y-6">
          <p className="text-lg text-white">
            We build and manage your mining operation — like it's our own.
          </p>
          
          {/* CTA Button */}
          <Button className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors">
            <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
            Talk to Our Team
          </Button>
        </div>
      </div>
    </section>
  );
}