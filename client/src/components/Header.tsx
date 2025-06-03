import { Button } from "@/components/ui/button";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { SiDogecoin } from "react-icons/si";
import { useLocation } from "wouter";

interface HeaderProps {
  currentSection: string;
  onNavigate: (section: string) => void;
}

export default function Header({ currentSection, onNavigate }: HeaderProps) {
  const [location, setLocation] = useLocation();
  
  const navItems = [
    { id: "home", label: "Home", path: "/" },
    { id: "about", label: "About us", path: "/about" },
    { id: "services", label: "Services", path: "/services" },
    { id: "store", label: "Mining Store" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavigation = (item: any) => {
    if (item.path) {
      setLocation(item.path);
    } else {
      onNavigate(item.id);
    }
  };

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
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 20V50L50 35L80 50V20H65V35L50 27L35 35V20H20Z" fill="white"/>
              <path d="M20 50V80H35V65L50 73L65 65V80H80V50L50 65L20 50Z" fill="white"/>
            </svg>
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
                  onClick={() => handleNavigation(item)}
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
