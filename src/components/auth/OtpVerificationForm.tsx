"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useForm } from "react-hook-form";
import {
  ArrowLeft,
  Loader2,
  Mail,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";

import { otpSchema, type OtpSchema } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

interface OtpVerificationFormProps {
  email?: string;
}

function maskEmail(email: string) {
  const [name, domain] = email.split("@");
  if (!name || !domain) return email;

  const visibleStart = name.slice(0, 2);
  const visibleEnd = name.length > 4 ? name.slice(-1) : "";
  const masked = `${visibleStart}${"*".repeat(Math.max(name.length - 3, 1))}${visibleEnd}`;

  return `${masked}@${domain}`;
}

export function OtpVerificationForm({
  email = "vrushik@example.com",
}: OtpVerificationFormProps) {
  const router = useRouter();
  const [countdown, setCountdown] = React.useState(30);

  const form = useForm<OtpSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  React.useEffect(() => {
    if (countdown <= 0) return;

    const timer = window.setTimeout(() => {
      setCountdown((value) => value - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [countdown]);

  async function onSubmit() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push("/onboarding");
  }

  function resendCode() {
    if (countdown > 0) return;
    setCountdown(30);
    form.reset({ otp: "" });
  }

  return (
    <Card className="mx-auto w-full max-w-[440px] rounded-[32px] border-border bg-card shadow-none">
      <CardContent className="p-6 sm:p-7">
        <div className="space-y-6">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex size-14 items-center justify-center rounded-2xl border border-border bg-muted/60">
              <ShieldCheck className="size-6 text-foreground" />
            </div>

            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Verify your email
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              Enter the 6-digit verification code sent to
            </p>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-sm text-foreground">
              <Mail className="size-4 text-muted-foreground" />
              <span>{maskEmail(email)}</span>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        pattern={REGEXP_ONLY_DIGITS}
                        value={field.value}
                        onChange={field.onChange}
                        onComplete={() => form.handleSubmit(onSubmit)()}
                        className="w-full justify-center"
                      >
                        <InputOTPGroup className="gap-2.5">
                          <InputOTPSlot
                            index={0}
                            className="size-12 rounded-2xl border border-border text-base font-semibold"
                          />
                          <InputOTPSlot
                            index={1}
                            className="size-12 rounded-2xl border border-border text-base font-semibold"
                          />
                          <InputOTPSlot
                            index={2}
                            className="size-12 rounded-2xl border border-border text-base font-semibold"
                          />
                        </InputOTPGroup>

                        <InputOTPSeparator className="mx-1 text-muted-foreground" />

                        <InputOTPGroup className="gap-2.5">
                          <InputOTPSlot
                            index={3}
                            className="size-12 rounded-2xl border border-border text-base font-semibold"
                          />
                          <InputOTPSlot
                            index={4}
                            className="size-12 rounded-2xl border border-border text-base font-semibold"
                          />
                          <InputOTPSlot
                            index={5}
                            className="size-12 rounded-2xl border border-border text-base font-semibold"
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>

                    <FormMessage className="text-center text-sm" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="h-11 w-full rounded-2xl"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Verifying code...
                  </>
                ) : (
                  "Verify and continue"
                )}
              </Button>
            </form>
          </Form>

          <div className="space-y-3 rounded-[24px] border border-border bg-muted/30 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Didn’t get the code?
                </p>
                <p className="text-xs leading-5 text-muted-foreground">
                  Check spam or request a new one.
                </p>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={resendCode}
                disabled={countdown > 0}
                className="rounded-xl px-3"
              >
                <RefreshCcw className="mr-2 size-4" />
                {countdown > 0 ? `${countdown}s` : "Resend"}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Link
              href="/login"
              className="inline-flex items-center text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              <ArrowLeft className="mr-2 size-4" />
              Back to sign in
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
