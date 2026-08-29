"use client";

import { useState, useEffect } from "react";
import { Monitor, Moon, Sun, User, Bell, CreditCard, Loader2, CheckCircle2, Shield } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useSettingsDialog } from "@/components/layout/SettingsDialogContext";
import { useUserProfile } from "@/hooks/useUserProfile";
import type { UserProfileResponse } from "@/types/auth";

export function SettingsDialog() {
  const { theme, setTheme } = useTheme();
  const { open, setOpen } = useSettingsDialog();
  const { profile, updateProfile, isUpdating } = useUserProfile();

  const userProfile = profile as UserProfileResponse | null;
  const [fullName, setFullName] = useState("");

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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="md:max-w-2xl rounded-2xl border border-border/60 bg-background/95 p-0 backdrop-blur-xl">
        <DialogHeader className="border-b border-border/60 px-6 py-4">
          <DialogTitle>Settings & Profile</DialogTitle>
          <DialogDescription>
            Manage your profile details, appearance, and account preferences.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[80vh] overflow-y-auto px-6 py-5">
          <div className="space-y-8">
            {/* Account & Profile Section */}
            <section className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Profile Information</h3>
                <p className="text-xs text-muted-foreground">
                  Update your candidate profile details.
                </p>
              </div>

              <div className="space-y-4 rounded-2xl border border-border/60 p-4">
                <form onSubmit={handleProfileSave} className="space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-border/40">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary font-semibold text-sm">
                      {userProfile?.full_name?.[0]?.toUpperCase() || <User className="h-4 w-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {userProfile?.full_name || "User"}
                        </p>
                        {userProfile?.is_verified && (
                          <Badge variant="outline" className="gap-1 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] py-0 px-2">
                            <CheckCircle2 className="size-3" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {userProfile?.email || "Loading email..."}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="full_name" className="text-xs">Full Name</Label>
                      <Input
                        id="full_name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Jane Doe"
                        className="h-9 rounded-xl text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Email Address</Label>
                      <Input
                        value={userProfile?.email || ""}
                        disabled
                        className="h-9 rounded-xl text-sm bg-muted/40 text-muted-foreground cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <Shield className="size-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        Roles: {userProfile?.roles?.join(", ") || "candidate"}
                      </span>
                    </div>

                    <Button
                      type="submit"
                      size="sm"
                      disabled={isUpdating || !fullName.trim() || fullName === userProfile?.full_name}
                      className="rounded-xl font-medium"
                    >
                      {isUpdating ? (
                        <>
                          <Loader2 className="mr-2 size-3.5 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save changes"
                      )}
                    </Button>
                  </div>
                </form>

                {/* Performance & Activity Metrics */}
                {userProfile && (
                  <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-border/40 text-center">
                    <div className="rounded-xl bg-muted/30 p-2.5">
                      <p className="text-lg font-bold text-foreground">{userProfile.total_job_preparations ?? 0}</p>
                      <p className="text-[10px] text-muted-foreground">Preparations</p>
                    </div>
                    <div className="rounded-xl bg-muted/30 p-2.5">
                      <p className="text-lg font-bold text-foreground">{userProfile.total_rounds_completed ?? 0}</p>
                      <p className="text-[10px] text-muted-foreground">Rounds Done</p>
                    </div>
                    <div className="rounded-xl bg-muted/30 p-2.5">
                      <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                        {userProfile.overall_average_score ? userProfile.overall_average_score.toFixed(1) : "0.0"}
                      </p>
                      <p className="text-[10px] text-muted-foreground">Avg Score</p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Appearance Section */}
            <section className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Appearance</h3>
                <p className="text-xs text-muted-foreground">
                  Choose your preferred theme.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <Button
                  type="button"
                  variant={theme === "light" ? "default" : "outline"}
                  className="justify-start rounded-xl"
                  onClick={() => setTheme("light")}
                >
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </Button>
                <Button
                  type="button"
                  variant={theme === "dark" ? "default" : "outline"}
                  className="justify-start rounded-xl"
                  onClick={() => setTheme("dark")}
                >
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </Button>
                <Button
                  type="button"
                  variant={theme === "system" ? "default" : "outline"}
                  className="justify-start rounded-xl"
                  onClick={() => setTheme("system")}
                >
                  <Monitor className="mr-2 h-4 w-4" />
                  System
                </Button>
              </div>
            </section>

            {/* Notification & Workspace Section */}
            <section className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Preferences & Notifications</h3>
                <p className="text-xs text-muted-foreground">
                  Email reports and feature updates.
                </p>
              </div>

              <div className="space-y-3 rounded-2xl border border-border/60 p-4">
                <div className="flex items-center justify-between rounded-xl border border-border/60 p-3">
                  <div>
                    <Label>Email report delivery</Label>
                    <p className="text-xs text-muted-foreground">
                      Send completed interview reports by email.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between rounded-xl border border-border/60 p-3">
                  <div>
                    <Label>Product updates</Label>
                    <p className="text-xs text-muted-foreground">
                      Receive release notes and feature updates.
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

