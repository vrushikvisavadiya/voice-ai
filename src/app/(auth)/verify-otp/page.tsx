import { Suspense } from "react";
import { VerifyOtpForm } from "./verify-otp-form";

export default function VerifyOtpPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <Suspense fallback={<div className="text-center text-sm text-muted-foreground">Loading...</div>}>
        <VerifyOtpForm />
      </Suspense>
    </div>
  );
}
