'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

interface Service {
  id: string;
  name: string;
  slug?: string | null;
  price: number;
  description?: string;
  icon?: string;
}

const defaultServices = [
  {
    name: 'Janam Kundli Analysis',
    slug: 'janam-kundli',
    price: 501,
    description: 'Comprehensive birth chart analysis revealing your life path, strengths, and cosmic blueprint.',
    icon: '\u{1FA90}',
  },
  {
    name: 'Career & Education Guidance',
    slug: 'career-guidance',
    price: 501,
    description: 'Astrological insights to guide your professional journey and educational choices.',
    icon: '\u{1F4BC}',
  },
  {
    name: 'Marriage & Relationship Matching',
    slug: 'marriage-matching',
    price: 501,
    description: 'Kundli matching for compatibility assessment and relationship harmony.',
    icon: '\u{1F491}',
  },
  {
    name: 'Health & Wealth Astrology',
    slug: 'health-wealth',
    price: 501,
    description: 'Planetary insights for physical wellbeing and financial prosperity.',
    icon: '\u{1FA7A}',
  },
  {
    name: 'Gemstone Remedies',
    slug: 'gemstone-remedies',
    price: 501,
    description: 'Personalized gemstone recommendations based on your planetary positions.',
    icon: '\u{1F48E}',
  },
  {
    name: 'Mantra & Spiritual Remedies',
    slug: 'mantra-remedies',
    price: 501,
    description: 'Sacred mantras and rituals to harmonize planetary energies.',
    icon: '\u{1F4FF}',
  },
  {
    name: 'Complete Astrology Analysis',
    slug: 'complete-astrology',
    price: 21001,
    description: 'Our most comprehensive package combining all services.',
    icon: '\u{1F30C}',
  },
];

