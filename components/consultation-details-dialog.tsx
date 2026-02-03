'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface Field {
  label: string;
  value?: string | null;
}

interface ConsultationDetailsDialogProps {
  triggerLabel: string;
  title: string;
  fields: Field[];
}

export default function ConsultationDetailsDialog({
  triggerLabel,
  title,
  fields,
}: ConsultationDetailsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.label}>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {field.label}
              </p>
              <p className="text-sm text-foreground">{field.value || '-'}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
