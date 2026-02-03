'use client';

import React, { useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 16;
      const y = (event.clientY / window.innerHeight - 0.5) * 16;
      document.documentElement.style.setProperty('--sparkle-x', `${x}px`);
      document.documentElement.style.setProperty('--sparkle-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
