'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AuthRequiredDialog from '@/components/auth-required-dialog';

interface AuthActionProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  dialogTitle?: string;
  dialogDescription?: string;
}

export default function AuthAction({
  href,
  className,
  children,
  dialogTitle,
  dialogDescription,
}: AuthActionProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const dashboardLink =
    session?.user?.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard';

  const shouldRedirectToDashboard =
    href === '/signup' || href === '/signin';

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (status === 'loading') {
      return;
    }

    if (!session?.user) {
      setOpen(true);
      return;
    }

    if (shouldRedirectToDashboard) {
      router.push(dashboardLink);
      return;
    }

    router.push(href);
  };

  return (
    <>
      <button type="button" className={className} onClick={handleClick}>
        {children}
      </button>
      <AuthRequiredDialog
        open={open}
        onOpenChange={setOpen}
        title={dialogTitle}
        description={dialogDescription}
      />
    </>
  );
}
