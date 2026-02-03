'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import AuthRequiredDialog from '@/components/auth-required-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface Service {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export default function BookConsultation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    consultationDate: '',
    birthPlace: '',
    birthDate: '',
    birthTime: '',
    consultationPurpose: '',
  });
  const [loading, setLoading] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      setAuthDialogOpen(true);
    }
  }, [status]);

  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        name: session.user?.name || '',
        email: session.user?.email || '',
      }));
    }
  }, [session]);

  useEffect(() => {
    fetchServices();
  }, [searchParams]);

  const normalizeServiceSlug = (value: string) =>
    value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      if (response.ok) {
        const data = await response.json();
        setServices(data.services || []);
        if (data.services?.length > 0) {
          const requested = searchParams.get('service');
          const matched = requested
            ? data.services.find(
                (service: Service) =>
                  service.id === requested ||
                  normalizeServiceSlug(service.name) === requested
              )
            : null;
          setSelectedServiceId(matched?.id || data.services[0].id);
        }
      }
    } catch (error) {
      console.error('[v0] Failed to fetch services:', error);
      toast.error('Failed to load services');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!session?.user) {
        setAuthDialogOpen(true);
        setLoading(false);
        return;
      }

      const selectedService = services.find((s) => s.id === selectedServiceId);
      if (!selectedService) {
        toast.error('Please select a service');
        setLoading(false);
        return;
      }

      if (!formData.birthPlace || !formData.birthDate || !formData.birthTime) {
        toast.error('Please enter your birth details');
        setLoading(false);
        return;
      }

      if (!formData.consultationPurpose) {
        toast.error('Please share the purpose of your consultation');
        setLoading(false);
        return;
      }

      if (!formData.consultationDate) {
        toast.error('Please select a consultation date');
        setLoading(false);
        return;
      }

      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          serviceName: selectedService.name,
          price: selectedService.price,
          consultationDate: formData.consultationDate,
          birthPlace: formData.birthPlace,
          birthDate: formData.birthDate,
          birthTime: formData.birthTime,
          consultationPurpose: formData.consultationPurpose,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Consultation booked! Proceeding to payment...');
        setTimeout(() => router.push(`/payment?consultationId=${data.booking.id}`), 1500);
      } else {
        toast.error(data.error || 'Failed to book consultation');
      }
    } catch (error) {
      console.error('[v0] Booking error:', error);
      toast.error('Error booking consultation');
    } finally {
      setLoading(false);
    }
  };

  const selectedService = services.find((s) => s.id === selectedServiceId);
  const formDisabled = status !== 'authenticated';

  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <>
      <Header />
      <AuthRequiredDialog
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        title="Sign up to book a consultation"
        description="Create an account or sign in to continue with your booking."
      />
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-8">
            <div className="bg-gradient-mars rounded-lg p-8 shadow-cosmic text-white">
              <h1 className="text-4xl font-display font-bold mb-2">Book Your Consultation</h1>
              <p className="text-white/80">Select a service and complete your booking</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Services List */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold">Available Services</h2>
                <div className="space-y-3">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => setSelectedServiceId(service.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedServiceId === service.id
                          ? 'border-gradient-mars bg-gradient-mars/10'
                          : 'border-border hover:border-muted'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-display font-bold text-foreground">{service.name}</h3>
                          {service.description && (
                            <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-display font-bold text-gradient-mars">
                            ₹{service.price.toFixed(0)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking Form */}
              <div>
                <Card className="p-8 border-cosmic sticky top-8">
                  <form onSubmit={handleBooking} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={formDisabled}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={formDisabled}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Birth Place</label>
                      <Input
                        type="text"
                        name="birthPlace"
                        value={formData.birthPlace}
                        onChange={handleChange}
                        placeholder="City, State, Country"
                        required
                        disabled={formDisabled}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Birth Date</label>
                        <Input
                          type="date"
                          name="birthDate"
                          value={formData.birthDate}
                          onChange={handleChange}
                          required
                          disabled={formDisabled}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Birth Time</label>
                        <Input
                          type="time"
                          name="birthTime"
                          value={formData.birthTime}
                          onChange={handleChange}
                          required
                          disabled={formDisabled}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Purpose of Consultation</label>
                      <Textarea
                        name="consultationPurpose"
                        value={formData.consultationPurpose}
                        onChange={handleChange}
                        placeholder="Share what you'd like to discuss"
                        rows={4}
                        required
                        disabled={formDisabled}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Preferred Consultation Date</label>
                      <Input
                        type="date"
                        name="consultationDate"
                        value={formData.consultationDate}
                        onChange={handleChange}
                        required
                        disabled={formDisabled}
                      />
                    </div>

                    {selectedService && (
                      <div className="bg-gradient-warm rounded-lg p-4 space-y-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Service</p>
                          <p className="font-display font-bold text-foreground">{selectedService.name}</p>
                        </div>
                        <div className="pt-2 border-t border-border">
                          <p className="text-sm text-muted-foreground">Total Amount</p>
                          <p className="text-2xl font-display font-bold text-gradient-mars">
                            ₹{selectedService.price.toFixed(0)}
                          </p>
                        </div>
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={loading || !selectedService || formDisabled}
                      className="w-full bg-gradient-mars text-white"
                    >
                      {loading ? 'Processing...' : 'Proceed to Payment'}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                      className="w-full bg-transparent"
                    >
                      Cancel
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
