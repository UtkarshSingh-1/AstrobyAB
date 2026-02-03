'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AuthCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({ title, description, children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-warm bg-starfield">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/logo.jpeg"
            alt="Astro by AB logo"
            width={140}
            height={140}
            className="h-20 w-auto mb-4 animate-float"
            priority
          />
          <h1 className="font-display text-2xl font-semibold text-gradient-mars">Astro by AB</h1>
          <p className="text-sm text-muted-foreground font-serif mt-1">Vedic Wisdom for Your Journey</p>
        </div>

        <Card className="border-cosmic shadow-cosmic bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="font-display text-xl text-foreground">{title}</CardTitle>
            {description && (
              <CardDescription className="text-muted-foreground">{description}</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {children}
          </CardContent>
        </Card>

        <p className="text-center mt-6 text-xs text-muted-foreground font-serif">
          ॐ गं गणपतये नमः
        </p>
      </div>
    </div>
  );
};

export default AuthCard;
