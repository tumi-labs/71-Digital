import { FaBitcoin } from "react-icons/fa";

export default function StatsSection() {
  const stats = [
    { value: "95%", label: "Uptime" },
    { value: "Track", label: "Record" },
    { value: "25 MW", label: "Operating" },
    { value: "UAE", label: "Licensed" },
    { value: "Institutional", label: "Clients" },
  ];

  return (
    <section className="py-16 px-4 bg-black bg-opacity-30" id="stats">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-4">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto">
                <FaBitcoin className="text-black text-lg" />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
