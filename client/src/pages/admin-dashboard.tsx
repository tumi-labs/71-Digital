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
import { LogOut, Users, Calendar, Mail, Phone, Building, Clock, MessageSquare, UserPlus, Shield, Edit, Trash2, Settings } from "lucide-react";
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
            <TabsTrigger value="create-admin" className="data-[state=active]:bg-orange-500/20 text-white">
              <UserPlus className="w-4 h-4 mr-2" />
              Create Admin
            </TabsTrigger>
            <TabsTrigger value="manage-admins" className="data-[state=active]:bg-orange-500/20 text-white">
              <Settings className="w-4 h-4 mr-2" />
              Manage Admins
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

          <TabsContent value="create-admin" className="space-y-4">
            <Card className="bg-white/10 backdrop-blur-sm border-orange-500/30 max-w-md">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-orange-500" />
                  Create Admin Account
                </CardTitle>
                <CardDescription className="text-gray-300">
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
                    <div className="overflow-x-auto">
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