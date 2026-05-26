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

interface DeleteSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role?: string;
  company?: string;
  onConfirm: () => void;
}

export function DeleteSessionDialog({
  open,
  onOpenChange,
  role,
  company,
  onConfirm,
}: DeleteSessionDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-[28px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this session?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently remove the session for {role ?? "this role"}{" "}
            at {company ?? "this company"}, including any associated progress
            and results.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-2xl">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="rounded-2xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
