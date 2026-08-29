import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { SignupForm } from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <AuthSplitLayout
      title="Create an account"
      subtitle="Start practicing mock interviews tailored to your target job in seconds."
    >
      <SignupForm />
    </AuthSplitLayout>
  );
}

