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

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    timeOfBirth: '',
    birthPlace: '',
    gender: '',
    profession: '',
  });

  useEffect(() => {
    if (!session?.user) {
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/user/profile');
        const data = await response.json();
        if (response.ok && data.profile) {
          setFormData((prev) => ({
            ...prev,
            name: session.user?.name || '',
            dateOfBirth: data.profile.dateOfBirth
              ? new Date(data.profile.dateOfBirth).toISOString().slice(0, 10)
              : '',
            timeOfBirth: data.profile.timeOfBirth || '',
            birthPlace: data.profile.birthPlace || '',
            gender: data.profile.gender || '',
            profession: data.profile.profession || '',
          }));
        } else {
          setFormData((prev) => ({ ...prev, name: session.user?.name || '' }));
        }
      } catch (error) {
        console.error('[v0] Profile fetch error:', error);
      }
    };

    fetchProfile();
  }, [session]);

  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!session) {
    redirect('/signin');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth) : null,
          timeOfBirth: formData.timeOfBirth,
          birthPlace: formData.birthPlace,
          gender: formData.gender,
          profession: formData.profession,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Profile updated successfully');
      } else {
        toast.error(data.error || 'Failed to save profile');
      }
    } catch (error) {
      console.error('[v0] Profile save error:', error);
      toast.error('Error saving profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="space-y-8">
            <div className="bg-gradient-warm rounded-lg p-8 shadow-cosmic">
              <h1 className="text-4xl font-display font-bold text-foreground mb-2">
                Your Profile
              </h1>
              <p className="text-muted-foreground">
                Keep your details updated for better guidance.
              </p>
            </div>

            <Card className="p-8 border-cosmic">
              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input value={session.user?.email || ''} disabled />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Birth Date</label>
                    <Input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Birth Time</label>
                    <Input
                      type="time"
                      name="timeOfBirth"
                      value={formData.timeOfBirth}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Birth Place</label>
                  <Input
                    name="birthPlace"
                    value={formData.birthPlace}
                    onChange={handleChange}
                    placeholder="City, State, Country"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Gender</label>
                    <Input
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      placeholder="Gender"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Profession</label>
                    <Input
                      name="profession"
                      value={formData.profession}
                      onChange={handleChange}
                      placeholder="Profession"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-mars text-white"
                  >
                    {loading ? 'Saving...' : 'Save Profile'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => redirect('/dashboard')}
                    className="bg-transparent"
                  >
                    Back
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
