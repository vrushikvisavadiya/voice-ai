"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2, Mail, Lock, User } from "lucide-react";

import { signupSchema, type SignupSchema } from "@/lib/validations/auth";
import { useRegister } from "@/app/(auth)/signup/use-register";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;

  const checks = [
    { label: "8+ chars", passed: password.length >= 8 },
    { label: "Uppercase letter", passed: /[A-Z]/.test(password) },
    { label: "Number", passed: /[0-9]/.test(password) },
  ];

  const passed = checks.filter((item) => item.passed).length;
  const width =
    passed === 0
      ? "w-0"
      : passed === 1
        ? "w-1/3"
        : passed === 2
          ? "w-2/3"
          : "w-full";
  const color =
    passed === 1
      ? "bg-destructive"
      : passed === 2
        ? "bg-amber-500"
        : "bg-emerald-500";

  return (
    <div className="space-y-1.5 pt-0.5">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/60">
        <div
          className={`h-full rounded-full transition-all duration-300 ${width} ${color}`}
        />
      </div>
      <div className="flex flex-wrap gap-2 text-[11px] text-muted-foreground">
        {checks.map((check) => (
          <span
            key={check.label}
            className={check.passed ? "text-emerald-600 dark:text-emerald-400 font-medium" : ""}
          >
            {check.passed ? "✓" : "•"} {check.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [formError, setFormError] = React.useState("");

  const { mutate: registerMutate, isPending } = useRegister();

  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const passwordValue = form.watch("password") || "";

  function onSubmit(values: SignupSchema) {
    setFormError("");
    registerMutate(
      {
        email: values.email,
        password: values.password,
        full_name: values.fullName,
      },
      {
        onError: (err) => {
          const detail = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail;
          if (detail) {
            setFormError(detail);
          }
        },
      }
    );
  }

  return (
    <div className="space-y-5">


      {formError ? (
        <Alert variant="destructive" className="rounded-2xl py-2.5">
          <AlertDescription className="text-xs">{formError}</AlertDescription>
        </Alert>
      ) : null}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3.5">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold text-foreground">Full Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      placeholder="Jane Doe"
                      autoComplete="name"
                      className="h-11 rounded-2xl pl-10 text-sm bg-muted/20 border-border/70 focus-visible:ring-1 focus-visible:ring-primary"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold text-foreground">Email Address</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="h-11 rounded-2xl pl-10 text-sm bg-muted/20 border-border/70 focus-visible:ring-1 focus-visible:ring-primary"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold text-foreground">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Minimum 8 characters"
                      autoComplete="new-password"
                      className="h-11 rounded-2xl pl-10 pr-10 text-sm bg-muted/20 border-border/70 focus-visible:ring-1 focus-visible:ring-primary"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <PasswordStrength password={passwordValue} />

          <Button
            type="submit"
            disabled={isPending || form.formState.isSubmitting}
            className="h-11 w-full rounded-2xl font-semibold shadow-sm text-sm transition-all"
          >
            {isPending || form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </form>
      </Form>

      <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
        By continuing, you agree to our{" "}
        <Link
          href="/terms"
          className="font-medium text-foreground underline hover:text-primary"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="font-medium text-foreground underline hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </p>

      <p className="text-center text-xs text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary hover:underline underline-offset-4"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}

