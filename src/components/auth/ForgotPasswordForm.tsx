"use client";

import * as React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowLeft, Loader2, MailCheck } from "lucide-react";

import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function ForgotPasswordForm() {
  const [submittedEmail, setSubmittedEmail] = React.useState("");

  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgotPasswordSchema) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmittedEmail(values.email);
  }

  return (
    <Card className="rounded-[32px] border-border bg-card shadow-none">
      <CardContent className="p-5 sm:p-6">
        {!submittedEmail ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="you@example.com"
                        autoComplete="email"
                        className="h-10 rounded-2xl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="h-10 w-full rounded-2xl"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Sending link...
                  </>
                ) : (
                  "Send reset link"
                )}
              </Button>

              <Link
                href="/login"
                className="inline-flex items-center text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                <ArrowLeft className="mr-2 size-4" />
                Back to sign in
              </Link>
            </form>
          </Form>
        ) : (
          <div className="space-y-4">
            <div className="flex size-12 items-center justify-center rounded-full border border-border bg-muted">
              <MailCheck className="size-5 text-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                Check your email
              </h3>
              <p className="text-sm leading-6 text-muted-foreground">
                We sent password reset instructions to{" "}
                <span className="font-medium text-foreground">
                  {submittedEmail}
                </span>
                .
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-10 rounded-2xl">
                <Link href="/verify-otp">Enter verification code</Link>
              </Button>
              <Button asChild variant="outline" className="h-10 rounded-2xl">
                <Link href="/login">Back to sign in</Link>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
