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
    <section className="py-8 px-4 bg-black bg-opacity-40" id="stats">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-5 gap-16 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center space-y-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <FaBitcoin className="text-black text-lg" />
                </div>
                <div className="space-y-1">
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
