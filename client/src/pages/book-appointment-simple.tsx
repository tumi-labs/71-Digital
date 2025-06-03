import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface AppointmentFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

export default function BookAppointment() {
  const [currentSection, setCurrentSection] = useState("appointment");
  const [formData, setFormData] = useState<AppointmentFormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    serviceType: "",
    preferredDate: "",
    preferredTime: "",
    message: ""
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const appointmentMutation = useMutation({
    mutationFn: async (data: AppointmentFormData) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          company: data.companyName,
          phone: data.phoneNumber,
          service: `Appointment Request - ${data.serviceType}`,
          message: `Appointment Details:
Service: ${data.serviceType}
Preferred Date: ${data.preferredDate}
Preferred Time: ${data.preferredTime}
Phone: ${data.phoneNumber}

Additional Message:
${data.message}`
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit appointment request');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Appointment Request Submitted",
        description: "We'll contact you within 24 hours to confirm your appointment.",
      });
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        companyName: "",
        serviceType: "",
        preferredDate: "",
        preferredTime: "",
        message: ""
      });
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit appointment request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.serviceType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    appointmentMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header currentSection={currentSection} onNavigate={handleNavigate} />
      <main>
        <section className="py-12 md:py-16 px-4">
          <div className="container mx-auto max-w-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4">Book an Appointment</h1>
              <p className="text-white text-lg">
                Schedule a consultation with our mining experts to discuss your requirements.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8 border border-orange-500/30">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <Input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="bg-white/20 border-white/30 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Email *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-white/20 border-white/30 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <Input
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="bg-white/20 border-white/30 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Company Name
                    </label>
                    <Input
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="bg-white/20 border-white/30 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Service Type *
                  </label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    required
                    className="w-full h-12 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="">Select a service</option>
                    <option value="hosting-consultation">Hosting Solutions Consultation</option>
                    <option value="site-acquisition">Site Acquisition & Power Deals</option>
                    <option value="hardware-procurement">Hardware Procurement</option>
                    <option value="operations-management">Mining Operations & Site Management</option>
                    <option value="technical-consultation">Technical Consultation</option>
                    <option value="partnership-discussion">Partnership & Joint Venture Discussion</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Preferred Date
                    </label>
                    <Input
                      name="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      className="bg-white/20 border-white/30 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Preferred Time
                    </label>
                    <Input
                      name="preferredTime"
                      type="time"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      className="bg-white/20 border-white/30 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Additional Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="bg-white/20 border-white/30 text-white"
                    placeholder="Tell us more about your requirements..."
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={appointmentMutation.isPending}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3"
                >
                  {appointmentMutation.isPending ? "Submitting..." : "Book Appointment"}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}