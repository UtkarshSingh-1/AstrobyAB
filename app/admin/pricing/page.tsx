'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

interface Service {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export default function AdminPricing() {
  const { data: session, status } = useSession();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrices, setEditPrices] = useState<Record<string, number>>({});

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

  const handleUpdatePrice = async (serviceId: string) => {
    try {
      const newPrice = editPrices[serviceId];
      if (!newPrice || newPrice <= 0) {
        toast.error('Please enter a valid price');
        return;
      }

      const response = await fetch(`/api/services/${serviceId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price: parseFloat(newPrice.toString()) }),
      });

      if (response.ok) {
        await fetchServices();
        setEditingId(null);
        setEditPrices({});
        toast.success('Price updated successfully');
      } else {
        toast.error('Failed to update price');
      }
    } catch (error) {
      console.error('[v0] Failed to update price:', error);
      toast.error('Error updating price');
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
              {services.map((service) => (
                <Card key={service.id} className="p-6 border-cosmic">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-display font-bold text-foreground mb-1">
                        {service.name}
                      </h3>
                      {service.description && (
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      )}
                    </div>

                    {editingId === service.id ? (
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="Enter price"
                          value={editPrices[service.id] || service.price}
                          onChange={(e) =>
                            setEditPrices({
                              ...editPrices,
                              [service.id]: parseFloat(e.target.value),
                            })
                          }
                        />
                        <Button
                          onClick={() => handleUpdatePrice(service.id)}
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
                    ) : (
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Current Price</p>
                          <p className="text-2xl font-display font-bold text-gradient-mars">
                            ₹{service.price.toFixed(2)}
                          </p>
                        </div>
                        <Button
                          onClick={() => {
                            setEditingId(service.id);
                            setEditPrices({ ...editPrices, [service.id]: service.price });
                          }}
                          className="bg-gradient-mars text-white"
                        >
                          Edit Price
                        </Button>
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
