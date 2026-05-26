"use client";

import { Monitor, Moon, Sun, User, Bell, CreditCard } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { useSettingsDialog } from "@/components/layout/SettingsDialogContext";

export function SettingsDialog() {
  const { theme, setTheme } = useTheme();
  const { open, setOpen } = useSettingsDialog();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="md:max-w-2xl rounded-2xl border border-border/60 bg-background/95 p-0 backdrop-blur-xl">
        <DialogHeader className="border-b border-border/60 px-6 py-4">
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Manage your appearance, account, and workspace preferences.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[80vh] overflow-y-auto px-6 py-5">
          <div className="space-y-8">
            <section className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Appearance</h3>
                <p className="text-sm text-muted-foreground">
                  Choose how VoiceCoach looks for you.
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

            <section className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Account</h3>
                <p className="text-sm text-muted-foreground">
                  Basic account and interview delivery preferences.
                </p>
              </div>

              <div className="space-y-3 rounded-2xl border border-border/60 p-4">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Vrushik</p>
                    <p className="text-xs text-muted-foreground">
                      Vrushik@example.com
                    </p>
                  </div>
                </div>

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

            <section className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Workspace</h3>
                <p className="text-sm text-muted-foreground">
                  Quick shortcuts for billing and notifications.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <button className="flex items-start gap-3 rounded-2xl border border-border/60 p-4 text-left transition-colors hover:bg-accent/30">
                  <CreditCard className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Manage billing</p>
                    <p className="text-xs text-muted-foreground">
                      Open your subscription and invoices.
                    </p>
                  </div>
                </button>

                <button className="flex items-start gap-3 rounded-2xl border border-border/60 p-4 text-left transition-colors hover:bg-accent/30">
                  <Bell className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">
                      Notification preferences
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Control reminders and session alerts.
                    </p>
                  </div>
                </button>
              </div>
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
