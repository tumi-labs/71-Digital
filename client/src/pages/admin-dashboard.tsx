import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { LogOut, Users, Calendar, Mail, Phone, Building, Clock, MessageSquare } from "lucide-react";
import { format } from "date-fns";

export default function AdminDashboard() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [adminUser, setAdminUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const user = localStorage.getItem("adminUser");
    
    if (!token || !user) {
      setLocation("/admin/login");
      return;
    }
    
    setAdminUser(JSON.parse(user));
  }, [setLocation]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("adminToken");
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const { data: contacts, isLoading: contactsLoading } = useQuery({
    queryKey: ["/api/admin/contacts"],
    queryFn: async () => {
      const res = await fetch("/api/admin/contacts", {
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Failed to fetch contacts");
      return res.json();
    },
    enabled: !!adminUser,
  });

  const { data: appointments, isLoading: appointmentsLoading } = useQuery({
    queryKey: ["/api/admin/appointments"],
    queryFn: async () => {
      const res = await fetch("/api/admin/appointments", {
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Failed to fetch appointments");
      return res.json();
    },
    enabled: !!adminUser,
  });

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        headers: getAuthHeaders(),
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      setLocation("/admin/login");
    }
  };

  if (!adminUser) {
    return null;
  }

  return (
    <div 
      className="min-h-screen p-6"
      style={{
        background: "linear-gradient(135deg, #1A0F08 0%, #2D1810 50%, #1A0F08 100%)"
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-300">Welcome back, {adminUser.username}</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-orange-500/30 text-orange-500 hover:bg-orange-500/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-orange-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Contacts</CardTitle>
              <Users className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{contacts?.length || 0}</div>
              <p className="text-xs text-gray-300">Contact form submissions</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-orange-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{appointments?.length || 0}</div>
              <p className="text-xs text-gray-300">Appointment bookings</p>
            </CardContent>
          </Card>
        </div>

        {/* Data Tables */}
        <Tabs defaultValue="contacts" className="space-y-4">
          <TabsList className="bg-white/10 border-orange-500/30">
            <TabsTrigger value="contacts" className="data-[state=active]:bg-orange-500/20 text-white">
              <Mail className="w-4 h-4 mr-2" />
              Contact Submissions
            </TabsTrigger>
            <TabsTrigger value="appointments" className="data-[state=active]:bg-orange-500/20 text-white">
              <Calendar className="w-4 h-4 mr-2" />
              Appointments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contacts" className="space-y-4">
            <Card className="bg-white/10 backdrop-blur-sm border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-white">Contact Form Submissions</CardTitle>
                <CardDescription className="text-gray-300">
                  Messages received through the contact form
                </CardDescription>
              </CardHeader>
              <CardContent>
                {contactsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-orange-500/30">
                          <TableHead className="text-gray-300">Date</TableHead>
                          <TableHead className="text-gray-300">Name</TableHead>
                          <TableHead className="text-gray-300">Email</TableHead>
                          <TableHead className="text-gray-300">Company</TableHead>
                          <TableHead className="text-gray-300">Phone</TableHead>
                          <TableHead className="text-gray-300">Service</TableHead>
                          <TableHead className="text-gray-300">Message</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {contacts?.map((contact: any) => (
                          <TableRow key={contact.id} className="border-orange-500/20">
                            <TableCell className="text-white">
                              {format(new Date(contact.createdAt), "MMM d, yyyy")}
                            </TableCell>
                            <TableCell className="text-white font-medium">{contact.fullName}</TableCell>
                            <TableCell className="text-white">{contact.email}</TableCell>
                            <TableCell className="text-white">{contact.companyName || "-"}</TableCell>
                            <TableCell className="text-white">{contact.phoneNumber || "-"}</TableCell>
                            <TableCell className="text-white">{contact.service || "-"}</TableCell>
                            <TableCell className="text-white max-w-xs truncate" title={contact.message}>
                              {contact.message}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-4">
            <Card className="bg-white/10 backdrop-blur-sm border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-white">Appointment Bookings</CardTitle>
                <CardDescription className="text-gray-300">
                  Consultation appointments scheduled by clients
                </CardDescription>
              </CardHeader>
              <CardContent>
                {appointmentsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-orange-500/30">
                          <TableHead className="text-gray-300">Date Booked</TableHead>
                          <TableHead className="text-gray-300">Name</TableHead>
                          <TableHead className="text-gray-300">Email</TableHead>
                          <TableHead className="text-gray-300">Company</TableHead>
                          <TableHead className="text-gray-300">Service Type</TableHead>
                          <TableHead className="text-gray-300">Preferred Date</TableHead>
                          <TableHead className="text-gray-300">Time</TableHead>
                          <TableHead className="text-gray-300">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {appointments?.map((appointment: any) => (
                          <TableRow key={appointment.id} className="border-orange-500/20">
                            <TableCell className="text-white">
                              {format(new Date(appointment.createdAt), "MMM d, yyyy")}
                            </TableCell>
                            <TableCell className="text-white font-medium">{appointment.fullName}</TableCell>
                            <TableCell className="text-white">{appointment.email}</TableCell>
                            <TableCell className="text-white">{appointment.companyName || "-"}</TableCell>
                            <TableCell className="text-white">{appointment.serviceType}</TableCell>
                            <TableCell className="text-white">{appointment.preferredDate}</TableCell>
                            <TableCell className="text-white">{appointment.preferredTime}</TableCell>
                            <TableCell>
                              <Badge 
                                variant={appointment.status === "confirmed" ? "default" : "secondary"}
                                className={
                                  appointment.status === "confirmed" 
                                    ? "bg-green-500/20 text-green-400 border-green-500/30" 
                                    : "bg-orange-500/20 text-orange-400 border-orange-500/30"
                                }
                              >
                                {appointment.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}