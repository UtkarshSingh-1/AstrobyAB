'use client';

import React from "react"

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

export default function CompleteProfile() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    dateOfBirth: '',
    timeOfBirth: '',
    birthPlace: '',
    birthCity: '',
    birthCountry: '',
    gender: '',
    maritalStatus: '',
    education: '',
    profession: '',
    bio: '',
  });

  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!session) {
    redirect('/signin');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Profile completed successfully!');
        redirect('/dashboard');
      } else {
        toast.error('Failed to save profile');
      }
    } catch (error) {
      console.error('[v0] Profile error:', error);
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
                Complete Your Cosmic Profile
              </h1>
              <p className="text-muted-foreground">
                Share your birth details for personalized kundli and astrological guidance
              </p>
            </div>

            <Card className="p-8 border-cosmic">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Birth Date & Time */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Date of Birth</label>
                    <Input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Time of Birth</label>
                    <Input
                      type="time"
                      name="timeOfBirth"
                      value={formData.timeOfBirth}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Birth Location */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Birth Place</label>
                    <Input
                      type="text"
                      name="birthPlace"
                      placeholder="Hospital/Location"
                      value={formData.birthPlace}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">City</label>
                    <Input
                      type="text"
                      name="birthCity"
                      value={formData.birthCity}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Country</label>
                    <Input
                      type="text"
                      name="birthCountry"
                      value={formData.birthCountry}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Personal Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Marital Status</label>
                    <select
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    >
                      <option value="">Select Status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                    </select>
                  </div>
                </div>

                {/* Education & Profession */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Education</label>
                    <Input
                      type="text"
                      name="education"
                      placeholder="e.g., B.A., M.S."
                      value={formData.education}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Profession</label>
                    <Input
                      type="text"
                      name="profession"
                      placeholder="e.g., Engineer, Doctor"
                      value={formData.profession}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium mb-2">About You</label>
                  <textarea
                    name="bio"
                    placeholder="Tell us about yourself..."
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  />
                </div>

                {/* Submit */}
                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-mars text-white"
                  >
                    {loading ? 'Saving...' : 'Complete Profile'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => redirect('/dashboard')}
                    className="bg-transparent"
                  >
                    Skip for Now
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
