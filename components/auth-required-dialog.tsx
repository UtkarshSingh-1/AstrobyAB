'use client';

import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface AuthRequiredDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
}

export default function AuthRequiredDialog({
  open,
  onOpenChange,
  title = 'Sign up to continue',
  description = 'Create an account or sign in to continue with this action.',
}: AuthRequiredDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Link href="/signin">
            <Button variant="outline" className="w-full sm:w-auto">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="w-full sm:w-auto bg-gradient-mars text-white">
              Sign Up
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
