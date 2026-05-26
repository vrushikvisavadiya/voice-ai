"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface CancelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function CancelDialog({
  open,
  onOpenChange,
  onConfirm,
}: CancelDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-[28px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel subscription?</AlertDialogTitle>
          <AlertDialogDescription>
            Your Pro plan will remain active until the end of the current
            billing period. You&apos;ll lose access to unlimited interviews, PDF
            exports, and advanced report history after cancellation.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-2xl">
            Keep plan
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="rounded-2xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Cancel subscription
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
