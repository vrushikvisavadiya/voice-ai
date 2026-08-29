import { Suspense } from "react";
import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { OtpVerificationForm } from "@/components/auth/OtpVerificationForm";

export default function VerifyOtpPage() {
  return (
    <AuthSplitLayout
      title="Verify your email"
      subtitle="We sent a 6-digit security code to your email address."
    >
      <Suspense fallback={<div className="py-8 text-center text-sm text-muted-foreground">Loading...</div>}>
        <OtpVerificationForm />
      </Suspense>
    </AuthSplitLayout>
  );
}

