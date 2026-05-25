import { AppShell } from "@/components/layout/AppShell";
import { SidebarProvider } from "@/components/layout/SidebarContext";
import { SettingsDialog } from "@/components/layout/SettingsDialog";
import { SettingsDialogProvider } from "@/components/layout/SettingsDialogContext";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <SettingsDialogProvider>
        <AppShell>{children}</AppShell>
        <SettingsDialog />
      </SettingsDialogProvider>
    </SidebarProvider>
  );
}
