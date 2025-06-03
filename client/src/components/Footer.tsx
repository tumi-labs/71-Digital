import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function Footer() {
  const handleGetStarted = () => {
    // In a real implementation, this would open a contact form modal
    alert("Contact form would open here. Please reach out to 71 Digital for more information.");
  };

  const handleDownloadBrochure = () => {
    // In a real implementation, this would download a PDF brochure
    alert("Company brochure download would start here.");
  };

  return (
    <footer className="py-12 px-4 bg-black bg-opacity-50" id="contact">
      <div className="container mx-auto text-center">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-orange-500">
            Ready to Scale Your Mining Operation?
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Contact our team today to discuss your institutional-grade Bitcoin mining requirements
            and discover how 71 Digital can accelerate your path to financial freedom.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-orange-500 text-black px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
              onClick={handleGetStarted}
            >
              Get Started Today
            </Button>
            <Button
              variant="outline"
              className="border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-orange-500 hover:text-black transition-colors"
              onClick={handleDownloadBrochure}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Brochure
            </Button>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 text-gray-400 text-sm">
          <p>&copy; 2024 71 Digital. All rights reserved. | UAE Licensed Bitcoin Mining Solutions</p>
        </div>
      </div>
    </footer>
  );
}
