import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthSplitLayout
      title="Welcome back"
      subtitle="Sign in to continue your interview practice and review your latest sessions."
    >
      <LoginForm />
    </AuthSplitLayout>
  );
}
