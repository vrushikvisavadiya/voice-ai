"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  User,
  Mail,
  Shield,
  CheckCircle2,
  Calendar,
  Sparkles,
  Award,
  FileText,
  Target,
  Loader2,
  Bell,
  Lock,
  Eye,
  EyeOff,
  KeyRound,
  Save,
  Download,
  ExternalLink,
  Clock,
  FolderOpen,
} from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import {
  getResumeHistory,
  downloadResumeFile,
} from "@/app/(platform)/resume-analysis/resume-analysis.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import type { UserProfileResponse } from "@/types/auth";
import { toast } from "sonner";

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
    <div className="space-y-1.5 pt-1">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/60">
        <div
          className={`h-full rounded-full transition-all duration-300 ${width} ${color}`}
        />
      </div>
      <div className="flex flex-wrap gap-2 text-[11px] text-muted-foreground">
        {checks.map((check) => (
          <span
            key={check.label}
            className={
              check.passed
                ? "font-medium text-emerald-600 dark:text-emerald-400"
                : ""
            }
          >
            {check.passed ? "✓" : "•"} {check.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function UploadedResumesTab() {
  const router = useRouter();
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const { data: resumes, isLoading } = useQuery({
    queryKey: ["resume-history"],
    queryFn: getResumeHistory,
  });

  const handleDownload = async (id: string, filename: string) => {
    try {
      setDownloadingId(id);
      await downloadResumeFile(id, filename);
      toast.success("Resume downloaded successfully!");
    } catch {
      toast.error("Failed to download resume file");
    } finally {
      setDownloadingId(null);
    }
  };

  if (isLoading) {
    return (
      <Card className="rounded-3xl border border-border/60 bg-card p-8">
        <div className="flex h-40 items-center justify-center">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      </Card>
    );
  }

  if (!resumes || resumes.length === 0) {
    return (
      <Card className="rounded-3xl border border-border/60 bg-card p-8 text-center space-y-4">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-muted/40 text-muted-foreground mx-auto">
          <FileText className="size-7" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-semibold">No uploaded resumes yet</h3>
          <p className="text-xs text-muted-foreground">
            Upload your resume on the Resume Analysis page to get instant AI matching and scores.
          </p>
        </div>
        <Button onClick={() => router.push("/resume-analysis")} className="rounded-xl px-5">
          Upload Your First Resume
        </Button>
      </Card>
    );
  }

  return (
    <Card className="rounded-3xl border border-border/60 bg-card shadow-sm overflow-hidden">
      <CardHeader className="border-b border-border/40 pb-4">
        <CardTitle className="text-base font-semibold flex items-center justify-between">
          <span>Uploaded Resumes & AI Documents</span>
          <Badge variant="outline" className="text-xs font-normal">
            {resumes.length} {resumes.length === 1 ? "document" : "documents"}
          </Badge>
        </CardTitle>
        <CardDescription className="text-xs">
          View and download original uploaded resumes stored securely on the server.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 divide-y divide-border/40">
        {resumes.map((resume) => {
          const dateStr = new Date(resume.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });

          return (
            <div
              key={resume.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-4 hover:bg-muted/20 transition-colors"
            >
              <div className="flex items-start gap-3.5">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs border border-amber-500/20">
                  <FileText className="size-5" />
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-bold text-foreground truncate max-w-xs sm:max-w-md">
                      {resume.resume_filename}
                    </p>
                    <Badge
                      variant="outline"
                      className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] py-0 px-2 font-medium"
                    >
                      {resume.match_score}% Match
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" />
                      Uploaded {dateStr}
                    </span>
                    {resume.extracted_details?.candidate_name && (
                      <span>• Name: {resume.extracted_details.candidate_name}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 justify-end shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(resume.id, resume.resume_filename)}
                  disabled={downloadingId === resume.id}
                  className="rounded-xl h-9 text-xs gap-1.5 border-border/70"
                >
                  {downloadingId === resume.id ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    <Download className="size-3.5" />
                  )}
                  Download File
                </Button>

                <Button
                  size="sm"
                  onClick={() => router.push(`/resume-analysis/${resume.id}`)}
                  className="rounded-xl h-9 text-xs gap-1.5 font-medium"
                >
                  View AI Match
                  <ExternalLink className="size-3.5" />
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

export default function ProfilePage() {
  const {
    profile,
    isLoading,
    updateProfile,
    isUpdating,
    changePasswordAsync,
    isChangingPassword,
  } = useUserProfile();

  const userProfile = profile as UserProfileResponse | null;

  // Active Tab State
  const [activeTab, setActiveTab] = useState<"account" | "resumes" | "security" | "notifications">("account");

  // Profile Edit State
  const [fullName, setFullName] = useState("");

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    if (userProfile?.full_name) {
      setFullName(userProfile.full_name);
    }
  }, [userProfile?.full_name]);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || fullName === userProfile?.full_name) return;
    updateProfile({ full_name: fullName.trim() });
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword) {
      toast.error("Please enter your current password");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      await changePasswordAsync({
        current_password: currentPassword,
        new_password: newPassword,
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      // Error handled by hook toast
    }
  };

  const formattedDate = userProfile?.created_at
    ? new Date(userProfile.created_at).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Recently";

  if (isLoading && !userProfile) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const avgScore = userProfile?.overall_average_score
    ? Math.min(Math.max(userProfile.overall_average_score, 0), 100)
    : 0;

  return (
    <div className="mx-auto container space-y-8">
      {/* Top Page Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Candidate Profile
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your personal profile details, review performance metrics, access uploaded resumes, and configure password security.
          </p>
        </div>
      </div>

      {/* Hero Banner Card */}
      <Card className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm">
        <div className="h-28 w-full bg-gradient-to-r from-primary/20 via-indigo-500/10 to-emerald-500/15 border-b border-border/40 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        </div>
        <CardContent className="px-6 sm:px-8 pb-6 -mt-12 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            <div className="flex items-end gap-5">
              <div className="relative">
                <div className="flex size-24 items-center justify-center rounded-2xl border-4 border-background bg-gradient-to-br from-primary via-primary/90 to-primary/70 text-primary-foreground font-extrabold text-3xl shadow-lg">
                  {userProfile?.full_name?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="absolute bottom-1 right-1 size-4 rounded-full bg-emerald-500 ring-4 ring-background animate-pulse" />
              </div>

              <div className="space-y-1 mb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-bold text-foreground">
                    {userProfile?.full_name || "Candidate User"}
                  </h2>
                  {userProfile?.is_verified && (
                    <Badge
                      variant="outline"
                      className="gap-1 border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs py-0.5 px-2.5 rounded-full font-medium"
                    >
                      <CheckCircle2 className="size-3.5" />
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{userProfile?.email}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 self-stretch sm:self-auto">
              <Badge variant="secondary" className="gap-1.5 text-xs py-1.5 px-3.5 rounded-xl font-medium">
                <Shield className="size-3.5 text-primary" />
                {userProfile?.roles?.join(", ") || "Candidate"}
              </Badge>
              <Badge variant="outline" className="gap-1.5 text-xs py-1.5 px-3.5 rounded-xl text-muted-foreground border-border/60">
                <Calendar className="size-3.5" />
                Joined {formattedDate}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Performance Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-all hover:border-primary/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Preparations
            </span>
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Target className="size-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-3xl font-extrabold text-foreground">
              {userProfile?.total_job_preparations ?? 0}
            </p>
            <p className="text-[11px] text-muted-foreground mt-1">
              Active job interview setups
            </p>
          </div>
        </Card>

        <Card className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-all hover:border-indigo-500/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Rounds Completed
            </span>
            <div className="flex size-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
              <Award className="size-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-3xl font-extrabold text-foreground">
              {userProfile?.total_rounds_completed ?? 0}
            </p>
            <p className="text-[11px] text-muted-foreground mt-1">
              Technical & behavioral sessions
            </p>
          </div>
        </Card>

        <Card className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-all hover:border-emerald-500/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Overall Score
            </span>
            <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
              <Sparkles className="size-4" />
            </div>
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex items-baseline justify-between">
              <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {avgScore.toFixed(1)}
              </p>
              <span className="text-xs text-muted-foreground font-medium">/ 100</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/60">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${avgScore}%` }}
              />
            </div>
          </div>
        </Card>

        <Card
          onClick={() => setActiveTab("resumes")}
          className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-all hover:border-amber-500/40 cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider group-hover:text-amber-500">
              Resumes Analyzed
            </span>
            <div className="flex size-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 group-hover:scale-105 transition-transform">
              <FileText className="size-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-3xl font-extrabold text-foreground">
              {userProfile?.total_resumes_analyzed ?? 0}
            </p>
            <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
              <span>View uploaded files</span>
              <ExternalLink className="size-3 text-muted-foreground opacity-70 group-hover:opacity-100" />
            </p>
          </div>
        </Card>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="space-y-6">
        <div className="inline-flex h-11 items-center justify-center rounded-2xl bg-muted/40 p-1 border border-border/60 flex-wrap">
          <button
            onClick={() => setActiveTab("account")}
            className={cn(
              "flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium transition-all",
              activeTab === "account"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <User className="size-3.5" />
            Account & Identity
          </button>
          <button
            onClick={() => setActiveTab("resumes")}
            className={cn(
              "flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium transition-all",
              activeTab === "resumes"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <FolderOpen className="size-3.5 text-amber-500" />
            Uploaded Resumes ({userProfile?.total_resumes_analyzed ?? 0})
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={cn(
              "flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium transition-all",
              activeTab === "security"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <KeyRound className="size-3.5" />
            Security & Password
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={cn(
              "flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium transition-all",
              activeTab === "notifications"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Bell className="size-3.5" />
            Preferences
          </button>
        </div>

        {/* Tab 1: Account & Identity */}
        {activeTab === "account" && (
          <Card className="rounded-3xl border border-border/60 bg-card shadow-sm">
            <CardHeader className="border-b border-border/40 pb-4">
              <CardTitle className="text-base font-semibold">Personal Information</CardTitle>
              <CardDescription className="text-xs">
                Update your full name and display credentials across interview feedback reports.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleProfileSave} className="space-y-5 max-w-2xl">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="full_name" className="text-xs font-semibold text-foreground">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        id="full_name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className="h-11 rounded-2xl pl-10 text-sm bg-muted/20 border-border/70 focus-visible:ring-1 focus-visible:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-semibold text-foreground">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        id="email"
                        value={userProfile?.email || ""}
                        disabled
                        className="h-11 rounded-2xl pl-10 text-sm bg-muted/40 text-muted-foreground cursor-not-allowed border-border/40"
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border/50 bg-muted/20 p-4 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">Account Identifier</span>
                    <span className="font-mono text-muted-foreground text-[11px]">
                      {userProfile?.id}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">Roles Assigned</span>
                    <span className="text-muted-foreground capitalize">
                      {userProfile?.roles?.join(", ") || "candidate"}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    type="submit"
                    disabled={
                      isUpdating ||
                      !fullName.trim() ||
                      fullName === userProfile?.full_name
                    }
                    className="h-11 rounded-2xl px-6 font-semibold shadow-sm"
                  >
                    {isUpdating ? (
                      <>
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        Saving Changes...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 size-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Tab 2: Uploaded Resumes */}
        {activeTab === "resumes" && <UploadedResumesTab />}

        {/* Tab 3: Security & Password */}
        {activeTab === "security" && (
          <Card className="rounded-3xl border border-border/60 bg-card shadow-sm">
            <CardHeader className="border-b border-border/40 pb-4">
              <CardTitle className="text-base font-semibold">Change Password</CardTitle>
              <CardDescription className="text-xs">
                Update your account password. Connected directly to backend authentication (`/auth/change-password`).
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handlePasswordChange} className="space-y-5 max-w-xl">
                <div className="space-y-2">
                  <Label htmlFor="current_password" className="text-xs font-semibold text-foreground">
                    Current Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="current_password"
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="h-11 rounded-2xl pl-10 pr-10 text-sm bg-muted/20 border-border/70 focus-visible:ring-1 focus-visible:ring-primary"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword((prev) => !prev)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new_password" className="text-xs font-semibold text-foreground">
                    New Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="new_password"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter minimum 8 characters"
                      className="h-11 rounded-2xl pl-10 pr-10 text-sm bg-muted/20 border-border/70 focus-visible:ring-1 focus-visible:ring-primary"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword((prev) => !prev)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showNewPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                  <PasswordStrength password={newPassword} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm_password" className="text-xs font-semibold text-foreground">
                    Confirm New Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="confirm_password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="h-11 rounded-2xl pl-10 text-sm bg-muted/20 border-border/70 focus-visible:ring-1 focus-visible:ring-primary"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    type="submit"
                    disabled={isChangingPassword || !currentPassword || !newPassword}
                    className="h-11 rounded-2xl px-6 font-semibold shadow-sm"
                  >
                    {isChangingPassword ? (
                      <>
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        Updating Password...
                      </>
                    ) : (
                      "Update Password"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Tab 4: Notification & Preferences */}
        {activeTab === "notifications" && (
          <Card className="rounded-3xl border border-border/60 bg-card shadow-sm">
            <CardHeader className="border-b border-border/40 pb-4">
              <CardTitle className="text-base font-semibold">Notification Preferences</CardTitle>
              <CardDescription className="text-xs">
                Manage report delivery emails and product release notes.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4 max-w-2xl">
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-border/60 p-4 bg-muted/10">
                <div className="space-y-0.5">
                  <Label className="text-sm font-semibold">Email Report Delivery</Label>
                  <p className="text-xs text-muted-foreground">
                    Automatically email completed interview reports & scores upon session finish.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between gap-4 rounded-2xl border border-border/60 p-4 bg-muted/10">
                <div className="space-y-0.5">
                  <Label className="text-sm font-semibold">Product & AI Model Updates</Label>
                  <p className="text-xs text-muted-foreground">
                    Receive release updates regarding new interview questions & scoring models.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
