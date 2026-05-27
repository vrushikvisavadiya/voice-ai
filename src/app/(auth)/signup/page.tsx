import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { SignupForm } from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <AuthSplitLayout
      title="Create your account"
      subtitle="Start practicing role-specific interviews with AI-generated feedback."
    >
      <SignupForm />
    </AuthSplitLayout>
  );
}
