import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { OtpVerificationForm } from "@/components/auth/OtpVerificationForm";

export default function VerifyOtpPage() {
  return (
    <AuthSplitLayout
      title="Verify your code"
      subtitle="Complete verification to continue with your account setup or password recovery."
    >
      <OtpVerificationForm />
    </AuthSplitLayout>
  );
}
