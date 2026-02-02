'use client';

import { Input } from "@/components/ui/input"

import React from "react"

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthCard from '@/components/auth-card';
import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/password-input';
import OTPInput from '@/components/otp-input';
import Link from 'next/link';

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/reset/update-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to reset password');
        return;
      }

      // Redirect to signin
      router.push('/signin?reset=success');
    } catch (err) {
      setError('Reset failed');
      console.error('[v0] Reset password error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard 
      title="Reset Password"
      description="Enter the code and your new password"
    >
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground text-center">
          Code sent to <strong>{email}</strong>
        </p>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-3 text-center">Enter Code</label>
            <OTPInput
              value={otp}
              onChange={setOtp}
              disabled={loading}
            />
          </div>

          <PasswordInput
            label="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={loading}
            required
          />

          <PasswordInput
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            disabled={loading}
            required
          />

          <Button 
            type="submit" 
            className="w-full bg-gradient-mars text-white"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </form>

        <div className="text-center text-sm">
          <Link href="/signin" className="text-primary hover:underline">
            Back to sign in
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}

export default function ResetPassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
