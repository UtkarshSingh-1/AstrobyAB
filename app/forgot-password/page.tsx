'use client';

import React from "react"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthCard from '@/components/auth-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/reset/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to send OTP');
        return;
      }

      setSent(true);
      setTimeout(() => {
        router.push(`/reset-password?email=${encodeURIComponent(email)}`);
      }, 2000);
    } catch (err) {
      setError('Failed to send OTP');
      console.error('[v0] Forgot password error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <AuthCard title="Check Your Email">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            OTP sent to <strong>{email}</strong>
          </p>
          <p className="text-sm text-muted-foreground">
            Redirecting to password reset...
          </p>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard 
      title="Reset Password"
      description="Enter your email to receive reset instructions"
    >
      <div className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              disabled={loading}
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-mars text-white"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Code'}
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Remember your password? </span>
          <Link href="/signin" className="text-primary hover:underline font-medium">
            Sign In
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}
