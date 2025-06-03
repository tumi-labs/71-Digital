import { Button } from "@/components/ui/button";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { SiDogecoin } from "react-icons/si";

interface HeaderProps {
  currentSection: string;
  onNavigate: (section: string) => void;
}

export default function Header({ currentSection, onNavigate }: HeaderProps) {
  const navItems = [
    { id: "about", label: "About us" },
    { id: "services", label: "Services" },
    { id: "store", label: "Mining Store" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className="w-full">
      {/* Crypto Icons Row */}
      <div className="bg-black bg-opacity-30 py-3">
        <div className="container mx-auto px-4 flex justify-center space-x-12">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <FaBitcoin className="text-white text-sm" />
          </div>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <FaEthereum className="text-white text-sm" />
          </div>
          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
            <SiDogecoin className="text-white text-xs" />
          </div>
          <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">K</span>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-orange-500 py-4">
        <div className="container mx-auto px-4">
          <ul className="flex flex-col md:flex-row justify-center md:space-x-16 space-y-2 md:space-y-0 text-black font-semibold text-lg">
            {navItems.map((item) => (
              <li key={item.id}>
                <Button
                  variant="ghost"
                  className={`hover:text-white transition-colors p-0 h-auto font-semibold text-lg ${
                    currentSection === item.id ? "text-white" : "text-black"
                  }`}
                  onClick={() => onNavigate(item.id)}
                >
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
