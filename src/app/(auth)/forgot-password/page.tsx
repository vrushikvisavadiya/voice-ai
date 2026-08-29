import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthSplitLayout
      title="Reset your password"
      subtitle="Enter your account email address to receive password reset instructions."
    >
      <ForgotPasswordForm />
    </AuthSplitLayout>
  );
}
