import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PricingSection() {
  const plans = [
    {
      name: "Pro",
      rate: "$0.055 per kW",
      cooling: "Air Cooling & Hydro",
      location: "UAE",
      model: "Bitmain & Whatsminer",
      terms: "1 year and renewable",
      maintenance: "Included",
      repairOnSite: "Available",
      deposit: "2 months",
      moq: "10-100",
      bgColor: "bg-orange-500",
      textColor: "text-black",
      buttonColor: "bg-orange-600"
    },
    {
      name: "Premium",
      rate: "$0.053 per kW",
      cooling: "Air Cooling & Hydro",
      location: "UAE",
      model: "Bitmain & Whatsminer",
      terms: "1 year and renewable",
      maintenance: "Included",
      repairOnSite: "Available",
      deposit: "2 months",
      moq: "100+",
      bgColor: "bg-gray-500",
      textColor: "text-white",
      buttonColor: "bg-gray-600"
    },
    {
      name: "Ethiopia",
      rate: "$0.037 per kW",
      cooling: "Air Cooling & Hydro",
      location: "Ethiopia",
      model: "Bitmain & Whatsminer",
      terms: "1 year and renewable",
      maintenance: "Included",
      repairOnSite: "Available",
      deposit: "",
      moq: "100+",
      bgColor: "bg-amber-700",
      textColor: "text-white",
      buttonColor: "bg-amber-800"
    }
  ];

  return (
    <section className="py-16 px-4" id="pricing">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className={`${plan.bgColor} ${plan.textColor} border-none rounded-2xl shadow-xl`}>
              <CardContent className="p-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-center">{plan.name}</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Rate:</span>
                      <span>{plan.rate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Cooling:</span>
                      <span>{plan.cooling}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Location:</span>
                      <span>{plan.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Model:</span>
                      <span>{plan.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Terms:</span>
                      <span>{plan.terms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Maintenance:</span>
                      <span>{plan.maintenance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Repair On-Site:</span>
                      <span>{plan.repairOnSite}</span>
                    </div>
                    {plan.deposit && (
                      <div className="flex justify-between">
                        <span className="font-medium">Deposit:</span>
                        <span>{plan.deposit}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="font-medium">MOQ:</span>
                      <span>{plan.moq}</span>
                    </div>
                  </div>

                  <Button 
                    className={`w-full ${plan.buttonColor} hover:opacity-90 text-white font-bold py-3 rounded-full mt-6`}
                  >
                    BOOK NOW ▶
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}