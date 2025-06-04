import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { LogOut, Users, Calendar, Mail, Phone, Building, Clock, MessageSquare, UserPlus, Shield, Edit, Trash2, Settings, Check, X, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";
import { z } from "zod";

const createAdminSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const editAdminSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().optional(),
});

type CreateAdminData = z.infer<typeof createAdminSchema>;
type EditAdminData = z.infer<typeof editAdminSchema>;

export default function AdminDashboard() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [adminUser, setAdminUser] = useState<any>(null);
  const [editingAdmin, setEditingAdmin] = useState<any>(null);

  const createAdminForm = useForm<CreateAdminData>({
    resolver: zodResolver(createAdminSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const editAdminForm = useForm<EditAdminData>({
    resolver: zodResolver(editAdminSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

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

  const { data: admins, isLoading: adminsLoading } = useQuery({
    queryKey: ["/api/admin/admins"],
    queryFn: async () => {
      const res = await fetch("/api/admin/admins", {
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Failed to fetch admins");
      return res.json();
    },
    enabled: !!adminUser,
  });

  const createAdminMutation = useMutation({
    mutationFn: async (data: CreateAdminData) => {
      const res = await fetch("/api/admin/create-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create admin");
      return res.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "Admin created successfully",
          description: `Admin account "${data.admin.username}" has been created`,
        });
        createAdminForm.reset();
        queryClient.invalidateQueries({ queryKey: ["/api/admin/admins"] });
      } else {
        toast({
          title: "Failed to create admin",
          description: data.error || "Unknown error occurred",
          variant: "destructive",
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to create admin",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const editAdminMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: EditAdminData }) => {
      const res = await fetch(`/api/admin/admins/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update admin");
      return res.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "Admin updated successfully",
          description: `Admin account "${data.admin.username}" has been updated`,
        });
        setEditingAdmin(null);
        editAdminForm.reset();
        queryClient.invalidateQueries({ queryKey: ["/api/admin/admins"] });
      } else {
        toast({
          title: "Failed to update admin",
          description: data.error || "Unknown error occurred",
          variant: "destructive",
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to update admin",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteAdminMutation = useMutation({
    mutationFn: async (adminId: number) => {
      const res = await fetch(`/api/admin/admins/${adminId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Failed to delete admin");
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Admin deleted successfully",
        description: "Admin account has been removed",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/admins"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to delete admin",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateAppointmentStatusMutation = useMutation({
    mutationFn: async ({ appointmentId, status, rejectionReason }: { appointmentId: number; status: string; rejectionReason?: string }) => {
      const res = await fetch(`/api/admin/appointments/${appointmentId}/status`, {
        method: "PATCH",
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, rejectionReason }),
      });
      if (!res.ok) throw new Error("Failed to update appointment status");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/appointments"] });
      toast({
        title: "Appointment status updated",
        description: "The appointment has been updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to update appointment",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onCreateAdmin = (data: CreateAdminData) => {
    createAdminMutation.mutate(data);
  };

  const onEditAdmin = (data: EditAdminData) => {
    if (editingAdmin) {
      editAdminMutation.mutate({ id: editingAdmin.id, data });
    }
  };

  const startEdit = (admin: any) => {
    setEditingAdmin(admin);
    editAdminForm.setValue("username", admin.username);
    editAdminForm.setValue("password", "");
  };

  const cancelEdit = () => {
    setEditingAdmin(null);
    editAdminForm.reset();
  };

  const confirmDelete = (adminId: number) => {
    if (window.confirm("Are you sure you want to delete this admin account? This action cannot be undone.")) {
      deleteAdminMutation.mutate(adminId);
    }
  };

  const handleApproveAppointment = (appointment: any) => {
    const approved = window.confirm(
      `Approve appointment for ${appointment.fullName}?\n\n` +
      `Service: ${appointment.serviceType}\n` +
      `Date: ${appointment.preferredDate} at ${appointment.preferredTime}\n\n` +
      `Click OK to approve and get contact options.`
    );
    
    if (approved) {
      updateAppointmentStatusMutation.mutate({
        appointmentId: appointment.id,
        status: "approved"
      });
      
      // Show contact options after approval
      setTimeout(() => {
        const contactChoice = window.confirm(
          `✅ Appointment approved successfully!\n\n` +
          `Contact ${appointment.fullName} now?\n\n` +
          `📧 Click OK to send email\n` +
          `📱 Click Cancel to send WhatsApp message`
        );
        
        if (contactChoice) {
          // Email option
          const emailSubject = `Appointment Approved - ${appointment.serviceType}`;
          const emailBody = `Dear ${appointment.fullName},\n\nYour appointment request has been approved!\n\nDetails:\n- Service: ${appointment.serviceType}\n- Date: ${appointment.preferredDate}\n- Time: ${appointment.preferredTime}\n\nWe look forward to meeting with you.\n\nBest regards,\n71 Digital Team`;
          window.open(`mailto:${appointment.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`);
        } else if (appointment.phoneNumber) {
          // WhatsApp option
          const whatsappMessage = `Hello ${appointment.fullName}! Your appointment for ${appointment.serviceType} on ${appointment.preferredDate} at ${appointment.preferredTime} has been approved. We look forward to meeting with you!`;
          window.open(`https://wa.me/${appointment.phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`);
        }
      }, 1000);
    }
  };

  const handleRejectAppointment = (appointment: any) => {
    const rejectionReason = window.prompt(
      `Reject appointment for ${appointment.fullName}?\n\n` +
      `Please provide a reason for rejection:`
    );
    
    if (rejectionReason) {
      updateAppointmentStatusMutation.mutate({
        appointmentId: appointment.id,
        status: "rejected",
        rejectionReason
      });
      
      // Show contact options after rejection
      setTimeout(() => {
        const contactChoice = window.confirm(
          `❌ Appointment rejected.\n\n` +
          `Contact ${appointment.fullName} to explain?\n\n` +
          `📧 Click OK to send email\n` +
          `📱 Click Cancel to send WhatsApp message`
        );
        
        if (contactChoice) {
          // Email option
          const emailSubject = `Regarding Your Appointment Request`;
          const emailBody = `Dear ${appointment.fullName},\n\nThank you for your interest in our ${appointment.serviceType} service.\n\nUnfortunately, we cannot accommodate your request for ${appointment.preferredDate} at ${appointment.preferredTime}.\n\nReason: ${rejectionReason}\n\nPlease feel free to contact us to discuss alternative options.\n\nBest regards,\n71 Digital Team`;
          window.open(`mailto:${appointment.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`);
        } else if (appointment.phoneNumber) {
          // WhatsApp option
          const whatsappMessage = `Hello ${appointment.fullName}, regarding your appointment request for ${appointment.serviceType}: ${rejectionReason}. Please contact us to discuss alternatives.`;
          window.open(`https://wa.me/${appointment.phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`);
        }
      }, 1000);
    }
  };

  const handleMarkCompleted = (appointment: any) => {
    const confirmed = window.confirm(
      `Mark appointment with ${appointment.fullName} as completed?\n\n` +
      `Service: ${appointment.serviceType}\n` +
      `Date: ${appointment.preferredDate}`
    );
    
    if (confirmed) {
      updateAppointmentStatusMutation.mutate({
        appointmentId: appointment.id,
        status: "completed"
      });
    }
  };

  const getStatusBadgeProps = (status: string) => {
    switch (status) {
      case "approved":
        return { 
          className: "bg-green-500/20 text-green-400 border-green-500/30",
          icon: <CheckCircle className="w-3 h-3 mr-1" />
        };
      case "rejected":
        return { 
          className: "bg-red-500/20 text-red-400 border-red-500/30",
          icon: <XCircle className="w-3 h-3 mr-1" />
        };
      case "completed":
        return { 
          className: "bg-blue-500/20 text-blue-400 border-blue-500/30",
          icon: <CheckCircle className="w-3 h-3 mr-1" />
        };
      default:
        return { 
          className: "bg-orange-500/20 text-orange-400 border-orange-500/30",
          icon: <Clock className="w-3 h-3 mr-1" />
        };
    }
  };

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
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-300 text-sm sm:text-base">Welcome back, {adminUser.username}</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="border-orange-500/30 text-orange-500 hover:bg-orange-500/10 w-fit"
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
          <TabsList className="bg-white/10 border-orange-500/30 grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
            <TabsTrigger value="contacts" className="data-[state=active]:bg-orange-500/20 text-white text-xs sm:text-sm px-2 py-2">
              <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Contact Submissions</span>
              <span className="sm:hidden">Contacts</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="data-[state=active]:bg-orange-500/20 text-white text-xs sm:text-sm px-2 py-2">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Appointments</span>
              <span className="sm:hidden">Appts</span>
            </TabsTrigger>
            <TabsTrigger value="create-admin" className="data-[state=active]:bg-orange-500/20 text-white text-xs sm:text-sm px-2 py-2">
              <UserPlus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Create Admin</span>
              <span className="sm:hidden">Create</span>
            </TabsTrigger>
            <TabsTrigger value="manage-admins" className="data-[state=active]:bg-orange-500/20 text-white text-xs sm:text-sm px-2 py-2">
              <Settings className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Manage Admins</span>
              <span className="sm:hidden">Manage</span>
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
                  <>
                    {/* Mobile Card Layout */}
                    <div className="block lg:hidden space-y-4">
                      {contacts?.map((contact: any) => (
                        <div key={contact.id} className="bg-white/5 rounded-lg p-4 border border-orange-500/20">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-white font-medium text-sm">{contact.fullName}</h3>
                            <span className="text-gray-400 text-xs">
                              {format(new Date(contact.createdAt), "MMM d")}
                            </span>
                          </div>
                          
                          <div className="space-y-2 text-xs">
                            <div className="flex items-center">
                              <Mail className="w-3 h-3 text-orange-500 mr-2 flex-shrink-0" />
                              <a 
                                href={`mailto:${contact.email}`}
                                className="text-orange-400 hover:text-orange-300 underline truncate"
                              >
                                {contact.email}
                              </a>
                            </div>
                            
                            {contact.phoneNumber && (
                              <div className="flex items-center">
                                <Phone className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                                <a 
                                  href={`https://wa.me/${contact.phoneNumber.replace(/[^0-9]/g, '')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-green-400 hover:text-green-300 underline"
                                >
                                  {contact.phoneNumber}
                                </a>
                              </div>
                            )}
                            
                            {contact.companyName && (
                              <div className="flex items-center">
                                <Building className="w-3 h-3 text-gray-400 mr-2 flex-shrink-0" />
                                <span className="text-gray-300">{contact.companyName}</span>
                              </div>
                            )}
                            
                            {contact.service && (
                              <div className="flex items-center">
                                <Settings className="w-3 h-3 text-gray-400 mr-2 flex-shrink-0" />
                                <span className="text-gray-300">{contact.service}</span>
                              </div>
                            )}
                          </div>
                          
                          {contact.message && (
                            <div className="mt-3 pt-3 border-t border-orange-500/20">
                              <div className="flex items-start">
                                <MessageSquare className="w-3 h-3 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                                <p className="text-gray-300 text-xs leading-relaxed">{contact.message}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Desktop Table Layout */}
                    <div className="hidden lg:block overflow-x-auto">
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
                              <TableCell className="text-white">
                                <a 
                                  href={`mailto:${contact.email}`}
                                  className="text-orange-400 hover:text-orange-300 underline"
                                >
                                  {contact.email}
                                </a>
                              </TableCell>
                              <TableCell className="text-white">{contact.companyName || "-"}</TableCell>
                              <TableCell className="text-white">
                                {contact.phoneNumber ? (
                                  <a 
                                    href={`https://wa.me/${contact.phoneNumber.replace(/[^0-9]/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-400 hover:text-green-300 underline"
                                  >
                                    {contact.phoneNumber}
                                  </a>
                                ) : "-"}
                              </TableCell>
                              <TableCell className="text-white">{contact.service || "-"}</TableCell>
                              <TableCell className="text-white max-w-xs truncate" title={contact.message}>
                                {contact.message}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </>
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
                  <>
                    {/* Mobile Card Layout */}
                    <div className="block lg:hidden space-y-4">
                      {appointments?.map((appointment: any) => (
                        <div key={appointment.id} className="bg-white/5 rounded-lg p-4 border border-orange-500/20">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-white font-medium text-sm">{appointment.fullName}</h3>
                              <p className="text-gray-400 text-xs mt-1">{appointment.serviceType}</p>
                            </div>
                            <div className="text-right">
                              <Badge className={`${getStatusBadgeProps(appointment.status).className} text-xs flex items-center w-fit ml-auto`}>
                                {getStatusBadgeProps(appointment.status).icon}
                                {appointment.status}
                              </Badge>
                              <p className="text-gray-400 text-xs mt-1">
                                {format(new Date(appointment.createdAt), "MMM d")}
                              </p>
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-xs">
                            <div className="flex items-center">
                              <Mail className="w-3 h-3 text-orange-500 mr-2 flex-shrink-0" />
                              <a 
                                href={`mailto:${appointment.email}`}
                                className="text-orange-400 hover:text-orange-300 underline truncate"
                              >
                                {appointment.email}
                              </a>
                            </div>
                            
                            {appointment.phoneNumber && (
                              <div className="flex items-center">
                                <Phone className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                                <a 
                                  href={`https://wa.me/${appointment.phoneNumber.replace(/[^0-9]/g, '')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-green-400 hover:text-green-300 underline"
                                >
                                  {appointment.phoneNumber}
                                </a>
                              </div>
                            )}
                            
                            {appointment.companyName && (
                              <div className="flex items-center">
                                <Building className="w-3 h-3 text-gray-400 mr-2 flex-shrink-0" />
                                <span className="text-gray-300">{appointment.companyName}</span>
                              </div>
                            )}
                            
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 text-blue-400 mr-2 flex-shrink-0" />
                              <span className="text-gray-300">{appointment.preferredDate} at {appointment.preferredTime}</span>
                            </div>
                            
                            {appointment.timezone && (
                              <div className="flex items-center">
                                <Clock className="w-3 h-3 text-gray-400 mr-2 flex-shrink-0" />
                                <span className="text-gray-300">{appointment.timezone}</span>
                              </div>
                            )}
                          </div>
                          
                          {appointment.message && (
                            <div className="mt-3 pt-3 border-t border-orange-500/20">
                              <div className="flex items-start">
                                <MessageSquare className="w-3 h-3 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                                <p className="text-gray-300 text-xs leading-relaxed">{appointment.message}</p>
                              </div>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="mt-4 pt-3 border-t border-orange-500/20">
                            {appointment.status === "pending" && (
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleApproveAppointment(appointment)}
                                  disabled={updateAppointmentStatusMutation.isPending}
                                  className="bg-green-600 hover:bg-green-700 text-white text-xs flex-1"
                                >
                                  <Check className="w-3 h-3 mr-1" />
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleRejectAppointment(appointment)}
                                  disabled={updateAppointmentStatusMutation.isPending}
                                  className="bg-red-600 hover:bg-red-700 text-white text-xs flex-1"
                                >
                                  <X className="w-3 h-3 mr-1" />
                                  Reject
                                </Button>
                              </div>
                            )}
                            
                            {appointment.status === "approved" && (
                              <Button
                                size="sm"
                                onClick={() => handleMarkCompleted(appointment)}
                                disabled={updateAppointmentStatusMutation.isPending}
                                className="bg-blue-600 hover:bg-blue-700 text-white text-xs w-full"
                              >
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Mark Completed
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Desktop Table Layout */}
                    <div className="hidden lg:block overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-orange-500/30">
                            <TableHead className="text-gray-300">Date Booked</TableHead>
                            <TableHead className="text-gray-300">Name</TableHead>
                            <TableHead className="text-gray-300">Email</TableHead>
                            <TableHead className="text-gray-300">Phone</TableHead>
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
                              <TableCell className="text-white">
                                <a 
                                  href={`mailto:${appointment.email}`}
                                  className="text-orange-400 hover:text-orange-300 underline"
                                >
                                  {appointment.email}
                                </a>
                              </TableCell>
                              <TableCell className="text-white">
                                {appointment.phoneNumber ? (
                                  <a 
                                    href={`https://wa.me/${appointment.phoneNumber.replace(/[^0-9]/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-400 hover:text-green-300 underline"
                                  >
                                    {appointment.phoneNumber}
                                  </a>
                                ) : "-"}
                              </TableCell>
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
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create-admin" className="space-y-4">
            <Card className="bg-white/10 backdrop-blur-sm border-orange-500/30 max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-white flex items-center text-lg">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-orange-500" />
                  Create Admin Account
                </CardTitle>
                <CardDescription className="text-gray-300 text-sm">
                  Create a new administrator account with full access to the dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...createAdminForm}>
                  <form onSubmit={createAdminForm.handleSubmit(onCreateAdmin)} className="space-y-4">
                    <FormField
                      control={createAdminForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Username</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter admin username"
                              {...field}
                              className="bg-white/10 border-orange-500/30 text-white placeholder:text-gray-400 focus:border-orange-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={createAdminForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter admin password"
                              {...field}
                              className="bg-white/10 border-orange-500/30 text-white placeholder:text-gray-400 focus:border-orange-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                      disabled={createAdminMutation.isPending}
                    >
                      {createAdminMutation.isPending ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Creating Admin...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <UserPlus className="w-4 h-4" />
                          <span>Create Admin</span>
                        </div>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage-admins" className="space-y-4">
            <Card className="bg-white/10 backdrop-blur-sm border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-orange-500" />
                  Manage Admin Accounts
                </CardTitle>
                <CardDescription className="text-gray-300">
                  View, edit, and manage all administrator accounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                {adminsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Edit Form */}
                    {editingAdmin && (
                      <Card className="bg-white/5 border-orange-500/20">
                        <CardHeader>
                          <CardTitle className="text-white text-lg">
                            Edit Admin: {editingAdmin.username}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Form {...editAdminForm}>
                            <form onSubmit={editAdminForm.handleSubmit(onEditAdmin)} className="space-y-4">
                              <FormField
                                control={editAdminForm.control}
                                name="username"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-white">Username</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter username"
                                        {...field}
                                        className="bg-white/10 border-orange-500/30 text-white placeholder:text-gray-400 focus:border-orange-500"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={editAdminForm.control}
                                name="password"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-white">
                                      New Password (leave empty to keep current)
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        type="password"
                                        placeholder="Enter new password"
                                        {...field}
                                        className="bg-white/10 border-orange-500/30 text-white placeholder:text-gray-400 focus:border-orange-500"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <div className="flex space-x-2">
                                <Button
                                  type="submit"
                                  className="bg-orange-600 hover:bg-orange-700 text-white"
                                  disabled={editAdminMutation.isPending}
                                >
                                  {editAdminMutation.isPending ? (
                                    <div className="flex items-center space-x-2">
                                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                      <span>Updating...</span>
                                    </div>
                                  ) : (
                                    "Update Admin"
                                  )}
                                </Button>
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={cancelEdit}
                                  className="border-orange-500/30 text-orange-500 hover:bg-orange-500/10"
                                >
                                  Cancel
                                </Button>
                              </div>
                            </form>
                          </Form>
                        </CardContent>
                      </Card>
                    )}

                    {/* Admin List */}
                    <>
                      {/* Mobile Card Layout */}
                      <div className="block lg:hidden space-y-4">
                        {admins?.map((admin: any) => (
                          <div key={admin.id} className="bg-white/5 rounded-lg p-4 border border-orange-500/20">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h3 className="text-white font-medium text-sm">{admin.username}</h3>
                                <p className="text-gray-400 text-xs mt-1">
                                  Created {format(new Date(admin.createdAt), "MMM d, yyyy")}
                                </p>
                              </div>
                              <Badge 
                                className={
                                  admin.id === adminUser?.id
                                    ? "bg-green-500/20 text-green-400 border-green-500/30 text-xs"
                                    : "bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs"
                                }
                              >
                                {admin.id === adminUser?.id ? "You" : "Active"}
                              </Badge>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => startEdit(admin)}
                                disabled={editingAdmin?.id === admin.id}
                                className="border-orange-500/30 text-orange-500 hover:bg-orange-500/10 flex-1 text-xs"
                              >
                                <Edit className="w-3 h-3 mr-1" />
                                Edit
                              </Button>
                              {admin.id !== adminUser?.id && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => confirmDelete(admin.id)}
                                  disabled={deleteAdminMutation.isPending}
                                  className="border-red-500/30 text-red-500 hover:bg-red-500/10 flex-1 text-xs"
                                >
                                  <Trash2 className="w-3 h-3 mr-1" />
                                  Delete
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Desktop Table Layout */}
                      <div className="hidden lg:block overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="border-orange-500/30">
                              <TableHead className="text-gray-300">Username</TableHead>
                              <TableHead className="text-gray-300">Created</TableHead>
                              <TableHead className="text-gray-300">Status</TableHead>
                              <TableHead className="text-gray-300">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {admins?.map((admin: any) => (
                              <TableRow key={admin.id} className="border-orange-500/20">
                                <TableCell className="text-white font-medium">{admin.username}</TableCell>
                                <TableCell className="text-white">
                                  {format(new Date(admin.createdAt), "MMM d, yyyy")}
                                </TableCell>
                                <TableCell>
                                  <Badge 
                                    className={
                                      admin.id === adminUser?.id
                                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                                        : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                    }
                                  >
                                    {admin.id === adminUser?.id ? "Current User" : "Active"}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <div className="flex space-x-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => startEdit(admin)}
                                      disabled={editingAdmin?.id === admin.id}
                                      className="border-orange-500/30 text-orange-500 hover:bg-orange-500/10"
                                    >
                                      <Edit className="w-4 h-4" />
                                    </Button>
                                    {admin.id !== adminUser?.id && (
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => confirmDelete(admin.id)}
                                        disabled={deleteAdminMutation.isPending}
                                        className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    )}
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </>
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