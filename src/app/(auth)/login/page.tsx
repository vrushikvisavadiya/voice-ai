import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthSplitLayout
      title="Welcome back"
      subtitle="Sign in to your Crack My Interview account to practice role-specific mock interviews."
    >
      <LoginForm />
    </AuthSplitLayout>
  );
}