export default function AdminPricing() {
  const { data: session, status } = useSession();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    slug: '',
    price: 0,
    description: '',
    icon: '',
  });
  const [newService, setNewService] = useState({
    name: '',
    slug: '',
    price: '',
    description: '',
    icon: '',
  });
  const [syncedDefaults, setSyncedDefaults] = useState(false);

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
      redirect('/unauthorized');
    }
  }, [session, status]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchServices();
    }
  }, [status]);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      if (response.ok) {
        const data = await response.json();
        setServices(data.services || []);
      }
    } catch (error) {
      console.error('[v0] Failed to fetch services:', error);
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (syncedDefaults) {
      return;
    }

    const existingNames = new Set(services.map((s) => s.name.toLowerCase()));
    const missing = defaultServices.filter(
      (service) => !existingNames.has(service.name.toLowerCase())
    );

    if (!missing.length) {
      setSyncedDefaults(true);
      return;
    }

    const syncMissing = async () => {
      try {
        await Promise.all(
          missing.map(async (service) => {
            const response = await fetch('/api/services', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(service),
            });

            if (!response.ok && response.status !== 409) {
              const data = await response.json().catch(() => ({}));
              throw new Error(data.error || 'Failed to sync services');
            }
          })
        );
        await fetchServices();
      } catch (error) {
        console.error('[v0] Failed to sync default services:', error);
      } finally {
        setSyncedDefaults(true);
      }
    };

    syncMissing();
  }, [services, syncedDefaults]);

  const handleUpdateService = async (serviceId: string) => {
    try {
      if (!editForm.name || editForm.price <= 0) {
        toast.error('Please enter a valid name and price');
        return;
      }

      const response = await fetch(`/api/services/${serviceId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editForm.name,
          slug: editForm.slug,
          price: parseFloat(editForm.price.toString()),
          description: editForm.description || undefined,
          icon: editForm.icon || undefined,
        }),
      });

      if (response.ok) {
        await fetchServices();
        setEditingId(null);
        setEditForm({ name: '', slug: '', price: 0, description: '', icon: '' });
        toast.success('Service updated successfully');
      } else {
        const data = await response.json().catch(() => ({}));
        toast.error(data.error || 'Failed to update service');
      }
    } catch (error) {
      console.error('[v0] Failed to update service:', error);
      toast.error('Error updating service');
    }
  };

  const handleCreateService = async () => {
    try {
      if (!newService.name || !newService.price) {
        toast.error('Service name and price are required');
        return;
      }

      const response = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newService.name,
          slug: newService.slug || undefined,
          price: parseFloat(newService.price),
          description: newService.description || undefined,
          icon: newService.icon || undefined,
        }),
      });

      if (response.ok) {
        await fetchServices();
        setNewService({ name: '', slug: '', price: '', description: '', icon: '' });
        toast.success('Service created successfully');
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to create service');
      }
    } catch (error) {
      console.error('[v0] Failed to create service:', error);
      toast.error('Error creating service');
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    try {
      const response = await fetch(`/api/services/${serviceId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchServices();
        toast.success('Service deleted');
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to delete service');
      }
    } catch (error) {
      console.error('[v0] Failed to delete service:', error);
      toast.error('Error deleting service');
    }
  };

  if (status === 'loading' || loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!session || session.user?.role !== 'ADMIN') {
    redirect('/unauthorized');
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            <div className="bg-gradient-mars rounded-lg p-8 shadow-cosmic text-white">
              <h1 className="text-4xl font-display font-bold mb-2">Service Pricing Management</h1>
              <p className="text-white/80">Manage and update service prices for all consultations</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-cosmic">
                <div className="space-y-4">
                  <h3 className="text-xl font-display font-bold text-foreground">
                    Create New Service
                  </h3>
                  <Input
                    type="text"
                    placeholder="Service name"
                    value={newService.name}
                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  />
                  <Input
                    type="text"
                    placeholder="Service slug (optional)"
                    value={newService.slug}
                    onChange={(e) => setNewService({ ...newService, slug: e.target.value })}
                  />
                  <Input
                    type="number"
                    placeholder="Price"
                    value={newService.price}
                    onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                  />
                  <Input
                    type="text"
                    placeholder="Short description"
                    value={newService.description}
                    onChange={(e) =>
                      setNewService({ ...newService, description: e.target.value })
                    }
                  />
                  <Input
                    type="text"
                    placeholder="Icon (emoji)"
                    value={newService.icon}
                    onChange={(e) => setNewService({ ...newService, icon: e.target.value })}
                  />
                  <Button
                    onClick={handleCreateService}
                    className="w-full bg-gradient-mars text-white"
                  >
                    Create Service
                  </Button>
                </div>
              </Card>

              {services.map((service) => (
                <Card key={service.id} className="p-6 border-cosmic">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-display font-bold text-foreground mb-1">
                        {service.name}
                      </h3>
                      {service.slug && (
                        <p className="text-xs text-muted-foreground">Slug: {service.slug}</p>
                      )}
                      {service.description && (
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      )}
                    </div>

                    {editingId === service.id ? (
                      <div className="space-y-3">
                        <Input
                          type="text"
                          placeholder="Service name"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        />
                        <Input
                          type="text"
                          placeholder="Service slug (optional)"
                          value={editForm.slug}
                          onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
                        />
                        <Input
                          type="number"
                          placeholder="Enter price"
                          value={editForm.price}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              price: parseFloat(e.target.value || '0'),
                            })
                          }
                        />
                        <Input
                          type="text"
                          placeholder="Short description"
                          value={editForm.description}
                          onChange={(e) =>
                            setEditForm({ ...editForm, description: e.target.value })
                          }
                        />
                        <Input
                          type="text"
                          placeholder="Icon (emoji)"
                          value={editForm.icon}
                          onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })}
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleUpdateService(service.id)}
                            className="bg-gradient-mars text-white"
                          >
                            Save
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setEditingId(null)}
                            className="bg-transparent"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Current Price</p>
                          <p className="text-2xl font-display font-bold text-gradient-mars">
                            {'\u20B9'}{service.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => {
                              setEditingId(service.id);
                              setEditForm({
                                name: service.name,
                                slug: service.slug || '',
                                price: service.price,
                                description: service.description || '',
                                icon: service.icon || '',
                              });
                            }}
                            className="bg-gradient-mars text-white"
                          >
                            Edit
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" className="bg-transparent">
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Service</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete the service. This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteService(service.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
